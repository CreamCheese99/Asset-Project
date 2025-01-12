const express = require('express');
const pool= require('./database.js');
const cors = require('cors');

const app = express();
const port = 5000;



const whitelist = [
  'http://localhost:5173', // ต้นทางของ frontend
  'http://localhost:5000'  // ต้นทางของ backend
];



const corsOptions = {
  origin: function (origin, callback) {
   if (!origin || whitelist.indexOf(origin) !== -1) {
   //Disable cheking whitelist for awhile
      callback(null, true);
    } else {
     callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // อนุญาต cookies และข้อมูล credentials ระหว่าง frontend และ backend
};

app.use(cors(corsOptions));
app.use(express.json()); // Middleware สำหรับ parse JSON



// ฟังก์ชันเพิ่มข้อมูลพัสดุหลัก
const insertAsset = async (data) => {
  if (!data.main_item_name || !data.main_item_id) {
    throw new Error("Main item name and asset ID are required.");
  }
  try {
    const result = await pool.query(
      `INSERT INTO mainassets (main_item_name, main_item_id, quantity, fiscal_year, budget_amount,
      fund_type, standrad_price, responsible_person, asset_type, usage_location,
      delivery_location) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ) RETURNING *`,
      [
        data.main_item_name,
        data.main_item_id,
        data.quantity || null,
        data.fiscal_year || null,
        data.budget_amount || null,
        data.fund_type || null,
        data.standrad_price || null,
        data.responsible_person || null,
        data.asset_type || null,
        data.usage_location || null,
        Array.isArray(data.delivery_location) ? data.delivery_location : [data.delivery_location]

      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Database insertion error:", error.message);
    throw error; // ส่งต่อ error เพื่อให้จัดการระดับสูงได้
  }
};
//*************** */ API endpoint พัสดุหลัก***************************
app.post('/api/mainassets', async (req, res) => {
  const { main_item_name, main_item_id } = req.body;

console.log('MainAsset = '+ req.body);
  // ตรวจสอบข้อมูลที่ได้รับ
  if (!main_item_name || !main_item_id) {
    console.log('Validation error: Main item name and asset ID are required.');
    return res.status(400).json({ message: 'Main item name and asset ID are required.' });
  }

  // แสดงข้อมูลที่ได้รับใน console
  console.log('Received data:', req.body);

  try {
    const insertedAsset = await insertAsset(req.body);
    res.status(201).json(insertedAsset); // ส่งกลับข้อมูลทรัพย์สินที่ถูกเพิ่ม
  } catch (error) {
    console.error('Error inserting data:', error.message);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
});

app.get('/api/mainassets', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mainassets');
    console.log('Fetched assets:', result.rows); // แสดงผลข้อมูลที่ดึงมา
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error retrieving assets:', error);
    res.status(500).json({ error: 'Error retrieving data' });
  }
});



app.get('/api/mainassets/:main_item_id', async (req, res) => {
  const { main_item_id } = req.params; // ดึง id จาก params
  const assetId = main_item_id; 
  try {
    console.log('Received id:', main_item_id); 
    main_item_id
    
    console.log('SELECT * FROM mainassets WHERE main_item_id = $1');

    // เลือกเฉพาะคอลัมน์ที่ต้องการ เช่น main_item_id, name, และ description
    const result = await pool.query(
      'SELECT * FROM mainassets WHERE main_item_id = $1',
      [assetId]
    );
    
    console.log('Fetched assets:', result.rows); // แสดงผลข้อมูลที่ดึงมา
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Asset not found' }); // หากไม่พบสินทรัพย์
      
    }
    
    res.status(200).json(result.rows[0]); // ส่งข้อมูลของสินทรัพย์ที่พบกลับ
  } catch (error) {
    console.error('Error retrieving assets:', error);
    res.status(500).json({ error: 'Error retrieving data' });
  }
});










// เชื่อมต่อกับ PostgreSQL
pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((error) => console.error("PostgreSQL connection error:", error.message));

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

