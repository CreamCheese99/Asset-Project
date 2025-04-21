const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");  // นำเข้า multer
const pool = require("./db");
const app = express();
const LdapAuth = require('./LdapAuth');
const saveUserToDatabase = require('./saveUserToDatabase'); 

const port = 5000;

const whitelist = [
  'http://localhost:5173', // Frontend
  'http://localhost:5000'  // Backend
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {  // สำหรับ request ที่ไม่มาจาก frontend ก็อนุญาต
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // ให้สามารถส่ง cookies หรือข้อมูลส่วนตัวได้
};
app.use(cors(corsOptions));
app.use(express.json());

// กำหนดค่า LDAP
const ldapAuth = new LdapAuth('10.252.92.100', 389, 'dc=kmitl,dc=ac,dc=th'); 

// Endpoint สำหรับตรวจสอบการเข้าสู่ระบบ
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const isAuthenticated = await ldapAuth.authenticate(username, password);
    
    if (isAuthenticated) {
      // ดึงข้อมูลผู้ใช้จาก LDAP
      const userInfo = await ldapAuth.getUserInfo(username);

      // แสดงข้อมูลผู้ใช้ใน log
      console.log('User Info:', userInfo);  // เพิ่มบรรทัดนี้เพื่อแสดงข้อมูลผู้ใช้ที่ดึงจาก LDAP

      await saveUserToDatabase(userInfo); 

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

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// ปิด LDAP Connection เมื่อเซิร์ฟเวอร์หยุดทำงาน
process.on('SIGTERM', () => {
  ldapAuth.close();
  process.exit(0);
});

