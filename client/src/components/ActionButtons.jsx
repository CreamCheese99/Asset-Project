
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const ActionButtons = () => {
//   const navigate = useNavigate();

//   const handleAddClick = () => {
//     navigate("/add-asset"); // ชื่อเส้นทางไปยังหน้า AddAsset
//   };

//   return (
//     <div className="mt-4 flex space-x-4">
//       <button
//         className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
//         onClick={handleAddClick}
//       >
//         เพิ่ม
//       </button>

//       <button className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-600 ">
//         export
//       </button>
//     </div>
//   );
// };

// export default ActionButtons;

import React from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ActionButtons = ({ data }) => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/add-asset"); // ชื่อเส้นทางไปยังหน้า AddAsset
  };

  // ฟังก์ชันสำหรับ Export ข้อมูลทั้งหมดเป็น PDF
  const exportPDF = () => {
    if (!data || data.length === 0) {
      alert("ไม่มีข้อมูลเพื่อ Export");
      return;
    }

    const doc = new jsPDF();

    // แปลงข้อมูลทั้งหมดเป็นตารางใน PDF
    const tableData = data.map(item => [
      item.main_asset_id,
      item.main_asset_name,
      item.department_name || "-",
      item.asset_type || "-",
      item.subamount || 0,
      item.budget_type || "-",
      item.fiscal_year || "-",
      item.usage || "-",
    ]);

    // สร้างตารางใน PDF
    doc.autoTable({
      head: [
        ["รหัสทรัพย์สิน", "ชื่อทรัพย์สิน", "ภาควิชา", "ประเภทสินทรัพย์", "จำนวน", "ประเภทเงิน", "ปีงบประมาณ", "สภาพการครุภัณฑ์"],
      ],
      body: tableData,
    });

    // ดาวน์โหลดไฟล์ PDF
    doc.save("assets_data.pdf");
  };

  return (
    <div className="mt-4 flex space-x-4">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
        onClick={handleAddClick}
      >
        เพิ่ม
      </button>

      <button
        className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-600"
        onClick={exportPDF}
      >
        Export PDF
      </button>
    </div>
  );
};

export default ActionButtons;
