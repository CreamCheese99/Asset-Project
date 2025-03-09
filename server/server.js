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
      main_asset_ID,
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

    if (!main_asset_ID || !main_asset_name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newAsset = await pool.query(
      `INSERT INTO "mainasset" (
        "main_asset_ID", main_asset_name, status, fiscal_year, date_received,
        badget_limit, averange_price, budget_type, asset_type,
        location_use, location_deliver, usage, reponsible_person
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [
        main_asset_ID, main_asset_name, status, fiscal_year, date_received,
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
    const query = 'SELECT * FROM "mainasset"';
    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching assets:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// API สำหรับดึงข้อมูล MainAsset ตาม main_asset_ID
app.get("/mainasset/:main_asset_ID", async (req, res) => {
  const { main_asset_ID } = req.params;

  try {
    const query = `SELECT * FROM "mainasset" WHERE "main_asset_ID" = $1`;
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


// API: อัปเดตข้อมูลพัสดุหลัก
const updateAsset = async (data, main_asset_id) => {
  // ตรวจสอบข้อมูลที่สำคัญที่ต้องอัปเดต
  if (!data.main_asset_name) {
    throw new Error("Main asset name is required.");
  }

  try {
    const result = await pool.query(
      `UPDATE mainasset 
      SET 
        main_asset_name = $1, 
        status = $2, 
        fiscal_year = $3, 
        date_received = $4,
        badget_limit = $5,
        averange_price = $6,
        budget_type = $7,
        asset_type = $8,
        location_use = $9,
        location_deliver = $10,
        usage = $11,
        reponsible_person = $12
      WHERE main_asset_id = $13
      RETURNING *`,
      [
        data.main_asset_name,
        data.status || null,
        data.fiscal_year || null,
        data.date_received || null,
        data.badget_limit || null,
        data.averange_price || null,
        data.budget_type || null,
        data.asset_type || null,
        data.location_use || null,
        data.location_deliver || null,
        data.usage || null,
        data.reponsible_person || null,
        main_asset_id  // ใช้ main_asset_id เป็น string
      ]
    );

    if (result.rows.length === 0) {
      throw new Error("Asset not found");
    }

    return result.rows[0];
  } catch (error) {
    console.error("Database update error:", error.message);
    throw error;
  }
};

// API: อัปเดตข้อมูลพัสดุหลัก
app.put('/api/mainasset/:main_asset_id', async (req, res) => {
  const { main_asset_id } = req.params;  // รับ main_asset_id จาก URL parameter
  const data = req.body;  // รับข้อมูลจาก request body

  try {
    const updatedAsset = await updateAsset(data, main_asset_id);
    res.status(200).json(updatedAsset);  // ส่งข้อมูลที่ถูกอัปเดตกลับ
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
});


// API: ลบข้อมูลพัสดุโดย `main_asset_id`
app.delete('/api/mainasset/:main_asset_id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM mainasset WHERE main_asset_id = $1 RETURNING *', [req.params.main_asset_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.status(200).json({ message: 'Asset deleted successfully', deletedAsset: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting data' });
  }
});
// ************************************************************************************************

// API สำหรับเพิ่มข้อมูลในตาราง SubAsset
app.post('/api/subasset', async (req, res) => {
  const {
    sub_asset_ID,
    sub_asset_name,
    type,
    details,
    quantity,
    unit_price,
    status,
    counting_unit,
    main_asset_ID,
  } = req.body;

  try {
    // เชื่อมต่อกับฐานข้อมูลและเพิ่มข้อมูลลงในตาราง SubAsset
    const query = `
      INSERT INTO public."subasset"(
        "sub_asset_ID", sub_asset_name, type, details, quantity, unit_price, status, counting_unit, "main_asset_ID"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    
    const values = [
      sub_asset_ID,
      sub_asset_name,
      type,
      details,
      quantity,
      unit_price,
      status,
      counting_unit,
      main_asset_ID,
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
    console.error("Error fetching sub assets:", error);
    res.status(500).json({ error: 'Error fetching sub assets' });
  }
});

// API สำหรับดึงข้อมูล SubAsset โดยค้นหาตาม sub_asset_ID
app.get('/api/subasset/:sub_asset_ID', async (req, res) => {
  const { sub_asset_ID } = req.params;

  try {
    const query = `SELECT * FROM public."subasset" WHERE "sub_asset_ID" = $1`;
    const result = await pool.query(query, [sub_asset_ID]);

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
  const { department_ID, department_name } = req.body;

  if (!department_ID || !department_name) {
    return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    const result = await pool.query(
      'INSERT INTO "department" ("department_ID", department_name) VALUES ($1, $2) RETURNING *',
      [department_ID, department_name]
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
    const result = await pool.query('SELECT * FROM "department" ORDER BY "department_ID" ASC');
    res.json(result.rows);
  } catch (error) {
    console.error("Database error: ", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
  }
});

app.get("/department/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM "department" WHERE "department_ID" = $1', [id]);

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
    const result = await pool.query('DELETE FROM "department" WHERE "department_ID" = $1 RETURNING *', [id]);

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
      'UPDATE "department" SET department_name = $1 WHERE "department_ID" = $2 RETURNING *',
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
  const { curriculum_ID, curriculum_name, department_ID } = req.body;
  console.log("Received data:", req.body); // ตรวจสอบข้อมูลที่ได้รับ
  if (!curriculum_ID || !curriculum_name || !department_ID) {
    return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    const result = await pool.query(
      'INSERT INTO "curriculum" ("curriculum_ID", curriculum_name, "department_ID") VALUES ($1, $2, $3) RETURNING *',
      [curriculum_ID, curriculum_name, department_ID]
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
    const result = await pool.query('SELECT * FROM "curriculum" WHERE "curriculum_ID" = $1', [id]);

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
  const { curriculum_name, department_ID } = req.body;

  if (!curriculum_name || !department_ID) {
    return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    const result = await pool.query(
      'UPDATE "curriculum" SET curriculum_name = $1, "department_ID" = $2 WHERE "curriculum_ID" = $3 RETURNING *',
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
      'DELETE FROM "curriculum" WHERE "curriculum_ID" = $1 RETURNING *',
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


//*************************************************************************************************** */
//API จัดการสิทธิ์

//เพิ่มผู้ใช้
app.post("/user", async (req, res) => {
  const { user_ID, user_name, user_email, department_ID, role_ID } = req.body;

  if (!user_ID || !user_name || !user_email || !department_ID || !role_ID) {
    return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    await pool.query(
      `INSERT INTO "user" ("user_ID", user_name, user_email, "department_ID") VALUES ($1, $2, $3, $4)`,
      [user_ID, user_name, user_email, department_ID]
    );

    await pool.query(
      `INSERT INTO "UserRole" ("user_ID", "role_ID") VALUES ($1, $2)`,
      [user_ID, role_ID]
    );

    res.status(201).json({ message: "เพิ่มผู้ใช้เรียบร้อย" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
