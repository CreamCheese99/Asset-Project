const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


//*********************************************************************************** */

//  API เพิ่มข้อมูลลงใน MainAsset
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
    // เชื่อมต่อกับฐานข้อมูลและดึงข้อมูลจากตาราง MainAsset
    const query = 'SELECT * FROM "MainAsset"';
    const result = await pool.query(query);
    console.log('MainAsset:', result.rows);

    //ข้อมูลถูกดึงมาแล้ว ส่งกลับรูปแบบ JSON
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
    console.log('<MainAsset> data:', result.rows);  

    // ตรวจสอบว่ามีข้อมูลหรือไม่
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "MainAsset not found" });
    }

    // ส่งข้อมูลในรูปแบบ JSON
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching asset:", error);
    res.status(500).json({ error: "Server Error" });
  }
});



//***************************************************************************************************************************************** */

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
    console.error(error);
    res.status(500).json({ error: 'Error adding sub asset' });
  }
});

// API สำหรับดึงข้อมูลจากตาราง SubAsset
app.get('/api/SubAsset', async (req, res) => {
  try {
    
    const query = `SELECT * FROM public."SubAsset"`;
    const result = await pool.query(query);

    console.log('SubAssets:', result.rows);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching sub assets' });
  }
});


// API สำหรับดึงข้อมูล SubAsset โดยค้นหาตาม sub_asset_ID
app.get('/api/SubAsset/:sub_asset_ID', async (req, res) => {
  const { sub_asset_ID } = req.params;

  try {
    
    const query = `SELECT * FROM public."SubAsset" WHERE "sub_asset_ID" = $1`;
    const result = await pool.query(query, [sub_asset_ID]);

    console.log('SubAsset data:', result.rows);  

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'SubAsset not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching sub asset' });
  }
});

//******************************************************************************************************************** */


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
