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
app.post("/MainAsset", async (req, res) => {
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
      `INSERT INTO "MainAsset" (
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
app.get("/MainAsset", async (req, res) => {
  try {
    const query = 'SELECT * FROM "MainAsset"';
    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching assets:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// API สำหรับดึงข้อมูล MainAsset ตาม main_asset_ID
app.get("/MainAsset/:main_asset_ID", async (req, res) => {
  const { main_asset_ID } = req.params;

  try {
    const query = `SELECT * FROM "MainAsset" WHERE "main_asset_ID" = $1`;
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

// ************************************************************************************************

// API สำหรับเพิ่มข้อมูลในตาราง SubAsset
app.post('/api/SubAsset', async (req, res) => {
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
      INSERT INTO public."SubAsset"(
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
app.get('/api/SubAsset', async (req, res) => {
  try {
    const query = `SELECT * FROM public."SubAsset"`;
    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching sub assets:", error);
    res.status(500).json({ error: 'Error fetching sub assets' });
  }
});

// API สำหรับดึงข้อมูล SubAsset โดยค้นหาตาม sub_asset_ID
app.get('/api/SubAsset/:sub_asset_ID', async (req, res) => {
  const { sub_asset_ID } = req.params;

  try {
    const query = `SELECT * FROM public."SubAsset" WHERE "sub_asset_ID" = $1`;
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

// API สำหรับเพิ่มข้อมูลสาขาวิชา
app.post("/Department", async (req, res) => {
  const { department_ID, department_name } = req.body;

  if (!department_ID || !department_name) {
    return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    const result = await pool.query(
      'INSERT INTO "Department" ("department_ID", department_name) VALUES ($1, $2) RETURNING *',
      [department_ID, department_name]
    );
    res.status(201).json({ message: "เพิ่มภาควิชาเรียบร้อย", data: result.rows[0] });
  } catch (error) {
    console.error("Database error: ", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล" });
  }
});

// API สำหรับดูข้อมูลสาขาวิชา
app.get("/Department", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Department" ORDER BY "department_ID" ASC');
    res.json(result.rows);
  } catch (error) {
    console.error("Database error: ", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
  }
});

// API สำหรับลบข้อมูลสาขาวิชา
app.delete("/Department/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM "Department" WHERE "department_ID" = $1 RETURNING *', [id]);

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
app.put("/Department/:id", async (req, res) => {
  const { id } = req.params;
  const { department_name } = req.body;

  if (!department_name) {
    return res.status(400).json({ error: "กรุณากรอกชื่อภาควิชาใหม่" });
  }

  try {
    const result = await pool.query(
      'UPDATE "Department" SET department_name = $1 WHERE "department_ID" = $2 RETURNING *',
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
//API จัดการสิทธิ์

//เพิ่มผู้ใช้
app.post("/User", async (req, res) => {
  const { user_ID, user_name, user_email, department_ID, role_ID } = req.body;

  if (!user_ID || !user_name || !user_email || !department_ID || !role_ID) {
    return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    await pool.query(
      `INSERT INTO "User" ("user_ID", user_name, user_email, "department_ID") VALUES ($1, $2, $3, $4)`,
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
