// authen Ldap test
const express = require('express');
const pool = require('./database.js'); // เชื่อมกับ database.js
const cors = require('cors');
const LdapAuth = require('./LdapAuth'); // นำเข้า LDAP Authentication

const app = express();
const port = 5001;

const whitelist = [
  'http://localhost:5173', // Frontend
  'http://localhost:5001'  // Backend
];

const corsOptions = {
  origin: 'http://localhost:5173', // เปลี่ยนเป็น domain จริงใน Production
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// กำหนดค่า LDAP
const ldapAuth = new LdapAuth('10.252.92.100', 389, 'dc=kmitl,dc=ac,dc=th');

// Endpoint สำหรับ Login ผ่าน LDAP
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const authResult = await ldapAuth.authenticate(username, password);
    if (authResult) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login authentication:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// API: เพิ่มข้อมูลพัสดุหลัก
const insertAsset = async (data) => {
  if (!data.main_asset_name || !data.main_asset_id) {
    throw new Error("Main item name and asset ID are required.");
  }
  try {
    const result = await pool.query(
      `INSERT INTO mainasset 
      (main_asset_name, main_asset_id, status, fiscal_year, date_received, 
       badget_limit, averange_price, budget_type, asset_type, location_use, 
       location_deliver, usage, reponsible_person) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [
        data.main_asset_name,
        data.main_asset_id,
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
        // JSON.stringify(data.delivery_location) || null, 
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Database insertion error:", error.message);
    throw error;
  }
};

// API: เพิ่มข้อมูลพัสดุหลัก
app.post('/api/mainassets', async (req, res) => {
  try {
    console.log(req.body);
    const insertedAsset = await insertAsset(req.body);
    res.status(201).json(insertedAsset);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
});

// API: ดึงข้อมูลพัสดุทั้งหมด
app.get('/api/mainassets', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mainassets');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

// API: ดึงข้อมูลพัสดุโดย `main_item_id`
app.get('/api/mainassets/:main_item_id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mainassets WHERE main_item_id = $1', [req.params.main_item_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

// API: ลบข้อมูลพัสดุโดย `main_item_id`
app.delete('/api/mainassets/:main_item_id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM mainassets WHERE main_item_id = $1 RETURNING *', [req.params.main_item_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.status(200).json({ message: 'Asset deleted successfully', deletedAsset: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting data' });
  }
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// ปิด LDAP Connection เมื่อเซิร์ฟเวอร์หยุดทำงาน
process.on('SIGTERM', () => {
  ldapAuth.close();
  process.exit(0);
});
