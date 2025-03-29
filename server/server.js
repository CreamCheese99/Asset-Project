const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");  // นำเข้า multer
const pool = require("./db");

const app = express();
const PORT = 5000;

// ใช้ cors สำหรับการอนุญาตให้เข้าถึง API
app.use(cors());

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

// อัปโหลดหลายไฟล์พร้อมกัน
app.post('/mainasset', upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 },
  { name: 'image5', maxCount: 1 }
]), async (req, res) => {
  try {
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
      department_id
    } = req.body;

    // ตรวจสอบว่าไฟล์มีหรือไม่
    const images = [];
    for (let i = 1; i <= 5; i++) {
      if (req.files[`image${i}`]) {
        images.push(req.files[`image${i}`][0].filename); // ใช้ชื่อไฟล์
      }
    }

    // ตรวจสอบฟิลด์ที่จำเป็น
    if (!main_asset_id || !main_asset_name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // การบันทึกข้อมูลในฐานข้อมูล
    const newAsset = await pool.query(
      `INSERT INTO mainasset (
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
        image5
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *`,
      [
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
        images[0] || null, // image1
        images[1] || null, // image2
        images[2] || null, // image3
        images[3] || null, // image4
        images[4] || null  // image5
      ]
    );

    res.status(201).json({ message: 'Asset added successfully', data: newAsset.rows[0] });
  } catch (error) {
    console.error('Error adding asset:', error);
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server Error' });
  }
});


// API สำหรับดึงข้อมูลทั้งหมดจากตาราง MainAsset
//DataTable page
app.get("/mainasset", async (req, res) => {
  try {
    const query = `select mainasset.main_asset_id,main_asset_name,mainasset.status,department_name, count(*)as subamount from mainasset  left join subasset
                    on mainasset.main_asset_id=subasset.main_asset_id 
                    inner join department on department.department_id = mainasset.department_id
                    group by mainasset.main_asset_id,main_asset_name,mainasset.status,department_name;`; 
    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching assets:", error);
    res.status(500).json({ error: "Server Error" });
  }
});


//API หน้า AllAsset
app.get('/api/mainasset', async (req, res) => {
  try {
    // ตรวจสอบการเชื่อมต่อกับฐานข้อมูล
    console.log("กำลังเชื่อมต่อกับฐานข้อมูล...");
    
    // คำสั่ง SQL สำหรับดึงข้อมูล
    const query = `
      SELECT ma.main_asset_id, ma.main_asset_name, ma.status, sa.sub_asset_id, sa.sub_asset_name, sa.status AS sub_asset_status
      FROM mainasset ma
      JOIN subasset sa ON ma.main_asset_id = sa.main_asset_id
    `;
    
    const result = await pool.query(query);  // ส่งคำสั่ง SQL เพื่อดึงข้อมูล
    
    // ตรวจสอบว่ามีข้อมูลที่ดึงมา
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูล" });
    }

    // ส่งข้อมูลกลับไปยังคลไคลเอนต์
    res.json(result.rows);
  } catch (err) {
    // เพิ่มการแสดงข้อความข้อผิดพลาด
    console.error("ข้อผิดพลาดในการดึงข้อมูล:", err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลจากฐานข้อมูล", message: err.message });
  }
});

app.get("/mainasset/:id", async (req, res) => {
  try {
    const encodedId = req.params.id;
    const id = decodeURIComponent(encodedId); // ถอดรหัสให้กลับมาเป็นภาษาไทยและอักขระพิเศษ
    console.log("Decoded ID:", id);

    const mainAssetQuery = `SELECT * FROM public.mainasset WHERE main_asset_id = $1`;
    const mainAssetResult = await pool.query(mainAssetQuery, [id]);

    if (mainAssetResult.rows.length === 0) {
      return res.status(404).json({ message: "Main asset not found" });
    }

    const subAssetQuery = `SELECT * FROM public.subasset WHERE main_asset_id = $1`;
    const subAssetResult = await pool.query(subAssetQuery, [id]);

    res.json({
      mainAsset: mainAssetResult.rows[0],
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



// API สำหรับการอัปเดตข้อมูล mainasset
app.put("/mainasset/:id", async (req, res) => {
  const { id } = req.params;
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
  } = req.body;

  try {
    // อัปเดตข้อมูล mainasset
    const mainAssetUpdateQuery = `
      UPDATE public.mainasset
      SET
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
        department_id = $13
      WHERE main_asset_id = $14
      RETURNING *;
    `;

    const updatedMainAssetResult = await pool.query(mainAssetUpdateQuery, [
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
      main_asset_id || id, // ใช้ main_asset_id ที่รับจาก body หรือ id จาก params
    ]);

    if (updatedMainAssetResult.rows.length === 0) {
      return res.status(404).json({ message: "Main asset not found" });
    }

    // อัปเดตข้อมูล subasset (ถ้ามีการส่งข้อมูล subasset มาด้วย)
    const subAssets = req.body.subAssets || [];
    for (const subAsset of subAssets) {
      const {
        sub_asset_id,
        sub_asset_name,
        details,
        unit_price,
        quantity,
        counting_unit,
        note,
        type_sub_asset,
        status: subAssetStatus,
      } = subAsset;

      const subAssetUpdateQuery = `
        UPDATE public.subasset
        SET
          sub_asset_name = $1,
          details = $2,
          unit_price = $3,
          quantity = $4,
          counting_unit = $5,
          note = $6,
          type_sub_asset = $7,
          status = $8
        WHERE sub_asset_id = $9 AND main_asset_id = $10
        RETURNING *;
      `;

      const updatedSubAssetResult = await pool.query(subAssetUpdateQuery, [
        sub_asset_name,
        details,
        unit_price,
        quantity,
        counting_unit,
        subAssetStatus,
        note,
        type_sub_asset,
        sub_asset_id,
        main_asset_id || id // ใช้ main_asset_id ที่รับจาก body หรือ id จาก params
      ]);

      if (updatedSubAssetResult.rows.length === 0) {
        return res.status(404).json({ message: `Sub-asset ${sub_asset_id} not found` });
      }
    }

    res.json({
      message: "Asset and sub-assets updated successfully",
      mainAsset: updatedMainAssetResult.rows[0],
      subAssets: subAssets,
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Internal server error" });
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

// API สำหรับอัปเดตข้อมูล SubAsset โดยใช้ sub_asset_id
app.put('/api/subasset/:id', async (req, res) => {
  const { id } = req.params;
  const { sub_asset_name, details, quantity, unit_price, status, counting_unit, main_asset_id } = req.body;
  
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
    const values = [sub_asset_name, details, quantity, unit_price, status, counting_unit, main_asset_id, id];
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


// //************************************************************************************************** */




app.get("/department", async (req, res) => {
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

app.post("/department", async (req, res) => {
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
app.put("/department/:id", async (req, res) => {
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

app.delete("/department/:id", async (req, res) => {
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

app.get("/api/asset_type/:id", async (req, res) => {
  const { id } = req.params; // ดึงค่าของ id จาก URL params
  try {
    const result = await pool.query("SELECT * FROM asset_type WHERE asset_type_id = $1", [id]); // ใช้ parameterized query เพื่อป้องกัน SQL Injection
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "ประเภทสินทรัพย์ไม่พบ" });
    }
    res.json(result.rows[0]); // ส่งข้อมูลของประเภทสินทรัพย์ที่ตรงกับ id
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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



// app.get("/api/users", async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT 
//         u.user_id,
//         u.user_name, 
//         u.user_email, 
//         d.department_name, 
//         r.role_name 
//       FROM "users" u
//       LEFT JOIN department d ON u.department_id = d.department_id
//       LEFT JOIN userrole ur ON u.user_id = ur.user_id
//       LEFT JOIN role r ON ur.role_id = r.role_id
//       ORDER BY u.user_id ASC
//     `);

//     res.json(result.rows);
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// });



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
      LEFT JOIN userrole ur ON u.user_id = ur.user_id
      LEFT JOIN role r ON ur.role_id = r.role_id
      ORDER BY u.user_id ASC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});



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
  const { id } = req.params;  // รับ user_id จาก URL
  const { role } = req.body;  // รับ role_name จาก request body

  const client = await pool.connect(); // ใช้ client เพื่อจัดการ connection
  
  try {
    // ดึง role_id จากฐานข้อมูลโดยใช้ role_name
    const queryRoleId = 'SELECT role_id FROM role WHERE role_name = $1';
    const roleResult = await client.query(queryRoleId, [role]);

    if (roleResult.rowCount === 0) {
      return res.status(404).json({ error: 'ไม่พบบทบาทในฐานข้อมูล' });
    }

    const roleId = roleResult.rows[0].role_id; // ✅ แก้ไขจาก .id เป็น .role_id

    // ตรวจสอบว่ามี user_id ที่ต้องการแก้ไขหรือไม่
    const userResult = await client.query('SELECT * FROM users WHERE user_id = $1', [id]);

    if (userResult.rowCount === 0) {
      return res.status(404).json({ message: 'ไม่พบผู้ใช้ที่ต้องการแก้ไข' });
    }

    // อัปเดต role_id ใหม่ และคืนค่าข้อมูลที่อัปเดต
    const updateQuery = 'UPDATE users SET role_id = $1 WHERE user_id = $2 RETURNING user_id, role_id';
    const result = await client.query(updateQuery, [roleId, id]);

    res.status(200).json({ 
      message: 'อัปเดตบทบาทผู้ใช้สำเร็จ',
      user: result.rows[0] // คืนค่าข้อมูลที่อัปเดตกลับไป
    });

  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการอัปเดตบทบาทผู้ใช้:", err);
    res.status(500).json({ message: 'ไม่สามารถอัปเดตบทบาทผู้ใช้ได้' });
  } finally {
    client.release(); // ปิดการเชื่อมต่อฐานข้อมูล
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
// Login API
app.post('/login', async (req, res) => {
  const { user_email, password } = req.body;
    const jwt = require('jsonwebtoken');

    
  console.log('Received email:', user_email);  // ตรวจสอบ email ที่รับมา
  console.log('Received password:', password); // ตรวจสอบ password ที่รับมา

  try {
    const result = await pool.query('SELECT * FROM users WHERE user_email = $1', [user_email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // สร้าง JWT token
    const token = jwt.sign({ userId: user.user_id, roleId: user.role_id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({
      token,
      roleId: user.role_id,
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
