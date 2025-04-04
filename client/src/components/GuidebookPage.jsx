import React from "react";
import "../css/GuideBook.css";
import loginImage from '../image/login.png';
import homeImage from '../image/home.png';
import manageassetImage from '../image/manageasset.png';
import insertImage from '../image/insert.png';
import insertsubImage from '../image/insertsub.png';
import infomationImage from '../image/infomation.png';
import permissionImage from '../image/permission.png';
import logoutImage from '../image/logout.png';

function GuideBookPage() {
  return (
    <div className="guidebook-container">
    <h1 className="guidebook-title">คู่มือการใช้งานระบบจัดการครุภัณฑ์</h1>
    
    <section className="guidebook-section">
      <h3 className="guidebook-subtitle">1. การเข้าสู่ระบบ</h3>
      <img src={loginImage} alt="เข้าสู่ระบบ" />
      <p className="guidebook-text">1.	กรอก username และ password (โดย Username และ Password จะใช้เป็น Email และ Password ของสถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบังเท่านั้น)</p>
      <p className="guidebook-text">2.	กด Login</p>
    </section>
    
    <section className="guidebook-section">
      <h3 className="guidebook-subtitle">2. การใช้งานหน้าหลัก</h3>
      <img src={homeImage} alt="หน้าหลัก" />
      <p className="guidebook-text">1.	ผู้ใช้สามารถเลือกหน้าหลักได้จากแถบเมนูด้านบนหรือเมื่อผู้ใช้ login จะเข้าสู่หน้าหลักโดยอัตโนมัติ</p>
      <p className="guidebook-text">2.	ผู้ใช้สามารถฟิลเตอร์ภาควิชาหรือเลือกข้อมูลที่จะให้แสดงได้</p>
      <p className="guidebook-text">3.	ผู้ใช้สามารถฟิลเตอร์สถานะสินทรัพย์หรือเลือกข้อมูลที่จะให้แสดงได้</p>
      <p className="guidebook-text">4.	ผู้ใช้สามารถฟิลเตอร์แหล่งเงินหรือเลือกข้อมูลที่จะให้แสดงได้</p>
      <p className="guidebook-text">5.	ผู้ใช้สามารถฟิลเตอร์ปีหรือเลือกข้อมูลที่จะให้แสดงได้</p>
    </section>
    
    <section className="guidebook-section">
      <h3 className="guidebook-subtitle">3. การใช้งานหน้าจัดการพัสดุ</h3>
      <img src={manageassetImage} alt="หน้าจัดการพัสดุ" />
      <p className="guidebook-text">1.	ผู้ใช้สามารถเลือกหน้าจัดการพัสดุได้จากแถบเมนูด้านบน</p>
      <p className="guidebook-text">2.	ผู้ใช้สามารถค้นหาข้อมูลพัสดุโดยค้นหาได้จาก ภาควิชา, ประเภทสินทรัพย์, ประเภทเงิน, สภาพครุภัณฑ์, รหัสทรัพย์สิน</p>
      <p className="guidebook-text">3.	ผู้ใช้สามารถเพิ่มข้อมูลรายการพัสดุใหม่ได้</p>
      <p className="guidebook-text">4.	ผู้ใช้สามารถดูรายละเอียดพัสดุได้</p>
      <p className="guidebook-text">5.	ผู้ใช้สามารถลบรายการพัสดุได้</p>
      <p className="guidebook-text">6.	ผู้ใช้สามารถแก้ไขข้อมูลรายการพัสดุได้</p>
    </section>
    
    <section className="guidebook-section">
      <h3 className="guidebook-subtitle">4. การใช้งานหน้าเพิ่มรายละเอียดพัสดุ</h3>
      <img src={insertImage} alt="หน้าเพิ่มรายละเอียดพัสดุ" />
      <p className="guidebook-text">1.	ผู้ใช้สามารถกรอกรายละเอียดข้อมูลได้ตามในกรอบหมายเลข 1</p>
      <p className="guidebook-text">2.	ผู้ใช้สามารถเพิ่มรูปภาพได้เมื่อคลิกปุ่มหมายเลข 2</p>
      <p className="guidebook-text">3.	ผู้ใช้สามารถเพิ่มรายละเอียดพัสดุย่อยได้เมื่อคลิกปุ่มหมายเลข 3</p>  
      <p className="guidebook-text">4.	คลิกปุ่ม “บันทึก” เพื่อให้ข้อมูลบันทึกลงในระบบ</p>
      <img src={insertsubImage} alt="หน้าเพิ่มรายละเอียดพัสดุย่อย" />  
      <p className="guidebook-text">5.	เมื่อคลิกปุ่มหมายเลข 3 ดังรูปด้านบน จะแสดงหน้าต่างให้เพิ่มข้อมูลพัสดุย่อย</p>
      <p className="guidebook-text">6.	คลิกปุ่ม “บันทึก” เพื่อให้ข้อมูลพัสดุย่อยบันทึกลงในระบบ</p>    
    </section>

    <section className="guidebook-section">
      <h3 className="guidebook-subtitle">5. การใช้งานหน้าข้อมูลทั่วไป</h3>
      <img src={infomationImage} alt="หน้าข้อมูลทั่วไป" />
      {/* ใส่ข้อมูลอีกหน่อย */}
      <p className="guidebook-text">1.	ผู้ใช้สามารถเลือกหน้าข้อมูลทั่วไปได้จากแถบเมนูด้านบน</p>
      <p className="guidebook-text">2.	ผู้สามารถเพิ่ม ลบ แก้ไขข้อมูลได้จากการคลิกปุ่ม 2 3 หรือ 4</p>
    </section>

    <section className="guidebook-section">
      <h3 className="guidebook-subtitle">6. การใช้งานหน้าจัดการสิทธิ์</h3>
      <img src={permissionImage} alt="หน้าจัดการสิทธิ์" />
      <p className="guidebook-text">1.	ผู้ใช้สามารถเลือกหน้าจัดการสิทธิ์ได้จากแถบเมนูด้านบน</p>
      <p className="guidebook-text">2.	ผู้ดูแลระบบสามารถเพิ่มผู้ใช้งานได้</p>
      <p className="guidebook-text">3.	ผู้ดูแลระบบสามารถจัดการหรือแก้ไขบทบาทของผู้ใช้งานได้</p>
      <p className="guidebook-text">4.	ผู้ดูแลระบบสามารถลบผู้ใช้งานได้</p>
    </section>

    <section className="guidebook-section">
      <h3 className="guidebook-subtitle">7. ออกจากระบบ</h3>
      <img src={logoutImage} alt="ออกจากระบบ" />
      <p className="guidebook-text">1.	คลิกที่โปรไฟล์ มุมขวาบนจะแสดงปุ่มออกจากระบบ</p>
      <p className="guidebook-text">2.	คลิกปุ่มออกจากระบบ</p>
    </section>    
  </div>
  
  );
}

export default GuideBookPage;
