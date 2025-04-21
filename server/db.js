const { response } = require("express"); 
const {Pool} = require("pg"); 
// ตั้งค่าการเชื่อมต่อ PostgreSQL
const pool = new Pool({
    user: 'postgres',      
    host: 'localhost',         
    database: 'assets',   
    password: '1234',  
    port: 5434,                 
  });
  
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('PostgreSQL connection error:', err.message));

module.exports = pool;
