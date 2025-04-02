

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { FaFilePdf, FaPlus } from "react-icons/fa";

// const ActionButtons = ({ data }) => {
//   const navigate = useNavigate();

//   const handleAddClick = () => {
//     navigate("/add-asset"); // ชื่อเส้นทางไปยังหน้า AddAsset
//   };

//   // ฟังก์ชันสำหรับ Export ข้อมูลทั้งหมดเป็น PDF
//   const exportPDF = () => {
//     if (!data || data.length === 0) {
//       alert("ไม่มีข้อมูลเพื่อ Export");
//       return;
//     }

//     const doc = new jsPDF();

//     // แปลงข้อมูลทั้งหมดเป็นตารางใน PDF
//     const tableData = data.map(item => [
//       item.main_asset_id,
//       item.main_asset_name,
//       item.department_name || "-",
//       item.asset_type || "-",
//       item.subamount || 0,
//       item.budget_type || "-",
//       item.fiscal_year || "-",
//       item.usage || "-",
//     ]);

//     // สร้างตารางใน PDF
//     doc.autoTable({
//       head: [
//         ["รหัสทรัพย์สิน", "ชื่อทรัพย์สิน", "ภาควิชา", "ประเภทสินทรัพย์", "จำนวน", "ประเภทเงิน", "ปีงบประมาณ", "สภาพการครุภัณฑ์"],
//       ],
//       body: tableData,
//     });

//     // ดาวน์โหลดไฟล์ PDF
//     doc.save("assets_data.pdf");
//   };

//   return (
          
//       <div className="mt-10 flex justify-end space-x-4">
//         <button
//           className="bg-green-500 text-white p-2 rounded-xl hover:bg-green-400"
//           onClick={handleAddClick}
//         >
//           เพิ่มครุภัณฑ์หลัก
//         </button>

//         <button
//           // className="text-orange-500 hover:text-orange-700  rounded-lg p-2 "
//           className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-400"
//           onClick={exportPDF}
//         >
//           <FaFilePdf size={20} />
//         </button>
//       </div>

//   );
// };

// export default ActionButtons;


import React from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa";

const ActionButtons = ({ data, roleId }) => {
  const navigate = useNavigate();

  if (roleId !== '3') {
    return null; // ❌ ไม่มีสิทธิ์ => ไม่แสดง component นี้
  }

  const handleAddClick = () => {
    navigate("/add-asset");
  };

  const exportPDF = () => {
    if (!data || data.length === 0) {
      alert("ไม่มีข้อมูลเพื่อ Export");
      return;
    }

    const doc = new jsPDF();
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

    doc.autoTable({
      head: [["รหัสทรัพย์สิน", "ชื่อทรัพย์สิน", "ภาควิชา", "ประเภทสินทรัพย์", "จำนวน", "ประเภทเงิน", "ปีงบประมาณ", "สภาพการครุภัณฑ์"]],
      body: tableData,
    });

    doc.save("assets_data.pdf");
  };

  return (
    <div className="mt-10 flex justify-end space-x-4">
      <button className="bg-green-500 text-white p-2 rounded-xl hover:bg-green-400" onClick={handleAddClick}>
        เพิ่มครุภัณฑ์หลัก
      </button>
      <button className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-400" onClick={exportPDF}>
        <FaFilePdf size={20} />
      </button>
    </div>
  );
};

export default ActionButtons;
