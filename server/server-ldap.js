const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");  // นำเข้า multer
const pool = require("./db");
const app = express();
const LdapAuth = require('./LdapAuth');
const saveUserToDatabase = require('./saveUserToDatabase'); 
const PORT = 3000;

// ใช้ cors สำหรับการอนุญาตให้เข้าถึง API
const corsOptions = {
  origin: 'https://miso.siet.kmitl.ac.th', // เปลี่ยนเป็น Domain หรือ Public IP ของ Front-end ของคุณ
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // อนุญาต HTTP Methods ที่ใช้
  credentials: true, // อนุญาตให้ส่ง Cookie/Authorization headers ข้าม Origin
  optionsSuccessStatus: 204 // สำหรับ Preflight requests (OPTIONS method)
};
app.use(cors(corsOptions));

// ตั้งค่าขีดจำกัดสำหรับ body-parser โดยกำหนดให้รองรับข้อมูลขนาดใหญ่
app.use(bodyParser.json({ limit: "50mb" })); // ตั้งขีดจำกัดเป็น 50MB
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // รองรับข้อมูล urlencoded ขนาดใหญ่

// กำหนดการจัดเก็บไฟล์โดยใช้ multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // กำหนดโฟลเดอร์เก็บไฟล์
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // ตั้งชื่อไฟล์ที่บันทึก
  }
});

// สร้าง instance ของ multer
const upload = multer({ storage: storage });
//เพิ่ม mainasset
app.post('/api/mainasset-add', upload.fields([ 
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 },
  { name: 'image5', maxCount: 1 }
]), async (req, res) => {
  const client = await pool.connect(); // 1. ดึง Client จาก Pool 
  try {
      await client.query('BEGIN'); // 2. เริ่ม Transaction 
    
    const {
      main_asset_id,
      main_asset_name,
      status,
      fiscal_year,
      date_received,
      budget_limit,
      averange_price,
      budget_type,
      asset_type,
      location_use,
      location_deliver,
      usage,
      responsible_person,
      department_id,
      curriculum,
    } = req.body;

    // แปลง curriculum ให้เป็น array หากจำเป็น
    // ปลอดภัยในการแปลง curriculum
let curriculumArray = [];

try {
  if (typeof curriculum === 'string') {
    curriculumArray = JSON.parse(curriculum);
  } else if (Array.isArray(curriculum)) {
    curriculumArray = curriculum;
  } else {
    curriculumArray = [];
  }
} catch (err) {
     await client.query('ROLLBACK');
    return res.status(400).json({ error: 'Invalid curriculum format (must be JSON array)' });
 }

// ตรวจสอบว่ามีข้อมูลหลักสูตรหรือไม่
if (!Array.isArray(curriculumArray) || curriculumArray.length === 0) {
  await client.query('ROLLBACK');
  return res.status(400).json({ error: 'Missing or invalid curriculum data' });
}

    // ตรวจสอบว่า curriculum ถูกส่งมาหรือไม่
    // if (!curriculumArray || curriculumArray.length === 0) {
    //   return res.status(400).json({ error: 'Missing or empty curriculum data' });
    // }

    // ตรวจสอบไฟล์
    const images = [];
    for (let i = 1; i <= 5; i++) {
      if (req.files[`image${i}`]) {
        images.push(req.files[`image${i}`][0].filename);
      }
    }

 // ตรวจสอบฟิลด์ที่จำเป็น (main_asset_id ถูกตัดออกจากการตรวจสอบแล้ว)
    if (!main_asset_name) {
      // Rollback ก่อน return
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Missing required fields: main_asset_name' });
    }
    

    // INSERT mainasset
    const newAsset = await client.query(
      `INSERT INTO mainasset (
        main_asset_name, 
        status, 
        fiscal_year, 
        date_received,
        budget_limit, 
        averange_price, 
        budget_type, 
        asset_type,
        location_use, 
        location_deliver, 
        usage, 
        responsible_person,
        department_id,
        image1,
        image2,
        image3,
        image4,
        image5
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *`,
      [
        main_asset_name, // $1
        status,          // $2
        fiscal_year,     // $3
        date_received,   // $4
        budget_limit,    // $5
        averange_price,  // $6
        budget_type,     // $7
        asset_type,      // $8
        location_use,    // $9
        location_deliver, // $10
        usage,            // $11
        responsible_person, // $12
        department_id,      // $13
        images[0] || null,  // $14
        images[1] || null,  // $15
        images[2] || null,  // $16
        images[3] || null,  // $17
        images[4] || null   // $18
      ]
    );
    
    // ดึง main_asset_id ที่สร้างใหม่จากฐานข้อมูล
    const new_main_asset_id = newAsset.rows[0].main_asset_id;
    // INSERT assetcurriculum
    for (const curriculumId of curriculumArray) {
      const result = await client.query(
        `INSERT INTO assetcurriculum (
          curriculum_id, 
          main_asset_id
        ) VALUES ($1, $2) RETURNING *`,
        [curriculumId, new_main_asset_id] // ใช้ ID ใหม่
      );
      console.log('Inserted into assetcurriculum:', result.rows[0]);
    }

    await client.query('COMMIT'); // 3. สำเร็จ: ยืนยัน Transaction (บันทึกข้อมูลทั้งหมด)
    res.status(201).json({ message: 'Asset added successfully', data: newAsset.rows[0] });

  } catch (error) {
    await client.query('ROLLBACK'); // 4. เกิด Error: ยกเลิก Transaction (ไม่บันทึกอะไรเลย)
    
    if (error.code === '23505') { // 23505 คือ PostgreSQL Error Code สำหรับ Unique Violation (รวมถึง Primary Key)
        // ตอบกลับด้วย 409 Conflict แทน 500
        return res.status(409).json({ error: 'The asset ID or a unique value already exists.', detail: error.detail });
    }
    
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ error: error.message });
    }
    
    // สำหรับ Error อื่นๆ ที่ไม่รู้จัก ตอบกลับด้วย 500
    res.status(500).json({ error: 'Server Error' });
    
  } finally {
    client.release(); // 5. ปล่อย Client คืน Connection Pool เสมอ
  }
});


app.get("/api/mainasset", async (req, res) => {
  try {
    const {
      main_asset_id,
      department_id,
      status,
      asset_type,
      budget_type,
      fiscal_year,
      responsible_person,
    } = req.query;

    let query = `
      SELECT 
        mainasset.main_asset_id, 
        main_asset_name, 
        mainasset.status,  
        mainasset.department_id,
        department.department_name, 
        mainasset.asset_type, 
        mainasset.responsible_person,
        mainasset.budget_type, 
        mainasset.fiscal_year, 
        COUNT(subasset.sub_asset_id) AS subamount 
      FROM mainasset  
      LEFT JOIN subasset ON mainasset.main_asset_id = subasset.main_asset_id 
      INNER JOIN department ON department.department_id = mainasset.department_id
    `;

    let conditions = [];
    let values = [];

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += `
      GROUP BY 
        mainasset.main_asset_id, 
        main_asset_name, 
        mainasset.usage, 
        mainasset.department_id, 
        department.department_name, 
        mainasset.responsible_person,
        mainasset.asset_type, 
        mainasset.budget_type, 
        mainasset.fiscal_year
      ORDER BY mainasset.fiscal_year ASC;
    `;

    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching assets:", error);
    res.status(500).json({ error: "Server Error" });
  }
});




// //API หน้า AllAsset
// app.get('/api/mainasset', async (req, res) => {
//   try {
//     // ตรวจสอบการเชื่อมต่อกับฐานข้อมูล
//     console.log("กำลังเชื่อมต่อกับฐานข้อมูล...");
    
//     // คำสั่ง SQL สำหรับดึงข้อมูล
//     const query = `
//       SELECT ma.main_asset_id, ma.main_asset_name, ma.status, sa.sub_asset_id, sa.sub_asset_name, sa.status AS sub_asset_status
//       FROM mainasset ma
//       JOIN subasset sa ON ma.main_asset_id = sa.main_asset_id
//     `;
    
//     const result = await pool.query(query);  // ส่งคำสั่ง SQL เพื่อดึงข้อมูล
    
//     // ตรวจสอบว่ามีข้อมูลที่ดึงมา
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "ไม่พบข้อมูล" });
//     }

//     // ส่งข้อมูลกลับไปยังคลไคลเอนต์
//     res.json(result.rows);
//   } catch (err) {
//     // เพิ่มการแสดงข้อความข้อผิดพลาด
//     console.error("ข้อผิดพลาดในการดึงข้อมูล:", err);
//     res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลจากฐานข้อมูล", message: err.message });
//   }
// });

app.get('/api/mainasset-assetlist', async (req, res) => {
  try {
    // คำสั่ง SQL สำหรับดึงข้อมูลพร้อม URL ของรูปภาพ
    const query = `
      SELECT ma.main_asset_id, ma.main_asset_name, ma.status, 
             ma.image1, ma.image2, ma.image3, ma.image4, ma.image5
      FROM mainasset ma
    `;
    
    const result = await pool.query(query);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูล" });
    }

    // ส่งข้อมูลไปที่ Frontend
    res.json(result.rows);
  } catch (err) {
    console.error("ข้อผิดพลาดในการดึงข้อมูล:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลจากฐานข้อมูล", message: err.message });
  }
});


// ดึง fiscal_year ที่ไม่ซ้ำ
app.get('/api/fiscal-years', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT fiscal_year FROM mainasset ORDER BY fiscal_year DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching fiscal years:', err);
    res.status(500).send('Server error');
  }
});



const path = require('path');  // เพิ่มบรรทัดนี้
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get("/api/mainasset/:id", async (req, res) => {
  try {
    const encodedId = req.params.id;
    const id = decodeURIComponent(encodedId);
    console.log("Decoded ID:", id);

    const mainAssetQuery = `
      SELECT mainasset.*, department.department_name
      FROM public.mainasset
      INNER JOIN department ON department.department_id = mainasset.department_id
      WHERE mainasset.main_asset_id = $1
    `;
    const mainAssetResult = await pool.query(mainAssetQuery, [id]);

    if (mainAssetResult.rows.length === 0) {
      return res.status(404).json({ message: "Main asset not found" });
    }

    const subAssetQuery = `SELECT * FROM public.subasset WHERE main_asset_id = $1`;
    const subAssetResult = await pool.query(subAssetQuery, [id]);

    res.json({
      mainAsset: {
        ...mainAssetResult.rows[0],
        image_url: mainAssetResult.rows[0].image1,
      },
      subAssets: subAssetResult.rows,
    });

  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




//DataTable page
// API สำหรับลบข้อมูลใน mainasset และ subasset ตาม main_asset_id
app.delete('/api/mainasset/:id', async (req, res) => {
  const encodedId = req.params.id;
  const mainAssetId = decodeURIComponent(encodedId); // ถอดรหัส ID

  try {
    await pool.query('BEGIN');

    // ตรวจสอบก่อนว่ามี main_asset_id อยู่ในฐานข้อมูลหรือไม่
    const checkQuery = 'SELECT * FROM public.mainasset WHERE main_asset_id = $1';
    const checkResult = await pool.query(checkQuery, [mainAssetId]);

    if (checkResult.rows.length === 0) {
      await pool.query('ROLLBACK');
      return res.status(404).json({ message: 'ไม่พบข้อมูลที่จะลบ' });
    }

    // ลบข้อมูล subasset ก่อน
    await pool.query('DELETE FROM public.subasset WHERE main_asset_id = $1', [mainAssetId]);
    // ลบข้อมูล mainasset
    await pool.query('DELETE FROM public.mainasset WHERE main_asset_id = $1', [mainAssetId]);

    await pool.query('COMMIT');
    res.status(200).json({ message: 'ลบข้อมูลสำเร็จ' });

  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('เกิดข้อผิดพลาดในการลบ:', err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบข้อมูล' });
  }
});



// // API สำหรับการอัปเดตข้อมูล mainasset
// app.put("/api/mainasset/:id", async (req, res) => {
//   const { id } = req.params;
//   const {
//     main_asset_id,
//     main_asset_name,
//     status,
//     fiscal_year,
//     date_received,
//     budget_limit,
//     averange_price,
//     budget_type,
//     asset_type,
//     location_use,
//     location_deliver,
//     usage,
//     responsible_person,
//     department_id,
//   } = req.body;

//   try {
//     // อัปเดตข้อมูล mainasset
//     const mainAssetUpdateQuery = `
//       UPDATE public.mainasset
//       SET
//         main_asset_name = $1,
//         status = $2,
//         fiscal_year = $3,
//         date_received = $4,
//         budget_limit = $5,
//         averange_price = $6,
//         budget_type = $7,
//         asset_type = $8,
//         location_use = $9,
//         location_deliver = $10,
//         usage = $11,
//         responsible_person = $12,
//         department_id = $13
//       WHERE main_asset_id = $14
//       RETURNING *;
//     `;

//     const updatedMainAssetResult = await pool.query(mainAssetUpdateQuery, [
//       main_asset_name,
//       status,
//       fiscal_year,
//       date_received,
//       budget_limit,
//       averange_price,
//       budget_type,
//       asset_type,
//       location_use,
//       location_deliver,
//       usage,
//       responsible_person,
//       department_id,
//       main_asset_id || id, // ใช้ main_asset_id ที่รับจาก body หรือ id จาก params
//     ]);

//     if (updatedMainAssetResult.rows.length === 0) {
//       return res.status(404).json({ message: "Main asset not found" });
//     }

//     // อัปเดตข้อมูล subasset (ถ้ามีการส่งข้อมูล subasset มาด้วย)
//     const subAssets = req.body.subAssets || [];
//     for (const subAsset of subAssets) {
//       const {
//         sub_asset_id,
//         sub_asset_name,
//         details,
//         unit_price,
//         quantity,
//         counting_unit,
//         note,
//         type_sub_asset,
//         status: subAssetStatus,
//       } = subAsset;

//       const subAssetUpdateQuery = `
//         UPDATE public.subasset
//         SET
//           sub_asset_name = $1,
//           details = $2,
//           unit_price = $3,
//           quantity = $4,
//           counting_unit = $5,
//           note = $6,
//           type_sub_asset = $7,
//           status = $8
//         WHERE sub_asset_id = $9 AND main_asset_id = $10
//         RETURNING *;
//       `;

//       const updatedSubAssetResult = await pool.query(subAssetUpdateQuery, [
//         sub_asset_name,
//         details,
//         unit_price,
//         quantity,
//         counting_unit,
//         subAssetStatus,
//         note,
//         type_sub_asset,
//         sub_asset_id,
//         main_asset_id || id // ใช้ main_asset_id ที่รับจาก body หรือ id จาก params
//       ]);

//       if (updatedSubAssetResult.rows.length === 0) {
//         return res.status(404).json({ message: `Sub-asset ${sub_asset_id} not found` });
//       }
//     }

//     res.json({
//       message: "Asset and sub-assets updated successfully",
//       mainAsset: updatedMainAssetResult.rows[0],
//       subAssets: subAssets,
//     });
//   } catch (error) {
//     console.error("Error updating data:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });




//*************** edit mainasset********************* */


// สร้าง API endpoint สำหรับอัปเดตข้อมูลครุภัณฑ์
app.put('/api/mainasset/:id', async (req, res) => {
  const {
    main_asset_id,
    main_asset_name,
    status,
    fiscal_year,
    date_received,
    budget_limit,
    averange_price,
    budget_type,
    asset_type,
    location_use,
    location_deliver,
    usage,
    responsible_person,
    department_id,
    image1,
    image2,
    image3,
    image4,
    image5,
  } = req.body;

  try {
    // สร้างคำสั่ง SQL สำหรับการอัปเดตข้อมูล
    const query = `
      UPDATE mainasset SET
        main_asset_name = $1,
        status = $2,
        fiscal_year = $3,
        date_received = $4,
        budget_limit = $5,
        averange_price = $6,
        budget_type = $7,
        asset_type = $8,
        location_use = $9,
        location_deliver = $10,
        usage = $11,
        responsible_person = $12,
        department_id = $13,
        image1 = $14,
        image2 = $15,
        image3 = $16,
        image4 = $17,
        image5 = $18
      WHERE main_asset_id = $19
    `;
    const values = [
      main_asset_name,
      status,
      fiscal_year,
      date_received,
      budget_limit,
      averange_price,
      budget_type,
      asset_type,
      location_use,
      location_deliver,
      usage,
      responsible_person,
      department_id,
      image1,
      image2,
      image3,
      image4,
      image5,
      main_asset_id,
    ];

    // เรียกใช้คำสั่ง SQL
    const result = await pool.query(query, values);

    if (result.rowCount > 0) {
      // ส่งคำตอบกลับเมื่ออัปเดตสำเร็จ
      res.status(200).json({ message: 'อัปเดตข้อมูลครุภัณฑ์สำเร็จ' });
    } else {
      // ถ้าไม่พบข้อมูลที่ต้องการอัปเดต
      res.status(404).json({ message: 'ไม่พบข้อมูลครุภัณฑ์ที่ต้องการอัปเดต' });
    }
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล' });
  }
});



// const storage = multer.diskStorage({
//   destination: 'public/uploads/',
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage });

app.post('/api/update-image', upload.single('image'), async (req, res) => {
  const { index, asset_id } = req.body;
  const filename = req.file.filename;

  try {
    // update mainasset.image1, image2, image3, etc.
    const imageColumn = `image${parseInt(index) + 1}`;
    await pool.query(
      `UPDATE mainasset SET ${imageColumn} = $1 WHERE main_asset_id = $2`,
      [filename, asset_id]
    );
    res.json({ filename });
  } catch (err) {
    console.error(err);
    res.status(500).send('อัปโหลดไม่สำเร็จ');
  }
});

// ************************************************************************************************
//หน้า AddAsset เพิ่มพัสดุย่อย
app.post('/api/subasset', async (req, res) => {
  const {
    sub_asset_name,
    details,
    quantity,
    unit_price,
    status,
    counting_unit,
    note,
    type_sub_asset,
    main_asset_id
  } = req.body;

  try {
    // แก้ไข SQL Query
    const query = `
      INSERT INTO public."subasset" (
        sub_asset_name, 
        details, 
        quantity, 
        unit_price, 
        status, 
        counting_unit, 
        main_asset_id, 
        note, 
        type_sub_asset
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;

    const values = [
      sub_asset_name,
      details,
      quantity,
      unit_price,
      status,
      counting_unit,
      main_asset_id,  // ตำแหน่งที่ถูกต้อง
      note, 
      type_sub_asset
    ];

    await pool.query(query, values);

    res.status(201).json({ message: 'SubAsset added successfully' });
  } catch (error) {
    console.error("Error adding sub asset:", error);
    res.status(500).json({ error: 'Error adding sub asset' });
  }
});


// API สำหรับดึงข้อมูล SubAsset ทั้งหมด
app.get('/api/subasset', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public."subasset"');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching sub assets:", error);
    res.status(500).json({ error: 'Error fetching sub assets' });
  }
});

// Express route
app.get('/api/subasset/:mainAssetId', async (req, res) => {
  const mainAssetId = req.params.mainAssetId;
  try {
    const result = await pool.query(
      'SELECT * FROM subasset WHERE main_asset_id = $1',
      [mainAssetId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// API สำหรับลบ SubAsset โดยใช้ sub_asset_id
app.delete('/api/subasset/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM public."subasset" WHERE sub_asset_id = $1', [id]);
    if(result.rowCount === 0){
      return res.status(404).json({ error: 'Sub asset not found' });
    }
    res.status(200).json({ message: 'Sub asset deleted successfully' });
  } catch (error) {
    console.error("Error deleting sub asset:", error);
    res.status(500).json({ error: 'Error deleting sub asset' });
  }
});

app.put('/api/subasset/:id', async (req, res) => {
  const { id } = req.params;
  const { sub_asset_name, details, quantity, unit_price, status, counting_unit, note, type_sub_asset, main_asset_id } = req.body;

  try {
    const query = `
      UPDATE public."subasset"
      SET sub_asset_name = $1,
          details = $2,
          quantity = $3,
          unit_price = $4,
          status = $5,
          counting_unit = $6,
          note = $7,
          type_sub_asset = $8,
          main_asset_id = $9
      WHERE sub_asset_id = $10
      RETURNING *;
    `;
    const values = [sub_asset_name, details, quantity, unit_price, status, counting_unit, note, type_sub_asset, main_asset_id, id];
    
    const result = await pool.query(query, values);

    if(result.rows.length === 0){
      return res.status(404).json({ error: 'Sub asset not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating sub asset:", error);
    res.status(500).json({ error: 'Error updating sub asset' });
  }
});

app.put('/api/subasset-edit/:id', async (req, res) => {
  const { id } = req.params; // รับค่า id จาก URL params
  const { sub_asset_name, details, quantity, unit_price, status, counting_unit, note, type_sub_asset, main_asset_id } = req.body;

  // ตรวจสอบว่า id เป็นตัวเลขหรือไม่
  if (isNaN(id) || parseInt(id) <= 0) {
    return res.status(400).json({ error: 'Invalid sub_asset_id' }); // ส่งกลับ error หาก id ไม่เป็นตัวเลข
  }

  // ตรวจสอบข้อมูลที่ได้รับจาก request body
  if (!sub_asset_name || !details || !quantity || !unit_price || !status || !counting_unit || !note || !type_sub_asset || !main_asset_id) {
    return res.status(400).json({ error: 'All fields must be provided' }); // ส่งกลับ error หากข้อมูลไม่ครบ
  }

  try {
    const query = `
      UPDATE public."subasset"
      SET sub_asset_name = $1,
          details = $2,
          quantity = $3,
          unit_price = $4,
          status = $5,
          counting_unit = $6,
          note = $7,
          type_sub_asset = $8,
          main_asset_id = $9
      WHERE sub_asset_id = $10
      RETURNING *;
    `;
    const values = [sub_asset_name, details, quantity, unit_price, status, counting_unit, note, type_sub_asset, main_asset_id, id];
    
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sub asset not found' }); // หากไม่พบ subasset ให้ส่ง error
    }

    // ส่งกลับข้อมูล subasset ที่ถูกอัปเดต
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating sub asset:", error);
    res.status(500).json({ error: 'Error updating sub asset' }); // หากมีข้อผิดพลาดเกิดขึ้นใน server
  }
});



// //************************************************************************************************** */




app.get("/api/department-curriculum", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT d.department_id, d.department_name, 
             COALESCE(json_agg(c.curriculum_name) FILTER (WHERE c.curriculum_name IS NOT NULL), '[]') AS curriculum
      FROM department d
      LEFT JOIN curriculum c ON d.department_id = c.department_id
      GROUP BY d.department_id, d.department_name
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Database error: ", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลภาควิชา" });
  }
});

app.get('/api/department', async (req, res) => {
  try {
    // ดึงข้อมูลจากฐานข้อมูล โดยจัดเรียงตาม department_id
    const result = await pool.query('SELECT * FROM department ORDER BY department_id ASC');
    
    // ถ้าไม่มีข้อมูลในตาราง department
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No departments found' }); // ส่ง 404 ถ้าไม่มีข้อมูล
    }

    // ส่งข้อมูลกลับในรูปแบบ JSON
    res.status(200).json(result.rows); // ส่งข้อมูลพร้อมสถานะ 200 OK

  } catch (err) {
    console.error('Error fetching department:', err); // log ข้อผิดพลาดในเซิร์ฟเวอร์
    // ส่งข้อความข้อผิดพลาดในรูปแบบ JSON
    res.status(500).json({ error: 'Server error, please try again later' }); // ส่ง 500 เมื่อเกิดข้อผิดพลาดที่เซิร์ฟเวอร์
  }
});

// ดึงข้อมูลหลักสูตรตามภาควิชา
app.get('/api/curriculum/:departmentId', async (req, res) => {
  const { departmentId } = req.params;
  
  try {
    // Query เพื่อดึงข้อมูลหลักสูตรที่เชื่อมโยงกับ departmentId
    const result = await pool.query(
      'SELECT * FROM curriculum WHERE department_id = $1',
      [departmentId]
    );

    if (result.rows.length > 0) {
      res.json(result.rows); // ส่งข้อมูลหลักสูตรที่เกี่ยวข้อง
    } else {
      res.status(404).json({ error: 'No curricula found for this department' });
    }
  } catch (err) {
    console.error('Error fetching curriculum:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/api/department", async (req, res) => {
  const { department_name, curriculum } = req.body;

  if (!department_name) {
    return res.status(400).json({ error: "กรุณากรอกชื่อภาควิชา" });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // เพิ่มภาควิชา (ไม่ใส่ department_id เพราะเป็น SERIAL)
    const departmentResult = await client.query(
      `INSERT INTO department (department_name) VALUES ($1) RETURNING department_id, department_name`,
      [department_name]
    );

    const newDepartmentId = departmentResult.rows[0].department_id; // ดึงค่า ID ที่เพิ่มมาใหม่

    // เพิ่มหลักสูตรที่เกี่ยวข้อง
    if (curriculum && curriculum.length > 0) {
      for (const curriculum_name of curriculum) {
        if (curriculum_name.trim() !== "") {
          await client.query(
            `INSERT INTO curriculum (curriculum_name, department_id) VALUES ($1, $2)`,
            [curriculum_name, newDepartmentId]
          );
        }
      }
    }

    await client.query("COMMIT");

    res.status(201).json({
      message: "เพิ่มภาควิชาเรียบร้อย",
      data: departmentResult.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Database error: ", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการเพิ่มข้อมูลภาควิชา" });
  } finally {
    client.release();
  }
});


// แก้ไขภาควิชา พร้อมหลักสูตร
app.put("/api/department/:id", async (req, res) => {
  const { id } = req.params;
  const { department_name, curriculum } = req.body;

  if (!department_name) {
    return res.status(400).json({ error: "กรุณากรอกชื่อภาควิชาใหม่" });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // อัปเดตชื่อภาควิชา
    const result = await client.query(
      `UPDATE department SET department_name = $1 WHERE department_id = $2 RETURNING *`,
      [department_name, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "ไม่พบภาควิชาที่ต้องการอัปเดต" });
    }

    // ลบหลักสูตรเก่าทั้งหมดก่อน
    await client.query(`DELETE FROM curriculum WHERE department_id = $1`, [id]);

    // เพิ่มหลักสูตรใหม่
    if (curriculum && curriculum.length > 0) {
      for (const curriculum_name of curriculum) {
        await client.query(
          `INSERT INTO curriculum (curriculum_name, department_id) VALUES ($1, $2)`,
          [curriculum_name, id]
        );
      }
    }

    await client.query("COMMIT");

    res.json({ message: "อัปเดตภาควิชาเรียบร้อย", updatedData: result.rows[0] });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Database error: ", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลภาควิชา" });
  } finally {
    client.release();
  }
});

app.delete("/api/department/:id", async (req, res) => {
  const { id } = req.params;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // ✅ ลบภาควิชา (curriculum จะถูกลบอัตโนมัติ เพราะใช้ ON DELETE CASCADE)
    const result = await client.query(
      `DELETE FROM department WHERE department_id = $1 RETURNING *`, 
      [id]
    );

    if (result.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "ไม่พบภาควิชาที่ต้องการลบ" });
    }

    await client.query("COMMIT");

    res.json({ message: "ลบภาควิชาเรียบร้อย" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Database error: ", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบข้อมูลภาควิชา" });
  } finally {
    client.release();
  }
});

/********************************************************************************************************************* */
//ประเภทสินทรัพย์

// 📌 1. ดึงข้อมูลทั้งหมด
app.get("/api/asset_type", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM asset_type ORDER BY asset_type_id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// app.get("/api/asset_type/:id", async (req, res) => {
//   const { id } = req.params; // ดึงค่าของ id จาก URL params
//   try {
//     const result = await pool.query("SELECT * FROM asset_type WHERE asset_type_id = $1", [id]); // ใช้ parameterized query เพื่อป้องกัน SQL Injection
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "ประเภทสินทรัพย์ไม่พบ" });
//     }
//     res.json(result.rows[0]); // ส่งข้อมูลของประเภทสินทรัพย์ที่ตรงกับ id
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// 📌 2. เพิ่มข้อมูล
app.post("/api/asset_type", async (req, res) => {
  try {
    const { asset_type_name } = req.body;
    if (!asset_type_name) {
      return res.status(400).json({ error: "ชื่อประเภทสินทรัพย์ห้ามว่าง" });
    }

    const result = await pool.query(
      "INSERT INTO asset_type (asset_type_name) VALUES ($1) RETURNING *",
      [asset_type_name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/asset_type/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { asset_type_name } = req.body;

    const result = await pool.query(
      "UPDATE asset_type SET asset_type_name = $1 WHERE asset_type_id = $2 RETURNING *",
      [asset_type_name, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "ไม่พบประเภทสินทรัพย์" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 4. ลบข้อมูล
app.delete("/api/asset_type/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM asset_type WHERE asset_type_id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "ไม่พบประเภทสินทรัพย์" });
    }

    res.json({ message: "ลบประเภทสินทรัพย์สำเร็จ" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//****************************************************************************************************************** */
// //เพิ่มข้อมูลผู้ใช้
// Endpoint สำหรับเพิ่มผู้ใช้ใหม่
app.post("/api/users", async (req, res) => {
  const {  user_name, user_email, department_id, role } = req.body; // รับ role_name จาก body
  try {
    // ตรวจสอบว่า role มีค่าเป็น 'choose' หรือไม่
    if (role === "choose") {
      return res.status(400).json({ error: "กรุณาเลือกบทบาท" });
    }

    // ดึงข้อมูล role_id จาก role_name
    const roleResult = await pool.query(`
      SELECT role_id FROM role WHERE role_name = $1
    `, [role]);

    if (roleResult.rows.length === 0) {
      return res.status(400).json({ error: "Invalid role name" });
    }

    const roleId = roleResult.rows[0].role_id;

    // เพิ่มข้อมูลผู้ใช้ใหม่
    const userResult = await pool.query(`
      INSERT INTO "users" ( user_name, user_email, department_id, role_id)
      VALUES ($1, $2, $3, $4 ) RETURNING user_id
    `, [user_name, user_email, department_id, roleId]);

    const userId = userResult.rows[0].user_id;

    // เพิ่มบทบาทให้กับผู้ใช้
    await pool.query(`
      INSERT INTO userrole (user_id, role_id)
      VALUES ($1, $2)
    `, [userId, roleId]);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});



app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        u.user_id,
        u.user_name, 
        u.user_email, 
        d.department_name, 
        r.role_name 
      FROM "users" u
      LEFT JOIN department d ON u.department_id = d.department_id
      LEFT JOIN role r ON u.role_id = r.role_id
      ORDER BY u.user_id ASC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});



//************************************** */
// ดึง user รายบุคคล
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

app.get('/api/users/by-department/:departmentId', async (req, res) => {
  const { departmentId } = req.params;

  console.log('Received departmentId:', departmentId);

  if (!departmentId || isNaN(departmentId)) {
    return res.status(400).json({ message: 'Invalid or missing departmentId' });
  }

  try {
    const query = 'SELECT user_id, user_name FROM users WHERE department_id = $1';
    const values = [parseInt(departmentId)];

    const result = await pool.query(query, values);
    res.json(result.rows);  // ส่งข้อมูลผู้ใช้ใน department
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ message: 'Error fetching department users' });
  }
});


//*************************************** */


// API สำหรับลบข้อมูลผู้ใช้
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;  // แปลง id เป็น integer

  const client = await pool.connect();
  try {
    // ลบข้อมูลผู้ใช้จากฐานข้อมูลโดยใช้ user_id
    const result = await client.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'ไม่พบผู้ใช้ที่ต้องการลบ' });
    }

    res.status(200).json({ message: 'ลบข้อมูลผู้ใช้สำเร็จ' });
  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการลบข้อมูลผู้ใช้:", err);
    res.status(500).json({ message: 'ไม่สามารถลบข้อมูลผู้ใช้ได้' });
  }
});



app.put('/api/users/:id/role', async (req, res) => {
  const { id } = req.params;
  const { role_id } = req.body;

  if (!role_id) {
    return res.status(400).json({ message: 'กรุณาระบุ role_id' });
  }

  const client = await pool.connect();

  try {
    const userResult = await client.query('SELECT * FROM users WHERE user_id = $1', [id]);

    if (userResult.rowCount === 0) {
      return res.status(404).json({ message: 'ไม่พบผู้ใช้ที่ต้องการแก้ไข' });
    }

    const updateQuery = 'UPDATE users SET role_id = $1 WHERE user_id = $2 RETURNING user_id, role_id';
    const result = await client.query(updateQuery, [role_id, id]);

    res.status(200).json({ 
      message: 'อัปเดตบทบาทผู้ใช้สำเร็จ',
      user: result.rows[0]
    });
  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการอัปเดตบทบาทผู้ใช้:", err);
    res.status(500).json({ message: 'ไม่สามารถอัปเดตบทบาทผู้ใช้ได้' });
  } finally {
    client.release();
  }
});


// API สำหรับดึงข้อมูลบทบาททั้งหมด
app.get('/api/role', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM role');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching roles:', err);
    res.status(500).send('Server Error');
  }
});


//***********************Login************************* */

//const ldapAuth = new LdapAuth('10.252.92.100', 389, 'dc=kmitl,dc=ac,dc=th'); 
app.post('/api/login', async (req, res) => {
  const ldapAuth = new LdapAuth('10.252.92.100', 389, 'dc=kmitl,dc=ac,dc=th'); 
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const isAuthenticated = await ldapAuth.authenticate(username, password);

    if (isAuthenticated) {
      const userInfo = await ldapAuth.getUserInfo(username);
      console.log('User Info:', userInfo);

      // ตรวจสอบสิทธิ์ในฐานข้อมูล โดยใช้ email จาก LDAP
      const result = await pool.query(
        'SELECT user_id, user_name, department_id, role_id FROM users WHERE user_email = $1',
        [userInfo.mail]
      );

      if (result.rowCount === 0) {
        return res.status(403).json({ message: 'ไม่มีสิทธิ์ในการเข้าสู่ระบบ' });
      }

      const dbUser = result.rows[0];

      const token = 'fake-token-for-dev'; // เปลี่ยนเป็น JWT ภายหลัง

      res.json({
        token: token,
        roleId: dbUser.role_id,
        user_name: dbUser.user_name,
        department_id: dbUser.department_id
      });
    } else {
      res.status(401).json({
        message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: error.message || 'เกิดข้อผิดพลาดในระบบ'
    });
  }
  finally
  {
    if (ldapAuth && typeof ldapAuth.close === 'function') {
      await ldapAuth.close(); // เรียกใช้เมธอด close() เพื่อปิด Connection
    }
  }
});











//****************************

// app.get("/api/department-assets", async (req, res) => {
//   try {
//     const result = await pool.query(
//       `SELECT 
//           d.department_id, 
//           ma.fiscal_year, 
//           ma.budget_type, 
//           SUM(ma.budget_limit) as budget_limit
//         FROM mainasset ma
//         JOIN department d ON ma.department_id = d.department_id  -- สมมติว่าใช้ department_id
//         GROUP BY d.department_id, ma.fiscal_year, ma.budget_type
//         ORDER BY ma.fiscal_year;`
//             );

//     res.json(result.rows);
//   } catch (error) {
//     console.error("Database error:", error);
//     res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
//   }
// });


// app.get("/api/status-summary", async (req, res) => {
//   try {
//     const result = await pool.query(
//       `SELECT status, fiscal_year, COUNT(*) as count 
//       FROM mainasset 
//       GROUP BY status, fiscal_year 
//       ORDER BY fiscal_year;`
//     );

//     // จัดกลุ่มข้อมูลโดยแบ่งตามปีงบประมาณ (fiscal_year)
//     const groupedData = {};
//     result.rows.forEach(row => {
//       const { fiscal_year, status, count } = row;
//       if (!groupedData[fiscal_year]) {
//         groupedData[fiscal_year] = {
//           labels: [],
//           data: [],
//         };
//       }
//       groupedData[fiscal_year].labels.push(status);
//       groupedData[fiscal_year].data.push(parseInt(count));
//     });

//     // สร้างโครงสร้างข้อมูลสำหรับส่งไปยัง Frontend
//     const responseData = Object.keys(groupedData).map(year => ({
//       fiscal_year: year,
//       labels: groupedData[year].labels,
//       datasets: [{
//         data: groupedData[year].data,
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
//       }]
//     }));

//     res.json(responseData);
//   } catch (error) {
//     console.error("Database error:", error);
//     res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
//   }
// });




// app.get("/api/mainasset-dash", async (req, res) => {
//   try {
//     const { department, budgetType, year } = req.query;

//     let query = `
//       SELECT d.department_name AS department, m.budget_type, m.fiscal_year, SUM(m.budget_limit) AS total_budget
//       FROM mainasset m
//       JOIN department d ON m.department_id = d.department_id
//       WHERE 1=1
//     `;

//     let params = [];

//     if (department) {
//       query += ` AND d.department_name = $${params.length + 1}`;
//       params.push(department);
//     }
//     if (budgetType) {
//       query += ` AND m.budget_type = $${params.length + 1}`;
//       params.push(budgetType);
//     }
//     if (year) {
//       query += ` AND m.fiscal_year = $${params.length + 1}`;
//       params.push(year);
//     }

//     query += " GROUP BY d.department_name, m.budget_type, m.fiscal_year ORDER BY m.fiscal_year";

//     const result = await pool.query(query, params);

//     // 🔹 ห่อข้อมูลที่ส่งกลับด้วย `departmentDetails`
//     res.json({ departmentDetails: result.rows });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


//************************************************Home***************************************************************** */

app.get('/api/getData', async (req, res) => {
  try {
    // ดึงรายชื่อภาควิชา
    const departmentResult = await pool.query(`SELECT department_name FROM department`);
    const departments = departmentResult.rows.map(row => row.department_name);

    // ดึงปีงบประมาณ
    const yearResult = await pool.query(`SELECT DISTINCT fiscal_year FROM mainasset ORDER BY fiscal_year`);
    const years = yearResult.rows.map(row => row.fiscal_year.toString());

    // ดึงประเภทเงิน
    const fundTypesResult = await pool.query(`SELECT DISTINCT budget_type FROM mainasset`);
    const fundTypes = fundTypesResult.rows.map(row => row.budget_type);

    // ดึงข้อมูลงบประมาณรายภาควิชา
    const departmentDetails = {};
    for (const departmentName of departments) {
      departmentDetails[departmentName] = {};

      for (const fundType of fundTypes) {
        departmentDetails[departmentName][fundType] = {};

        for (const year of years) {
          const assetsResult = await pool.query(
            `
            SELECT budget_limit
            FROM mainasset ma
            JOIN department d ON ma.department_id = d.department_id
            WHERE d.department_name = $1 AND ma.budget_type = $2 AND ma.fiscal_year = $3
            `,
            [departmentName, fundType, year]
          );

          // สร้าง array ที่มีเฉพาะ budget_limit
          const budgetArray = assetsResult.rows.map(row => Number(row.budget_limit));

          departmentDetails[departmentName][fundType][year] = budgetArray;
        }
      }
    }

    // ดึง status ทั้งหมด
    const assetStatusResult = await pool.query(`SELECT DISTINCT status FROM mainasset`);
    const assetStatuses = assetStatusResult.rows.map(row => row.status);

    // สรุป status รายภาควิชา
    const statusSummaryByDepartment = {};
    for (const status of assetStatuses) {
      statusSummaryByDepartment[status] = {};
      for (const departmentName of departments) {
        const countResult = await pool.query(
          `
          SELECT COUNT(*) FROM mainasset ma
          JOIN department d ON ma.department_id = d.department_id
          WHERE ma.status = $1 AND d.department_name = $2
          `,
          [status, departmentName]
        );
        statusSummaryByDepartment[status][departmentName] = Number(countResult.rows[0].count);
      }
    }

    const data = {
      departments,
      fundTypes,
      years,
      departmentDetails,
      assetStatuses,
      statusSummaryByDepartment
    };

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port :${PORT}`);
});

// ปิด LDAP Connection เมื่อเซิร์ฟเวอร์หยุดทำงาน
process.on('SIGTERM', () => {
  ldapAuth.close();
  process.exit(0);
});