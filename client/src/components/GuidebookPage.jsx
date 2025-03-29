import React from "react";
import "../css/GuideBook.css";

function GuideBookPage() {
  return (
    <div className="guidebook-container">
      <h1 className="guidebook-title">คู่มือการใช้งานระบบจัดการครุภัณฑ์</h1>
      
      <section className="guidebook-section">
        <h3 className="guidebook-subtitle">1. การเข้าสู่ระบบ</h3>
        <p>เข้าสู่ระบบด้วยชื่อผู้ใช้และรหัสผ่านที่ได้รับจากผู้ดูแลระบบ</p>
      </section>
      
      <section className="guidebook-section">
        <h3 className="guidebook-subtitle">2. การเพิ่มครุภัณฑ์</h3>
        <p>ไปที่เมนู “เพิ่มครุภัณฑ์” แล้วกรอกข้อมูลที่จำเป็น เช่น หมายเลขครุภัณฑ์ ชื่อครุภัณฑ์ และสถานะ</p>
      </section>
      
      <section className="guidebook-section">
        <h3 className="guidebook-subtitle">3. การแก้ไขข้อมูลครุภัณฑ์</h3>
        <p>ค้นหาครุภัณฑ์ที่ต้องการแก้ไข และกดปุ่ม “แก้ไข” เพื่อปรับปรุงข้อมูล</p>
      </section>
      
      <section className="guidebook-section">
        <h3 className="guidebook-subtitle">4. การลบครุภัณฑ์</h3>
        <p>เลือกครุภัณฑ์ที่ต้องการลบแล้วกดปุ่ม “ลบ”</p>
      </section>
    </div>
  );
}

export default GuideBookPage;
