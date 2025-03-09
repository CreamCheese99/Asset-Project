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
// สร้างอินสแตนซ์ของ LdapAuth
const ldapAuth = new LdapAuth('10.252.92.100', 389, 'dc=kmitl,dc=ac,dc=th'); 

// Endpoint สำหรับตรวจสอบการเข้าสู่ระบบ
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  console.log('Request Body:', req.body); // แสดงค่าที่รับมาจาก frontend
  
  if (!username || !password) {   
    return res.status(400).json({ message: 'Username and password are required' });
  }
  
  try { 
    const isAuthenticated = await ldapAuth.authenticate(username, password);
    
    console.log('Authentication result:', isAuthenticated);  // แสดงผลลัพธ์การตรวจสอบผู้ใช้
    
    if (isAuthenticated) {
      const userInfo = await ldapAuth.getUserInfo(username);
      console.log('User Info:', userInfo);  // แสดงข้อมูลผู้ใช้จาก LDAP

      res.json({
        success: true,
        message: 'Authentication successful',
        user: userInfo // ส่งข้อมูลผู้ใช้กลับไปยัง frontend
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
  } catch (error) {
    console.error('Error:', error);  // แสดงข้อผิดพลาดหากเกิดขึ้น
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


// API: เพิ่มข้อมูลพัสดุหลัก
const insertAsset = async (data) => {
  if (!data.main_asset_name || !data.main_asset_id) {
    throw new Error("Main asset name and asset ID are required.");
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
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Database insertion error:", error.message);
    throw error;
  }
};

// API: เพิ่มข้อมูลพัสดุหลัก
app.post('/api/mainasset', async (req, res) => {
  try {
    console.log(req.body);
    const insertedAsset = await insertAsset(req.body);
    res.status(201).json(insertedAsset);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error: error.message });
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



// API: ดึงข้อมูลพัสดุทั้งหมด
app.get('/api/mainasset', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mainasset');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

// API: ดึงข้อมูลพัสดุโดย `main_asset_id`
app.get('/api/mainasset/:main_asset_id', async (req, res) => {
  try {
    const mainAssetId = req.params.main_asset_id; 
    const result = await pool.query('SELECT * FROM mainasset WHERE main_asset_id = $1', [mainAssetId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Error retrieving data' });
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

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// ปิด LDAP Connection เมื่อเซิร์ฟเวอร์หยุดทำงาน
process.on('SIGTERM', () => {
  ldapAuth.close();
  process.exit(0);
});
