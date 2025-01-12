const { response } = require("express"); //response ถูกนำเข้าจาก express 
const {Pool} = require("pg"); //Pool คือคลาสที่ใช้ในการจัดการการเชื่อมต่อกับฐานข้อมูล PostgreSQL


// ตั้งค่าการเชื่อมต่อ PostgreSQL
const pool = new Pool({
    user: 'postgres',      
    host: 'localhost',         
    database: 'Inventory2',   
    password: '1234',  
    port: 5432,                 
  });

module.exports = pool;
