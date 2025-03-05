// const express = require('express');
// const pool = require('./database.js'); // เชื่อมกับ database.js
// const cors = require('cors');

// const app = express();
// const port = 5001;

// const whitelist = [
//   'http://localhost:5173', // ต้นทางของ frontend
//   'http://localhost:5000'  // ต้นทางของ backend
// ];

// // ตั้งค่า CORS (อนุญาตทุก origin สำหรับพัฒนา)
// const corsOptions = {
//   origin: '*', // เปลี่ยนเป็น domain จริงใน Production
//   credentials: true,
// };
// app.use(cors(corsOptions));
// app.use(express.json()); // Middleware สำหรับ parse JSON

// // ฟังก์ชันเพิ่มข้อมูลพัสดุหลัก (Main Asset)
// const insertAsset = async (data) => {
//   if (!data.main_item_name || !data.main_item_id) {
//     throw new Error("Main item name and asset ID are required.");
//   }
//   try {
//     const result = await pool.query(
//       `INSERT INTO mainassets 
//       (main_item_name, main_item_id, quantity, fiscal_year, budget_amount, 
//        fund_type, standard_price, responsible_person, asset_type, usage_location, 
//        delivery_location) 
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ) RETURNING *`,
//       [
//         data.main_item_name,
//         data.main_item_id,
//         data.quantity || null,
//         data.fiscal_year || null,
//         data.budget_amount || null,
//         data.fund_type || null,
//         data.standard_price || null, 
//         data.responsible_person || null,
//         data.asset_type || null,
//         data.usage_location || null,
//         JSON.stringify(data.delivery_location) || null, 
//       ]
//     );
//     return result.rows[0];
//   } catch (error) {
//     console.error("Database insertion error:", error.message);
//     throw error;
//   }
// };

// // API: เพิ่มข้อมูลพัสดุหลัก (POST)
// app.post('/api/mainassets', async (req, res) => {
//   console.log('Received data:', req.body);

//   // ตรวจสอบข้อมูลก่อนเพิ่ม
//   if (!req.body.main_item_name || !req.body.main_item_id) {
//     return res.status(400).json({ message: 'Main item name and asset ID are required.' });
//   }

//   try {
//     const insertedAsset = await insertAsset(req.body);
//     res.status(201).json(insertedAsset); //ส่งข้อมูลพัสดุที่เพิ่มกลับ
//   } catch (error) {
//     console.error('Error inserting data:', error.message);
//     res.status(500).json({ message: 'Internal server error.', error: error.message });
//   }
// });

// //API: ดึงข้อมูลพัสดุทั้งหมด (GET)
// app.get('/api/mainassets', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM mainassets');
//     console.log('Fetched assets:', result.rows);
//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error('Error retrieving assets:', error);
//     res.status(500).json({ error: 'Error retrieving data' });
//   }
// });

// //API: ดึงข้อมูลพัสดุโดยใช้ `main_item_id` (GET)
// app.get('/api/mainassets/:main_item_id', async (req, res) => {
//   const { main_item_id } = req.params;
  
//   if (!main_item_id) {
//     return res.status(400).json({ error: 'main_item_id is required' });
//   }

//   try {
//     console.log('Searching for asset ID:', main_item_id);

//     const result = await pool.query('SELECT * FROM mainassets WHERE main_item_id = $1', [main_item_id]);

//     if (result.rows.length === 0) {
//       console.log('Asset not found:', main_item_id);
//       return res.status(404).json({ error: 'Asset not found' });
//     }

//     console.log('Asset found:', result.rows[0]);
//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     console.error('Error retrieving asset:', error);
//     res.status(500).json({ error: 'Error retrieving data' });
//   }
// });

// //API: ลบข้อมูลพัสดุโดยใช้ `main_item_id` (DELETE)
// app.delete('/api/mainassets/:main_item_id', async (req, res) => {
//   const { main_item_id } = req.params;

//   if (!main_item_id) {
//     return res.status(400).json({ error: 'main_item_id is required' });
//   }

//   try {
//     console.log('Deleting asset ID:', main_item_id);

//     const result = await pool.query('DELETE FROM mainassets WHERE main_item_id = $1 RETURNING *', [main_item_id]);

//     if (result.rows.length === 0) {
//       console.log('Asset not found for deletion:', main_item_id);
//       return res.status(404).json({ error: 'Asset not found' });
//     }

//     console.log('Deleted asset:', result.rows[0]);
//     res.status(200).json({ message: 'Asset deleted successfully', deletedAsset: result.rows[0] });
//   } catch (error) {
//     console.error('Error deleting asset:', error);
//     res.status(500).json({ error: 'Error deleting data' });
//   }
// });

// //เริ่มต้นเซิร์ฟเวอร์
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// }).on('error', (err) => {
//   console.error('Server startup error:', err);
// });




// authen Ldap test
const express = require('express');
const pool = require('./database.js'); // เชื่อมกับ database.js
const cors = require('cors');
const LdapAuth = require('./LdapAuth'); // นำเข้า LDAP Authentication

const app = express();
const port = 5001;

const whitelist = [
  'http://localhost:5173', // Frontend
  'http://localhost:5000'  // Backend
];

const corsOptions = {
  origin: '*', // เปลี่ยนเป็น domain จริงใน Production
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// กำหนดค่า LDAP
const ldapAuth = new LdapAuth('10.252.92.100', 389, 'dc=kmitl,dc=ac,dc=th');

//Endpoint สำหรับ Login ผ่าน LDAP
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const isAuthenticated = await ldapAuth.authenticate(username, password);
    if (isAuthenticated) {
      const userInfo = await ldapAuth.getUserInfo(username);
      res.json({ success: true, message: 'Authentication successful', user: userInfo });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('LDAP Error:', error);
    res.status(500).json({ success: false, message: error });
  }
});

//ฟังก์ชันเพิ่มข้อมูลพัสดุหลัก
const insertAsset = async (data) => {
  if (!data.main_item_name || !data.main_item_id) {
    throw new Error("Main item name and asset ID are required.");
  }
  try {
    const result = await pool.query(
      `INSERT INTO mainassets 
      (main_item_name, main_item_id, quantity, fiscal_year, budget_amount, 
       fund_type, standard_price, responsible_person, asset_type, usage_location, 
       delivery_location) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ) RETURNING *`,
      [
        data.main_item_name,
        data.main_item_id,
        data.quantity || null,
        data.fiscal_year || null,
        data.budget_amount || null,
        data.fund_type || null,
        data.standard_price || null, 
        data.responsible_person || null,
        data.asset_type || null,
        data.usage_location || null,
        JSON.stringify(data.delivery_location) || null, 
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Database insertion error:", error.message);
    throw error;
  }
};

//API: เพิ่มข้อมูลพัสดุหลัก
app.post('/api/mainassets', async (req, res) => {
  console.log('Received data:', req.body);
  if (!req.body.main_item_name || !req.body.main_item_id) {
    return res.status(400).json({ message: 'Main item name and asset ID are required.' });
  }

  try {
    const insertedAsset = await insertAsset(req.body);
    res.status(201).json(insertedAsset);
  } catch (error) {
    console.error('Error inserting data:', error.message);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
});

//API: ดึงข้อมูลพัสดุทั้งหมด
app.get('/api/mainassets', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mainassets');
    console.log('Fetched assets:', result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error retrieving assets:', error);
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

//API: ดึงข้อมูลพัสดุโดย `main_item_id`
app.get('/api/mainassets/:main_item_id', async (req, res) => {
  const { main_item_id } = req.params;
  
  if (!main_item_id) {
    return res.status(400).json({ error: 'main_item_id is required' });
  }

  try {
    console.log('Searching for asset ID:', main_item_id);
    const result = await pool.query('SELECT * FROM mainassets WHERE main_item_id = $1', [main_item_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error retrieving asset:', error);
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

//API: ลบข้อมูลพัสดุโดย `main_item_id`
app.delete('/api/mainassets/:main_item_id', async (req, res) => {
  const { main_item_id } = req.params;

  if (!main_item_id) {
    return res.status(400).json({ error: 'main_item_id is required' });
  }

  try {
    console.log('Deleting asset ID:', main_item_id);
    const result = await pool.query('DELETE FROM mainassets WHERE main_item_id = $1 RETURNING *', [main_item_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    res.status(200).json({ message: 'Asset deleted successfully', deletedAsset: result.rows[0] });
  } catch (error) {
    console.error('Error deleting asset:', error);
    res.status(500).json({ error: 'Error deleting data' });
  }
});

//เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

//ปิด LDAP Connection เมื่อเซิร์ฟเวอร์หยุดทำงาน
process.on('SIGTERM', () => {
  ldapAuth.close();
  process.exit(0);
});
