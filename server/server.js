const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());  


//*********************************************************************************** */
app.post("/mainasset", async (req, res) => {
  try {
    const {
      main_asset_id,
      main_asset_name,
      status,
      fiscal_year,
      date_received,
      badget_limit,
      averange_price,
      budget_type,
      asset_type,
      location_use,
      location_deliver,
      usage,
      reponsible_person
    } = req.body;

    if (!main_asset_id || !main_asset_name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newAsset = await pool.query(
      `INSERT INTO "mainasset" (
        "main_asset_id", main_asset_name, status, fiscal_year, date_received,
        badget_limit, averange_price, budget_type, asset_type,
        location_use, location_deliver, usage, reponsible_person
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [
        main_asset_id, main_asset_name, status, fiscal_year, date_received,
        badget_limit, averange_price, budget_type, asset_type,
        location_use, location_deliver, usage, reponsible_person
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
    const query = `select mainasset."main_asset_id",main_asset_name,mainasset.status,department_name, count(*)as subamount from mainasset  left join subasset
on mainasset."main_asset_id"=subasset."main_asset_id" 
inner join department on department."department_id" = mainasset."department_id"
group by mainasset."main_asset_id",main_asset_name,mainasset.status,department_name;`; 
    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching assets:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// API สำหรับดึงข้อมูล MainAsset ตาม main_asset_ID
app.get("/mainasset/:main_asset_id", async (req, res) => {
  const { main_asset_ID } = req.params;

  try {
    const query = `SELECT * FROM "mainasset" WHERE "main_asset_id" = $1`;
    const result = await pool.query(query, [main_asset_ID]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "MainAsset not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching asset:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// app.delete("/mainasset/:main_asset_ID", async (req, res) => {
//   const { main_asset_ID } = req.body;

//   if (!main_asset_ID) {
//     return res.status(400).json({ error: "กรุณาระบุ main_asset_ID ที่ต้องการลบ" });
//   }

//   try {
//     const query = `DELETE FROM public.mainasset WHERE "main_asset_ID" = $1 RETURNING *`;
//     console.log(query,req.body)
//     const result = await pool.query(query, [main_asset_ID]);


//     if (result.rowCount === 0) {
//       return res.status(404).json({ error: "ไม่พบข้อมูลที่ต้องการลบ" });
//     }

//     res.status(200).json({ message: "ลบข้อมูลสำเร็จ", deletedData: result.rows[0] });
//   } catch (error) {
//     console.error("Error deleting asset:", error);
//     res.status(500).json({ error: "Server Error" });
//   }
// });

app.delete("/mainasset/:main_asset_id", async (req, res) => {
  const { main_asset_ID } = req.params; // รับค่า main_asset_ID จาก URL parameter

  try {
    const query = `DELETE FROM public.mainasset WHERE "main_asset_id" = $1 RETURNING *`;
    const result = await pool.query(query, [main_asset_ID]);

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
  const { main_asset_ID } = req.params;
  const {
    main_asset_name,
    status,
    fiscal_year,
    date_received,
    badget_limit,
    averange_price,
    budget_type,
    asset_type,
    location_use,
    location_deliver,
    usage,
    reponsible_person
  } = req.body;

  try {
    const query = `
      UPDATE "mainasset"
      SET 
        main_asset_name = $1, status = $2, fiscal_year = $3, date_received = $4,
        badget_limit = $5, averange_price = $6, budget_type = $7, asset_type = $8,
        location_use = $9, location_deliver = $10, usage = $11, reponsible_person = $12
      WHERE "main_asset_ID" = $13 RETURNING *`;
    
    const result = await pool.query(query, [
      main_asset_name, status, fiscal_year, date_received,
      badget_limit, averange_price, budget_type, asset_type,
      location_use, location_deliver, usage, reponsible_person,
      main_asset_ID
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
    sub_asset_id,
    sub_asset_name,
    type,
    details,
    quantity,
    unit_price,
    status,
    counting_unit,
    main_asset_id,
  } = req.body;

  try {
    // เชื่อมต่อกับฐานข้อมูลและเพิ่มข้อมูลลงในตาราง SubAsset
    const query = `
      INSERT INTO public."subasset"(
        "sub_asset_id", sub_asset_name, type, details, quantity, unit_price, status, counting_unit, "main_asset_id"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    
    const values = [
      sub_asset_id,
      sub_asset_name,
      type,
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

// API สำหรับดึงข้อมูลจากตาราง SubAsset
app.get('/api/subasset', async (req, res) => {
  try {
    const query = `SELECT * FROM public."subasset"`;
    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching subassets:", error);
    res.status(500).json({ error: 'Error fetching subassets' });
  }
});

// API สำหรับดึงข้อมูล SubAsset โดยค้นหาตาม sub_asset_ID
app.get('/api/subasset/:sub_asset_id', async (req, res) => {
  const { sub_asset_id } = req.params;

  try {
    const query = `SELECT * FROM public."subasset" WHERE "sub_asset_id" = $1`;
    const result = await pool.query(query, [sub_asset_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'SubAsset not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching sub asset:", error);
    res.status(500).json({ error: 'Error fetching sub asset' });
  }
});
//************************************************************************************************** */

//API สำหรับเพิ่มข้อมูลสาขาวิชา
app.post("/department", async (req, res) => {
  const { department_id, department_name } = req.body;

  if (!department_id || !department_name) {
    return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    const result = await pool.query(
      'INSERT INTO "department" ("department_id", department_name) VALUES ($1, $2) RETURNING *',
      [department_id, department_name]
    );
    res.status(201).json({ message: "เพิ่มภาควิชาเรียบร้อย", data: result.rows[0] });
  } catch (error) {
    console.error("Database error: ", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล" });
  }
});

// API สำหรับดูข้อมูลสาขาวิชา
app.get("/department", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "department" ORDER BY "department_id" ASC');
    res.json(result.rows);
  } catch (error) {
    console.error("Database error: ", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
  }
});

app.get("/department/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM "department" WHERE "department_id" = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "ไม่พบสาขาวิชาที่ต้องการ" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Database error: ", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
  }
});


// API สำหรับลบข้อมูลสาขาวิชา
app.delete("/department/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM "department" WHERE "department_id" = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "ไม่พบภาควิชาที่ต้องการลบ" });
    }

    res.json({ message: "ลบภาควิชาเรียบร้อย", deletedData: result.rows[0] });
  } catch (error) {
    console.error("Database error: ", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบข้อมูล" });
  }
});

// API สำหรับแก้ไขข้อมูลสาขาวิชา
app.put("/department/:id", async (req, res) => {
  const { id } = req.params;
  const { department_name } = req.body;

  if (!department_name) {
    return res.status(400).json({ error: "กรุณากรอกชื่อภาควิชาใหม่" });
  }

  try {
    const result = await pool.query(
      'UPDATE "department" SET department_name = $1 WHERE "department_id" = $2 RETURNING *',
      [department_name, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "ไม่พบภาควิชาที่ต้องการอัปเดต" });
    }

    res.json({ message: "อัปเดตภาควิชาเรียบร้อย", updatedData: result.rows[0] });
  } catch (error) {
    console.error("Database error: ", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" });
  }
});
//*************************************************************************************************** */
//เพิ่มหลักสูตร
app.post("/curriculum", async (req, res) => {
  const { curriculum_id, curriculum_name, department_id } = req.body;
  console.log("Received data:", req.body); // ตรวจสอบข้อมูลที่ได้รับ
  if (!curriculum_id || !curriculum_name || !department_id) {
    return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    const result = await pool.query(
      'INSERT INTO "curriculum" ("curriculum_id", curriculum_name, "department_id") VALUES ($1, $2, $3) RETURNING *',
      [curriculum_id, curriculum_name, department_id]
    );
    res.status(201).json({ message: "เพิ่มหลักสูตรเรียบร้อย", data: result.rows[0] });
  } catch (error) {
    console.error("Database error: ", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล" });
  }
});

// ดึงข้อมูลหลักสูตรทั้งหมด
app.get("/curriculum", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "curriculum"');
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Database error: ", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
  }
});

// ดึงข้อมูลหลักสูตรตาม ID
app.get("/curriculum/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM "curriculum" WHERE "curriculum_id" = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "ไม่พบหลักสูตรที่ต้องการ" });
    }

    res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.error("Database error: ", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
  }
});

//Update ข้อมูลหลักสูตร ตาม ID
app.put("/curriculum/:id", async (req, res) => {
  const { id } = req.params;
  const { curriculum_name, department_id } = req.body;

  if (!curriculum_name || !department_id) {
    return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    const result = await pool.query(
      'UPDATE "curriculum" SET curriculum_name = $1, "department_id" = $2 WHERE "curriculum_id" = $3 RETURNING *',
      [curriculum_name, department_ID, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "ไม่พบหลักสูตรที่ต้องการอัปเดต" });
    }

    res.status(200).json({ message: "อัปเดตหลักสูตรเรียบร้อย", data: result.rows[0] });
  } catch (error) {
    console.error("Database error: ", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" });
  }
});

//ลบข้อมูลหลักสูตรตาม ID
app.delete("/curriculum/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM "curriculum" WHERE "curriculum_id" = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "ไม่พบหลักสูตรที่ต้องการลบ" });
    }

    res.status(200).json({ message: "ลบหลักสูตรเรียบร้อย" });
  } catch (error) {
    console.error("Database error: ", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบข้อมูล" });
  }
});


//****************************************************************************************************************** */
//เพิ่มข้อมูลผู้ใช้
app.post('/api/user', async (req, res) => {
  const { user_name, user_email, department_id, role_id, user_role_name } = req.body;

  if (!user_name || !user_email || !department_id || !role_id || !user_role_name) {
    return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ตรวจสอบว่า role_ID มีอยู่หรือไม่
    const roleCheck = await client.query(
      `SELECT "role_id" FROM public."role" WHERE "role_id" = $1`, [role_id]
    );
    if (roleCheck.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'role_ID ไม่ถูกต้อง' });
    }

    // ตรวจสอบว่ามี user_email ซ้ำหรือไม่
    const emailCheck = await client.query(
      `SELECT "user_id" FROM public."user" WHERE user_email = $1`, [user_email]
    );
    if (emailCheck.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'อีเมลนี้ถูกใช้ไปแล้ว' });
    }

    // เพิ่มข้อมูลผู้ใช้
    const userInsert = await client.query(
      `INSERT INTO public."user" (user_name, user_email, "department_id") 
       VALUES ($1, $2, $3) RETURNING "user_id", user_name, user_email, "department_id"`,
      [user_name, user_email, department_ID]
    );

    const user_ID = userInsert.rows[0].user_ID; // ดึง user_ID ที่เพิ่มมา

    // เพิ่มข้อมูล UserRole
    const userRoleInsert = await client.query(
      `INSERT INTO public."userrole" (user_role_name, "user_id", "role_id") 
       VALUES ($1, $2, $3) RETURNING *`,
      [user_role_name, user_ID, role_ID]
    );

    await client.query('COMMIT');
    res.status(201).json({
      message: 'เพิ่มผู้ใช้และบทบาทเรียบร้อย',
      user: userInsert.rows[0],
      userRole: userRoleInsert.rows[0],
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Database error:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล' });
  } finally {
    client.release();
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
