import React from "react";
import "../css/GuideBook.css";
import loginImage from "../image/guidebookImage/login.png";
import homeImage from "../image/guidebookImage/manager/home.png";
import home2Image from "../image/guidebookImage/manager/home2.png";
import logoutImage from "../image/guidebookImage/manager/logout.png";

const sections = [
  {
    title: "1. การเข้าสู่ระบบ",
    image: loginImage,
    steps: [
      { type: "text", content: "1. กรอก username และ password (โดย Username และ Password จะใช้เป็น Email และ Password ของสถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบังเท่านั้น)" },
      { type: "text", content: "2. กด Login" },
    ],
  },
  {
    title: "2. การใช้งานหน้าหลัก",
    image: homeImage,
    steps: [
      { type: "text", content: "1. เลือกเมนู 'หน้าหลัก' จากแถบเมนูด้านบนหรือเมื่อผู้ใช้ login จะเข้าสู่หน้าหลักโดยอัตโนมัติ" },
      { type: "text", content: "2. ผู้ใช้สามารถฟิลเตอร์ภาควิชา แหล่งเงินหรือปีที่จะให้แสดงข้อมูลได้และมีปุ่ม'รีเซ็ต'เพื่อล้างค่าที่ฟิลเตอร์ไว้" },
      { type: "text", content: "3. จำนวนครุภัณฑ์ทั้งหมดในระบบ" },
      { type: "text", content: "4. ผู้ใช้สามารถฟิลเตอร์เลือกดูภาพรวมหรือสภาพการครุภัณฑ์" },
      { type: "image", src: home2Image, alt: "ภาพตัวอย่างหน้าหลักเพิ่มเติม" },
    ],
  },
  {
    title: "3. ออกจากระบบ",
    image: logoutImage,
    steps: [
      { type: "text", content: "1. คลิกที่โปรไฟล์มุมขวาบน" },
      { type: "text", content: "2. คลิก 'ออกจากระบบ'" },
    ],
  },
];

function GuideBookPageManager() {
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
            {section.steps.map((step, i) => {
              if (step.type === "text") {
                return <li key={i}>{step.content}</li>;
              } else if (step.type === "image") {
                return (
                  <div className="guidebook-image-wrapper" key={i}>
                    <img src={step.src} alt={step.alt} />
                  </div>
                );
              }
              return null;
            })}
          </ol>
        </div>
      ))}
    </div>
  );
}

export default GuideBookPageManager;
