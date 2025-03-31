import React from "react";
import "../css/GuideBook.css";

function GuideBookPage() {
  return (
    <div className="guidebook-container">
    <h1 className="guidebook-title">คู่มือการใช้งานระบบจัดการครุภัณฑ์</h1>
    
    <section className="guidebook-section">
      <h3 className="guidebook-subtitle">1. การเข้าสู่ระบบ</h3>
      <p className="guidebook-text">เข้าสู่ระบบด้วยชื่อผู้ใช้และรหัสผ่าน</p>
    </section>
    
    <section className="guidebook-section">
      <h3 className="guidebook-subtitle">2. การเพิ่มครุภัณฑ์</h3>
      <p className="guidebook-text">
        <strong>เจ้าหน้าที่ประจำคณะ:</strong> คลิกปุ่ม "เพิ่ม" ที่อยู่หัวตารางเเสดงข้อมูล เพื่อทำการกรอกข้อมูลครุภัณฑ์หลัก เมื่อกรอกเสร็จสิ้นแล้วคลิกปุ่ม "บันทึก" ข้อมูลจะถูกบันทึกเรียบร้อย
      </p>
      <p className="guidebook-text">
        <strong>อาจารย์:</strong> สามารถเพิ่มครุภัณฑ์ย่อยได้เท่านั้น และต้องเพิ่มเฉพาะครุภัณฑ์ที่ได้รับมอบหมาย หากต้องการเพิ่มข้อมูล คลิกปุ่ม "แก้ไข" ที่อยู่ในตารางจัดการ เพื่อกรอกข้อมูลครุภัณฑ์ย่อย เมื่อกรอกเสร็จสิ้นแล้วคลิกปุ่ม "บันทึก" ข้อมูลจะถูกบันทึกเรียบร้อย
      </p>
    </section>
    
    <section className="guidebook-section">
      <h3 className="guidebook-subtitle">3. การแก้ไขข้อมูลครุภัณฑ์</h3>
      <p className="guidebook-text">
        <strong>อาจารย์:</strong> หากต้องการแก้ไขข้อมูล คลิกปุ่ม "แก้ไข" ในตารางจัดการ เพื่อทำการแก้ไขข้อมูลครุภัณฑ์ เมื่อแก้ไขเสร็จแล้วคลิกปุ่ม "บันทึก" ข้อมูลจะถูกบันทึกเรียบร้อย
      </p>
    </section>
    
    <section className="guidebook-section">
      <h3 className="guidebook-subtitle">4. การลบครุภัณฑ์</h3>
      <p className="guidebook-text">
        เลือกครุภัณฑ์ที่ต้องการลบแล้วกดปุ่ม “ลบ” <br />
        <span className="guidebook-note">หมายเหตุ: เมื่อลบครุภัณฑ์หลัก ครุภัณฑ์ย่อยจะถูกลบด้วย</span>
      </p>
    </section>
  </div>
  
  );
}

export default GuideBookPage;
