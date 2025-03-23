// const express = require('express');
// const pool= require('./database.js');
// const cors = require('cors');

// const app = express();
// const port = 5000;



// const whitelist = [
//   'http://localhost:5173', // ต้นทางของ frontend
//   'http://localhost:5000'  // ต้นทางของ backend
// ];



// const corsOptions = {
//   origin: function (origin, callback) {
//    if (!origin || whitelist.indexOf(origin) !== -1) {
//    //Disable cheking whitelist for awhile
//       callback(null, true);
//     } else {
//      callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // อนุญาต cookies และข้อมูล credentials ระหว่าง frontend และ backend
// };

// app.use(cors(corsOptions));
// app.use(express.json()); // Middleware สำหรับ parse JSON



// // ฟังก์ชันเพิ่มข้อมูลพัสดุหลัก
// const insertAsset = async (data) => {
//   if (!data.main_item_name || !data.main_item_id) {
//     throw new Error("Main item name and asset ID are required.");
//   }
//   try {
//     const result = await pool.query(
//       `INSERT INTO mainassets (main_item_name, main_item_id, quantity, fiscal_year, budget_amount,
//       fund_type, standrad_price, responsible_person, asset_type, usage_location,
//       delivery_location) 
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ) RETURNING *`,
//       [
//         data.main_item_name,
//         data.main_item_id,
//         data.quantity || null,
//         data.fiscal_year || null,
//         data.budget_amount || null,
//         data.fund_type || null,
//         data.standrad_price || null,
//         data.responsible_person || null,
//         data.asset_type || null,
//         data.usage_location || null,
//         Array.isArray(data.delivery_location) ? data.delivery_location : [data.delivery_location]

//       ]
//     );
//     return result.rows[0];
//   } catch (error) {
//     console.error("Database insertion error:", error.message);
//     throw error; // ส่งต่อ error เพื่อให้จัดการระดับสูงได้
//   }
// };
// //*************** */ API endpoint พัสดุหลัก***************************
// app.post('/api/mainassets', async (req, res) => {
//   const { main_item_name, main_item_id } = req.body;

// console.log('MainAsset = '+ req.body);
//   // ตรวจสอบข้อมูลที่ได้รับ
//   if (!main_item_name || !main_item_id) {
//     console.log('Validation error: Main item name and asset ID are required.');
//     return res.status(400).json({ message: 'Main item name and asset ID are required.' });
//   }

//   // แสดงข้อมูลที่ได้รับใน console
//   console.log('Received data:', req.body);

//   try {
//     const insertedAsset = await insertAsset(req.body);
//     res.status(201).json(insertedAsset); // ส่งกลับข้อมูลทรัพย์สินที่ถูกเพิ่ม
//   } catch (error) {
//     console.error('Error inserting data:', error.message);
//     res.status(500).json({ message: 'Internal server error.', error: error.message });
//   }
// });

// app.get('/api/mainassets', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM mainassets');
//     console.log('Fetched assets:', result.rows); // แสดงผลข้อมูลที่ดึงมา
//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error('Error retrieving assets:', error);
//     res.status(500).json({ error: 'Error retrieving data' });
//   }
// });



// app.get('/api/mainassets/:main_item_id', async (req, res) => {
//   const { main_item_id } = req.params; // ดึง id จาก params
//   const assetId = main_item_id; 
//   try {
//     console.log('Received id:', main_item_id); 
//     main_item_id
    
//     console.log('SELECT * FROM mainassets WHERE main_item_id = $1');

//     // เลือกเฉพาะคอลัมน์ที่ต้องการ เช่น main_item_id, name, และ description
//     const result = await pool.query(
//       'SELECT * FROM mainassets WHERE main_item_id = $1',
//       [assetId]
//     );
    
//     console.log('Fetched assets:', result.rows); // แสดงผลข้อมูลที่ดึงมา
    
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Asset not found' }); // หากไม่พบสินทรัพย์
      
//     }
    
//     res.status(200).json(result.rows[0]); // ส่งข้อมูลของสินทรัพย์ที่พบกลับ
//   } catch (error) {
//     console.error('Error retrieving assets:', error);
//     res.status(500).json({ error: 'Error retrieving data' });
//   }
// });










// // เชื่อมต่อกับ PostgreSQL
// pool.connect()
//   .then(() => console.log("Connected to PostgreSQL"))
//   .catch((error) => console.error("PostgreSQL connection error:", error.message));

// // เริ่มต้นเซิร์ฟเวอร์
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 5000;

// // ใช้ cors เพื่ออนุญาตให้เข้าถึง API จาก Client
// app.use(cors());

// // ข้อมูล JSON ที่เราจำลองจากฐานข้อมูล (ข้อมูลสำหรับกราฟ)
// const data = {
//   departments: [
//     "ครุศาสตร์วิศวกรรม", 
//     "ครุศาสตร์เกษตร", 
//     "ครุศาสตร์สถาปัตยกรรม", 
//     "ครุศาสตร์การออกแบบ", 
//     "ครุศาสตร์การออกแบบสภาพแวดล้อมภายใน"
//   ],
//   fundTypes: [
//     "เงินงบประมาณ", 
//     "เงินรายได้", 
//     "เงินสะสม", 
//     "เงินกันเหลื่อมปี"
//   ],
//   years: ["2565", "2566", "2567", "2568"],
//   departmentDetails: {
//     "ครุศาสตร์วิศวกรรม": {
//       "เงินงบประมาณ": {
//         "2565": [300, 250, 100],
//         "2566": [400, 200, 150],
//         "2567": [500, 300, 180],
//         "2568": [600, 400, 200]
//       },
//       "เงินรายได้": {
//         "2565": [120, 150, 180],
//         "2566": [130, 160, 190],
//         "2567": [140, 170, 200],
//         "2568": [150, 180, 210]
//       }
//     },
//     "ครุศาสตร์เกษตร": {
//       "เงินงบประมาณ": {
//         "2565": [250, 200, 130],
//         "2566": [350, 220, 160],
//         "2567": [450, 270, 210],
//         "2568": [500, 350, 230]
//       },
//       "เงินรายได้": {
//         "2565": [110, 140, 170],
//         "2566": [120, 150, 180],
//         "2567": [130, 160, 190],
//         "2568": [140, 170, 200]
//       }
//     }
//   },
//   assetStatuses: [
//     "ใช้งาน", 
//     "ส่งซ่อม", 
//     "ชำรุด", 
//     "บริจาค/โอน", 
//     "รับโอน", 
//     "จำหน่าย"
//   ],
//   departmentAssets: {
//     "ครุศาสตร์วิศวกรรม": {
//       "ใช้งาน": {
//         "2565": [50, 30, 20],
//         "2566": [60, 40, 30],
//         "2567": [70, 50, 40],
//         "2568": [80, 60, 50]
//       },
//       "ส่งซ่อม": {
//         "2565": [10, 15, 5],
//         "2566": [12, 18, 8],
//         "2567": [14, 20, 10],
//         "2568": [16, 22, 12]
//       }
//     },
//     "ครุศาสตร์เกษตร": {
//       "ใช้งาน": {
//         "2565": [40, 20, 10],
//         "2566": [50, 30, 20],
//         "2567": [60, 40, 30],
//         "2568": [70, 50, 40]
//       },
//       "ส่งซ่อม": {
//         "2565": [8, 10, 3],
//         "2566": [10, 12, 4],
//         "2567": [12, 14, 6],
//         "2568": [14, 16, 8]
//       }
//     }
//   }
// };

// // API ที่ส่งข้อมูล mock
// app.get('/api/getData', (req, res) => {
//   res.json(data);
// });

// // เริ่มต้นเซิร์ฟเวอร์ที่พอร์ต 5000
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// ใช้ cors โดยกำหนดให้เฉพาะโดเมนที่ต้องการเข้าถึง API ได้
const corsOptions = {
  origin: 'http://localhost:5173', // ระบุ URL ของฝั่ง Client ที่อนุญาตให้เข้าถึง API
  methods: 'GET,POST', // กำหนดวิธีการ HTTP ที่อนุญาต
  allowedHeaders: 'Content-Type', // กำหนดหัวข้อที่อนุญาต
};

app.use(cors(corsOptions)); // ใช้ CORS ตามที่กำหนด

// ข้อมูล JSON ที่เราจำลองจากฐานข้อมูล (ข้อมูลสำหรับกราฟ)
const data = {
  departments: [
    "ครุศาสตร์วิศวกรรม",
    "ครุศาสตร์เกษตร",
    "ครุศาสตร์สถาปัตยกรรม",
    "ครุศาสตร์การออกแบบ",
    "ครุศาสตร์การออกแบบสภาพแวดล้อมภายใน"
  ],
  fundTypes: [
    "เงินงบประมาณ", 
    "เงินรายได้", 
    "เงินสะสม", 
    "เงินกันเหลื่อมปี"
  ],
  years: ["2565", "2566", "2567", "2568"],
  departmentAssets: {
    "ครุศาสตร์วิศวกรรม": {
      "ใช้งาน": {
        "2565": [50, 30, 20],
        "2566": [60, 40, 30],
        "2567": [70, 50, 40],
        "2568": [80, 60, 50]
      },
      "ส่งซ่อม": {
        "2565": [10, 15, 5],
        "2566": [12, 18, 8],
        "2567": [14, 20, 10],
        "2568": [16, 22, 12]
      },
      "ชำรุด": {
        "2565": [5, 3, 2],
        "2566": [6, 4, 3],
        "2567": [7, 5, 4],
        "2568": [8, 6, 5]
      },
      "บริจาค/โอน": {
        "2565": [3, 2, 1],
        "2566": [4, 3, 2],
        "2567": [5, 4, 3],
        "2568": [6, 5, 4]
      },
      "รับโอน": {
        "2565": [2, 1, 1],
        "2566": [3, 2, 1],
        "2567": [4, 3, 2],
        "2568": [5, 4, 3]
      },
      "จำหน่าย": {
        "2565": [1, 1, 0],
        "2566": [2, 2, 1],
        "2567": [3, 2, 1],
        "2568": [4, 3, 2]
      }
    },
    "ครุศาสตร์เกษตร": {
      "ใช้งาน": {
        "2565": [40, 20, 10],
        "2566": [50, 30, 20],
        "2567": [60, 40, 30],
        "2568": [70, 50, 40]
      },
      "ส่งซ่อม": {
        "2565": [8, 10, 3],
        "2566": [10, 12, 4],
        "2567": [12, 14, 6],
        "2568": [14, 16, 8]
      },
      "ชำรุด": {
        "2565": [3, 2, 1],
        "2566": [4, 3, 2],
        "2567": [5, 4, 3],
        "2568": [6, 5, 4]
      },
      "บริจาค/โอน": {
        "2565": [2, 1, 1],
        "2566": [3, 2, 1],
        "2567": [4, 3, 2],
        "2568": [5, 4, 3]
      },
      "รับโอน": {
        "2565": [1, 1, 0],
        "2566": [2, 2, 1],
        "2567": [3, 3, 2],
        "2568": [4, 3, 2]
      },
      "จำหน่าย": {
        "2565": [0, 0, 0],
        "2566": [1, 1, 0],
        "2567": [2, 1, 1],
        "2568": [3, 2, 1]
      }
    },
    "ครุศาสตร์สถาปัตยกรรม": {
      "ใช้งาน": {
        "2565": [55, 35, 25],
        "2566": [65, 45, 35],
        "2567": [75, 55, 45],
        "2568": [85, 65, 55]
      },
      "ส่งซ่อม": {
        "2565": [15, 20, 10],
        "2566": [18, 25, 12],
        "2567": [20, 30, 15],
        "2568": [22, 35, 18]
      },
      "ชำรุด": {
        "2565": [8, 5, 3],
        "2566": [10, 7, 4],
        "2567": [12, 9, 6],
        "2568": [14, 10, 7]
      },
      "บริจาค/โอน": {
        "2565": [4, 3, 2],
        "2566": [5, 4, 3],
        "2567": [6, 5, 4],
        "2568": [7, 6, 5]
      },
      "รับโอน": {
        "2565": [3, 2, 1],
        "2566": [4, 3, 2],
        "2567": [5, 4, 3],
        "2568": [6, 5, 4]
      },
      "จำหน่าย": {
        "2565": [2, 1, 1],
        "2566": [3, 2, 1],
        "2567": [4, 3, 2],
        "2568": [5, 4, 3]
      }
    },
    "ครุศาสตร์การออกแบบ": {
      "ใช้งาน": {
        "2565": [60, 40, 30],
        "2566": [70, 50, 40],
        "2567": [80, 60, 50],
        "2568": [90, 70, 60]
      },
      "ส่งซ่อม": {
        "2565": [12, 15, 7],
        "2566": [14, 18, 9],
        "2567": [16, 20, 12],
        "2568": [18, 22, 15]
      },
      "ชำรุด": {
        "2565": [6, 4, 3],
        "2566": [7, 5, 4],
        "2567": [8, 6, 5],
        "2568": [9, 7, 6]
      },
      "บริจาค/โอน": {
        "2565": [3, 2, 1],
        "2566": [4, 3, 2],
        "2567": [5, 4, 3],
        "2568": [6, 5, 4]
      },
      "รับโอน": {
        "2565": [2, 1, 1],
        "2566": [3, 2, 1],
        "2567": [4, 3, 2],
        "2568": [5, 4, 3]
      },
      "จำหน่าย": {
        "2565": [1, 1, 0],
        "2566": [2, 2, 1],
        "2567": [3, 2, 1],
        "2568": [4, 3, 2]
      }
    },
    "ครุศาสตร์การออกแบบสภาพแวดล้อมภายใน": {
      "ใช้งาน": {
        "2565": [30, 20, 15],
        "2566": [40, 30, 25],
        "2567": [50, 40, 35],
        "2568": [60, 50, 45]
      },
      "ส่งซ่อม": {
        "2565": [6, 8, 4],
        "2566": [8, 10, 5],
        "2567": [10, 12, 6],
        "2568": [12, 14, 8]
      },
      "ชำรุด": {
        "2565": [3, 2, 1],
        "2566": [4, 3, 2],
        "2567": [5, 4, 3],
        "2568": [6, 5, 4]
      },
      "บริจาค/โอน": {
        "2565": [1, 1, 0],
        "2566": [2, 1, 1],
        "2567": [3, 2, 1],
        "2568": [4, 3, 2]
      },
      "รับโอน": {
        "2565": [1, 0, 0],
        "2566": [2, 1, 1],
        "2567": [3, 2, 1],
        "2568": [4, 3, 2]
      },
      "จำหน่าย": {
        "2565": [0, 0, 0],
        "2566": [1, 1, 0],
        "2567": [2, 1, 1],
        "2568": [3, 2, 1]
      }
    }
  }
};

// API ที่ส่งข้อมูล mock
app.get('/api/getData', (req, res) => {
  res.json(data);
});

// เริ่มต้นเซิร์ฟเวอร์ที่พอร์ต 5000
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
