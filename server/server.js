// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const pool = require("./db");

// const app = express();
// const PORT = 5000;



// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());  



const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./db");

const app = express();
const PORT = 5000;

// ใช้ cors สำหรับการอนุญาตให้เข้าถึง API
app.use(cors());

// ตั้งค่าขีดจำกัดสำหรับ body-parser โดยกำหนดให้รองรับข้อมูลขนาดใหญ่
app.use(bodyParser.json({ limit: "50mb" })); // ตั้งขีดจำกัดเป็น 50MB
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // รองรับข้อมูล urlencoded ขนาดใหญ่


//*********************************************************************************** */
app.post("/mainasset", async (req, res) => {
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

    if (!main_asset_id || !main_asset_name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newAsset = await pool.query(
      `INSERT INTO "mainasset" (
        "main_asset_id", 
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
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
      [
        main_asset_id, main_asset_name, status, fiscal_year, date_received,
        budget_limit, averange_price, budget_type, asset_type,
        location_use, location_deliver, usage, responsible_person, department_id
      ]
    );

    res.status(201).json({ message: "Asset added successfully", data: newAsset.rows[0] });
  } catch (error) {
    console.error("Error adding asset:", error);
    res.status(500).json({ error: "Server Error" });
  }
});


// API สำหรับดึงข้อมูลทั้งหมดจากตาราง MainAsset
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

app.get("/mainasset/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Received ID:", id);

  try {
    // ดึงข้อมูล mainasset
    const mainAssetQuery = `SELECT * FROM public.mainasset WHERE main_asset_id = $1`;
    const mainAssetResult = await pool.query(mainAssetQuery, [id]);

    if (mainAssetResult.rows.length === 0) {
      return res.status(404).json({ message: "Main asset not found" });
    }

    // ดึงข้อมูล subasset
    console.log("Fetching subasset for main_asset_id:", id);
    const subAssetQuery = `SELECT * FROM public.subasset WHERE main_asset_id = $1`;
    const subAssetResult = await pool.query(subAssetQuery, [id]);

    console.log("Sub-assets found:", subAssetResult.rows);

    res.json({
      mainAsset: mainAssetResult.rows[0],
      subAssets: subAssetResult.rows,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API สำหรับดึงข้อมูล SubAsset โดยใช้ main_asset_id
app.get('/api/subasset/main/:mainId', async (req, res) => {
  const { mainId } = req.params;
  console.log("Received main_asset_id:", mainId);

  try {
    // ดึงข้อมูล SubAsset ทั้งหมดที่มี main_asset_id ตรงกับ mainId
    const result = await pool.query('SELECT * FROM public.subasset WHERE main_asset_id = $1', [mainId]);

    console.log("Sub-assets found:", result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No sub-assets found for this main asset' });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching sub-assets:", error);
    res.status(500).json({ error: 'Error fetching sub-assets' });
  }
});

// API สำหรับลบข้อมูลใน mainasset และ subasset ตาม main_asset_id
app.delete('/api/mainasset/:id', async (req, res) => {
  const mainAssetId = req.params.id;

  try {
    // เริ่มการทำงานใน transaction
    await pool.query('BEGIN');

    // ลบข้อมูลใน subasset ที่มี main_asset_id ตรงกับที่เลือก
    await pool.query('DELETE FROM public.subasset WHERE main_asset_id = $1', [mainAssetId]);

    // ลบข้อมูลใน mainasset ที่มี main_asset_id ตรงกับที่เลือก
    await pool.query('DELETE FROM public.mainasset WHERE main_asset_id = $1', [mainAssetId]);

    // ยืนยันการทำงาน
    await pool.query('COMMIT');
    res.status(200).send({ message: 'ลบข้อมูลสำเร็จ' });
  } catch (err) {
    // ยกเลิกการทำงานหากเกิดข้อผิดพลาด
    await pool.query('ROLLBACK');
    console.error('Error deleting asset:', err);
    res.status(500).send({ message: 'เกิดข้อผิดพลาดในการลบข้อมูล' });
  }
});


app.delete("/mainasset/:main_asset_id", async (req, res) => {
  const { main_asset_id } = req.params; // รับค่า main_asset_ID จาก URL parameter

  try {
    const query = `DELETE FROM public.mainasset WHERE "main_asset_id" = $1 RETURNING *`;
    const result = await pool.query(query, [main_asset_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูลที่ต้องการลบ" });
    }

    res.status(200).json({ message: "ลบข้อมูลสำเร็จ", deletedData: result.rows[0] });
  } catch (error) {
    console.error("Error deleting asset:", error);
    res.status(500).json({ error: "Server Error" });
  }
});



// อัปเดตข้อมูล MainAsset ตาม main_asset_ID
app.put("/mainasset/:main_asset_id", async (req, res) => {
  const { main_asset_id } = req.params;
  const {
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
    responsible_person
  } = req.body;

  try {
    const query = `
      UPDATE "mainasset"
      SET 
        main_asset_name = $1, status = $2, fiscal_year = $3, date_received = $4,
        budget_limit = $5, averange_price = $6, budget_type = $7, asset_type = $8,
        location_use = $9, location_deliver = $10, usage = $11, responsible_person = $12
      WHERE "main_asset_id" = $13 RETURNING *`;
    
    const result = await pool.query(query, [
      main_asset_name, status, fiscal_year, date_received,
      budget_limit, averange_price, budget_type, asset_type,
      location_use, location_deliver, usage, responsible_person,
      main_asset_id
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "MainAsset not found" });
    }

    res.status(200).json({ message: "Asset updated successfully", data: result.rows[0] });
  } catch (error) {
    console.error("Error updating asset:", error);
    res.status(500).json({ error: "Server Error" });
  }
});





// ************************************************************************************************

// API สำหรับเพิ่มข้อมูลในตาราง SubAsset
app.post('/api/subasset', async (req, res) => {
  const {
    sub_asset_name,
    details,
    quantity,
    unit_price,
    status,
    counting_unit,
    main_asset_id,
  } = req.body;

  try {
    // คำสั่ง SQL ที่ถูกต้องโดยไม่ต้องส่งค่า sub_asset_id เนื่องจากจะถูกสร้างอัตโนมัติ
    const query = `
      INSERT INTO public."subasset"(
        sub_asset_name, details, quantity, unit_price, status, counting_unit, main_asset_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    
    const values = [
      sub_asset_name,
      details,
      quantity,
      unit_price,
      status,
      counting_unit,
      main_asset_id,
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

// // API สำหรับดึงข้อมูล SubAsset โดยใช้ sub_asset_id
// app.get('/api/subasset/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query('SELECT * FROM public."subasset" WHERE sub_asset_id = $1', [id]);
//     if(result.rows.length === 0){
//       return res.status(404).json({ error: 'Sub asset not found' });
//     }
//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     console.error("Error fetching sub asset:", error);
//     res.status(500).json({ error: 'Error fetching sub asset' });
//   }
// });

// // API สำหรับดึงข้อมูล SubAsset โดยใช้ main_asset_id
// app.get('/api/subasset/main/:mainId', async (req, res) => {
//   const { mainId } = req.params; // รับค่า main_asset_id
//   try {
//     // ดึงข้อมูล SubAsset ทั้งหมดที่มี main_asset_id ตรงกับ mainId
//     const result = await pool.query('SELECT * FROM public.subasset WHERE main_asset_id = $1', [mainId]);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'No sub-assets found for this main asset' });
//     }

//     res.status(200).json(result.rows); // ส่งกลับข้อมูลเป็น array
//   } catch (error) {
//     console.error("Error fetching sub-assets:", error);
//     res.status(500).json({ error: 'Error fetching sub-assets' });
//   }
// });


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
          main_asset_id = $7
      WHERE sub_asset_id = $8
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
// app.post('/api/user', async (req, res) => {
//   const { user_name, user_email, department_id, role_id, user_role_name } = req.body;

//   if (!user_name || !user_email || !department_id || !role_id || !user_role_name) {
//     return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
//   }

//   const client = await pool.connect();
//   try {
//     await client.query('BEGIN');

//     // ตรวจสอบว่า role_ID มีอยู่หรือไม่
//     const roleCheck = await client.query(
//       `SELECT "role_id" FROM public."role" WHERE "role_id" = $1`, [role_id]
//     );
//     if (roleCheck.rows.length === 0) {
//       await client.query('ROLLBACK');
//       return res.status(400).json({ error: 'role_ID ไม่ถูกต้อง' });
//     }

//     // ตรวจสอบว่ามี user_email ซ้ำหรือไม่
//     const emailCheck = await client.query(
//       `SELECT "user_id" FROM public."user" WHERE user_email = $1`, [user_email]
//     );
//     if (emailCheck.rows.length > 0) {
//       await client.query('ROLLBACK');
//       return res.status(400).json({ error: 'อีเมลนี้ถูกใช้ไปแล้ว' });
//     }

//     // เพิ่มข้อมูลผู้ใช้
//     const userInsert = await client.query(
//       `INSERT INTO public."user" (user_name, user_email, "department_id") 
//        VALUES ($1, $2, $3) RETURNING "user_id", user_name, user_email, "department_id"`,
//       [user_name, user_email, department_ID]
//     );

//     const user_ID = userInsert.rows[0].user_ID; // ดึง user_ID ที่เพิ่มมา

//     // เพิ่มข้อมูล UserRole
//     const userRoleInsert = await client.query(
//       `INSERT INTO public."userrole" (user_role_name, "user_id", "role_id") 
//        VALUES ($1, $2, $3) RETURNING *`,
//       [user_role_name, user_ID, role_ID]
//     );

//     await client.query('COMMIT');
//     res.status(201).json({
//       message: 'เพิ่มผู้ใช้และบทบาทเรียบร้อย',
//       user: userInsert.rows[0],
//       userRole: userRoleInsert.rows[0],
//     });

//   } catch (error) {
//     await client.query('ROLLBACK');
//     console.error('Database error:', error);
//     res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล' });
//   } finally {
//     client.release();
//   }
// });



// ✅ GET: ดึงข้อมูลผู้ใช้ทั้งหมด
app.get("/user", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public."user"');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET: ดึงข้อมูลผู้ใช้ตาม ID
app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM public."user" WHERE user_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST: เพิ่มผู้ใช้ใหม่
app.post("/user", async (req, res) => {
  try {
    const { user_id, user_name, user_email, department_id } = req.body;
    const result = await pool.query(
      'INSERT INTO public."user" (user_id, user_name, user_email, department_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, user_name, user_email, department_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUT: แก้ไขข้อมูลผู้ใช้
app.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user_name, user_email, department_id } = req.body;
    const result = await pool.query(
      'UPDATE public."user" SET user_name = $1, user_email = $2, department_id = $3 WHERE user_id = $4 RETURNING *',
      [user_name, user_email, department_id, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE: ลบผู้ใช้
app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM public."user" WHERE user_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
