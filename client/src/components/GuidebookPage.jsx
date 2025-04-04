
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

const sections = [
  {
    title: "1. การเข้าสู่ระบบ",
    image: loginImage,
    steps: [
      "กรอก username และ password (โดย Username และ Password จะใช้เป็น Email และ Password ของสถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบังเท่านั้น)",
      "กด Login",
    ],
  },
  {
    title: "2. การใช้งานหน้าหลัก",
    image: homeImage,
    steps: [
      "เลือกเมนู 'หน้าหลัก' จากแถบเมนูด้านบนหรือเมื่อผู้ใช้ login จะเข้าสู่หน้าหลักโดยอัตโนมัติ",
      "ผู้ใช้สามารถฟิลเตอร์ภาควิชาหรือเลือกข้อมูลที่จะให้แสดงได้",
      "ผู้ใช้สามารถฟิลเตอร์สถานะสินทรัพย์หรือเลือกข้อมูลที่จะให้แสดงได้",
      "ผู้ใช้สามารถฟิลเตอร์แหล่งเงินหรือเลือกข้อมูลที่จะให้แสดงได้",
      "ผู้ใช้สามารถฟิลเตอร์ปีหรือเลือกข้อมูลที่จะให้แสดงได้",
    ],
  },
  {
    title: "3. การใช้งานหน้าจัดการพัสดุ",
    image: manageassetImage,
    steps: [
      "เลือกเมนู 'หน้าจัดการพัสดุ' จากแถบเมนูด้านบน",
      "ค้นหาได้จาก ภาควิชา, ประเภทสินทรัพย์, ประเภทเงิน, สภาพครุภัณฑ์, รหัสทรัพย์สิน",
      "เพิ่มข้อมูลรายการพัสดุใหม่ได้(3)",
      "ดูรายละเอียดพัสดุได้(4)",
      "ลบรายการพัสดุได้(5)",
      "แก้ไขข้อมูลรายการพัสดุได้(6)",
    ],
  },
  {
    title: "4. การใช้งานหน้าเพิ่มรายละเอียดพัสดุ",
    image: insertImage,
    steps: [
      "กรอกข้อมูลในกรอบหมายเลข 1",
      "เพิ่มรูปภาพ (หมายเลข 2)",
      "เพิ่มพัสดุย่อย (หมายเลข 3)",
      "คลิก 'บันทึก' เพื่อบันทึกข้อมูล",
    ],
    subImage: insertsubImage,
    subSteps: [
      "คลิกปุ่ม 'เพิ่ม' ดังรุปด้สนบนหมายเลข 3 จะแสดงหน้าต่างเพิ่มข้อมูลพัสดุย่อย",
      "คลิก 'บันทึก' เพื่อเพิ่มข้อมูลย่อย",
    ],
  },
  {
    title: "5. การใช้งานหน้าข้อมูลทั่วไป",
    image: infomationImage,
    steps: [
      "เลือกเมนู 'ข้อมูลทั่วไป' จากแถบเมนูด้านบน",
      "สามารถเพิ่ม ลบ แก้ไขข้อมูลผ่านปุ่มหมายเลข 2, 3, 4",
    ],
  },
  {
    title: "6. การใช้งานหน้าจัดการสิทธิ์",
    image: permissionImage,
    steps: [
      "เลือกเมนู 'จัดการสิทธิ์' จากแถบเมนูด้านบน",
      "ผู้ดูแลระบบสามารถเพิ่ม / ลบ / แก้ไข บทบาทผู้ใช้",
    ],
  },
  {
    title: "7. ออกจากระบบ",
    image: logoutImage,
    steps: [
      "คลิกที่รูปโปรไฟล์มุมขวาบน",
      "คลิก 'ออกจากระบบ'",
    ],
  },
];

function GuideBookPage() {
  return (
    <div className="guidebook-container">
      <h1 className="guidebook-title">📘 คู่มือการใช้งานระบบจัดการครุภัณฑ์</h1>
      {sections.map((section, index) => (
        <div className="guidebook-card" key={index}>
          <h2 className="guidebook-subtitle">{section.title}</h2>
          <div className="guidebook-image-wrapper">
            <img src={section.image} alt={section.title} />
          </div>
          <ol className="guidebook-list">
            {section.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          {section.subImage && (
            <>
              <div className="guidebook-image-wrapper">
                <img src={section.subImage} alt="Sub Detail" />
              </div>
              <ol className="guidebook-list">
                {section.subSteps.map((step, i) => (
                  <li key={`sub-${i}`}>{step}</li>
                ))}
              </ol>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default GuideBookPage;

