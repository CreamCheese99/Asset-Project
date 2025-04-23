import React from "react";
import "../css/GuideBook.css";

import loginImage from "../image/guidebookImage/login.png";
import homeImage from "../image/guidebookImage/departmentStaff/home.png";
import manageassetImage from "../image/guidebookImage/departmentStaff/manageasset.png";
// import mainassetImage from "../image/guidebookImage/departmentStaff/addmainasset.png";
import mainasset2Image from "../image/guidebookImage/departmentStaff/addmainasset2.png";
// import subassetImage from "../image/guidebookImage/departmentStaff/addsubasset.png";
import subasset2Image from "../image/guidebookImage/departmentStaff/addsubasset2.png";
import pdf from "../image/guidebookImage/departmentStaff/pdf.png"
import infomationImage from "../image/guidebookImage/departmentStaff/infomation.png";
import permissionImage from "../image/guidebookImage/departmentStaff/permission.png";
import adduserImage from "../image/guidebookImage/departmentStaff/adduser.png";
import logoutImage from "../image/guidebookImage/departmentStaff/logout.png";

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
      { type: "text", content: "2. ผู้ใช้สามารถฟิลเตอร์ภาควิชา แหล่งเงินหรือปีที่จะให้แสดงข้อมูลได้และมีปุ่ม'รีเซ็ท'เพื่อล้างค่าที่ฟิลเตอร์ไว้" },
      { type: "text", content: "3. จำนวนครุภัณฑ์ทั้งหมดในระบบ" },
      { type: "text", content: "4. ผู้ใช้สามารถฟิลเตอร์เลือกดูภาพรวมหรือสภาพการครุภัณฑ์" },
    ],
  },
  {
    title: "3. การใช้งานหน้าจัดการพัสดุ",
    image: manageassetImage,
    steps: [
      { type: "text", content: "1. เลือกเมนู 'หน้าจัดการพัสดุ' จากแถบเมนูด้านบน" },
      { type: "text", content: "2. ผู้ใช้สามารถฟิลเตอร์หรือใส่รหัสทรัพย์สินเพื่อดูรายการพัสดุได้" },
      { type: "text", content: "3. เพิ่มรายการพัสดุหลักเมื่อกรอกข้อมูลเรียบร้อยให้ทำการกดปุ่มบันทึก" },
      { type: "image", src: mainasset2Image, alt: "ปุ่มเพิ่มพัสดุหลัก" },
      { type: "text", content: "4. เพิ่มรายการพัสดุย่อยเมื่อกรอกข้อมูลเรียบร้อยให้ทำการกดปุ่มบันทึก" },
      { type: "image", src: subasset2Image, alt: "เพิ่มพัสดุย่อย" },
      { type: "text", content: "5. ปุ่มนำออกข้อมูลพัสดุเป็นไฟล์ pdf" },
      { type: "image", src: pdf, alt: "นำออกไฟล์" },

    ],
  },
  {
        title:"4. การใช้งานหน้าจัดการสิทธิ์",
        image: permissionImage,
        steps: [
          { type: "text", content: "1. เลือกเมนู 'จัดการสิทธิ์' จากแถบเมนูด้านบน" },
          { type: "text", content: "2. ผู้ดูแลระบบสามารถเพิ่มหรือผู้ใช้และกำหนดหรือแก้ไขบทบาทผู้ใช้" },
          { type: "image", src: adduserImage, alt: "เพิ่มผู้ใช้" },
          { type: "text", content: "3. เมื่อกรอกข้อมูลเรียบร้อยกดปุ่มเพิ่มผู้ใช้" },
        ],
      },
  {
    title: "5. การใช้งานหน้าข้อมูลทั่วไป",
    image: infomationImage,
    steps: [
      { type: "text", content: "1. เลือกเมนู 'ข้อมูลทั่วไป' จากแถบเมนูด้านบน" },
      { type: "text", content: "2. สามารถเพิ่ม ลบ แก้ไขข้อมูลภาควิชาและประเภทสินทรัพย์ได้" },
    ],
  },
  {
    title: "6. ออกจากระบบ",
    image: logoutImage,
    steps: [
      { type: "text", content: "1. คลิกที่โปรไฟล์มุมขวาบน" },
      { type: "text", content: "2. คลิก 'ออกจากระบบ'" },
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

export default GuideBookPage;
