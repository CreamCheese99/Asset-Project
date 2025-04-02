


// import React from "react";
// import { Link } from "react-router-dom";
// import { FaEye, FaEdit, FaTrash, FaFilePdf } from "react-icons/fa";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const DataTable = ({ data, filteredData, handleDelete }) => {
//   // ถ้ายังไม่มีการฟิลเตอร์ ให้ใช้ข้อมูลทั้งหมด
//   const displayData = filteredData.length > 0 ? filteredData : data;

//   // ฟังก์ชันสำหรับ Export ข้อมูลเป็น PDF
//   const exportPDF = (mainAssetId) => {
//     const doc = new jsPDF();
//     const subAssets = data.filter(item => item.main_asset_id === mainAssetId);  // กรองข้อมูล Subasset โดยใช้ main_asset_id

//     const tableData = subAssets.map(item => [
//       item.main_asset_id,
//       item.main_asset_name,
//       item.department_name || "-",
//       item.asset_type || "-",
//       item.subamount || 0,
//       item.budget_type || "-",
//       item.fiscal_year || "-",
//       item.usage || "-",
//     ]);

//     doc.autoTable({
//       head: [
//         ["รหัสทรัพย์สิน", "ชื่อทรัพย์สิน", "ภาควิชา", "ประเภทสินทรัพย์", "จำนวน", "ประเภทเงิน", "ปีงบประมาณ", "สภาพการครุภัณฑ์"],
//       ],
//       body: tableData,
//     });

//     doc.save(`subasset_${mainAssetId}.pdf`);
//   };

//   return (
//     <div className="bg-white mt-4 p-4 rounded-md shadow-md overflow-x-auto">
//       <h1 className="text-lg font-bold mb-4">รายการพัสดุ</h1>
//       <table className="table-auto w-full border-collapse text-sm">
//         <thead>
//           <tr className="bg-gray-200 text-gray-700">
//             <th className="border px-4 py-2">รหัสทรัพย์สิน</th>
//             <th className="border px-4 py-2 hidden lg:table-cell">ชื่อทรัพย์สิน</th>
//             <th className="border px-4 py-2">ภาควิชา</th>
//             <th className="border px-4 py-2">ประเภทสินทรัพย์</th>
//             <th className="border px-4 py-2">จำนวน</th>
//             <th className="border px-4 py-2">ประเภทเงิน</th>
//             <th className="border px-4 py-2">ปีงบประมาณ</th>
//             <th className="border px-4 py-2">สภาพการครุภัณฑ์</th>
//             <th className="border px-4 py-2">จัดการ</th>
//           </tr>
//         </thead>
//         <tbody>
//           {displayData.map((item) => (
//             <tr key={item.main_asset_id} className="text-center">
//               <td className="border px-4 py-2">{item.main_asset_id}</td>
//               <td className="border px-4 py-2 hidden lg:table-cell">{item.main_asset_name}</td>
//               <td className="border px-4 py-2">{item.department_name || "-"}</td>
//               <td className="border px-4 py-2">{item.asset_type || "-"}</td>
//               <td className="border px-4 py-2">{item.subamount || 0}</td>
//               <td className="border px-4 py-2">{item.budget_type || "-"}</td>
//               <td className="border px-4 py-2">{item.fiscal_year || "-"}</td>
//               <td className="border px-4 py-2">{item.usage}</td>
//               <td className="border px-4 py-2 flex justify-center space-x-2">
                              
//                 <Link
//                   to={`/show-info/${encodeURIComponent(item.main_asset_id)}`}
//                   className="text-blue-500 hover:text-blue-700 bg-gray-100 rounded-lg p-2"
//                 >
//                   <FaEye />
//                 </Link>

//                 <Link
//                   to={`/edit-info/${encodeURIComponent(item.main_asset_id)}`}
//                   className="text-yellow-500 hover:text-yellow-700 bg-gray-100 rounded-lg p-2"
//                 >
//                   <FaEdit />
//                 </Link>

//                 <button
//                   className="text-red-500 hover:text-red-700 bg-gray-100 rounded-lg p-2"
//                   onClick={() => handleDelete(item.main_asset_id)}
//                 >
//                   <FaTrash />
//                 </button>

//                 <button
//                   className="text-green-500 hover:text-green-700 bg-gray-100 rounded-lg p-2"
//                   onClick={() => exportPDF(item.main_asset_id)}
//                 >
//                   <FaFilePdf />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DataTable;



//**************************Sorting ผ่าน Dropdown (เลือกปีที่ต้องการดู) ***********************************************/
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaEye, FaEdit, FaTrash, FaFilePdf } from "react-icons/fa";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const DataTable = ({ data, handleDelete }) => {
//   const [selectedYear, setSelectedYear] = useState("");


//   // ดึงปีงบประมาณที่ไม่ซ้ำกัน แล้วเรียงจากใหม่ไปเก่า
//   const uniqueYears = [...new Set(data.map(item => item.fiscal_year))].sort((a, b) => b - a);

//   // กรองข้อมูลตามปีงบประมาณที่เลือก
//   const displayData = selectedYear ? data.filter(item => item.fiscal_year === selectedYear) : data;

//   // ฟังก์ชันสำหรับ Export ข้อมูลเป็น PDF
//   const exportPDF = (mainAssetId) => {
//     const doc = new jsPDF();
//     const subAssets = data.filter(item => item.main_asset_id === mainAssetId);

//     const tableData = subAssets.map(item => [
//       item.main_asset_id,
//       item.main_asset_name,
//       item.department_name || "-",
//       item.asset_type || "-",
//       item.subamount || 0,
//       item.budget_type || "-",
//       item.fiscal_year || "-",
//       item.usage || "-",
//     ]);

//     doc.autoTable({
//       head: [
//         ["รหัสทรัพย์สิน", "ชื่อทรัพย์สิน", "ภาควิชา", "ประเภทสินทรัพย์", "จำนวน", "ประเภทเงิน", "ปีงบประมาณ", "สภาพการครุภัณฑ์"],
//       ],
//       body: tableData,
//     });

//     doc.save(`subasset_${mainAssetId}.pdf`);
//   };

//   return (
//     <div className="bg-white mt-4 p-4 rounded-md shadow-md overflow-x-auto">
//       <h1 className="text-lg font-bold mb-4">รายการพัสดุ</h1>

//       {/* Dropdown สำหรับเลือกปีงบประมาณ */}
//       <div className="mb-4">
//         <label className="font-semibold mr-2">กรองตามปีงบประมาณ:</label>
//         <select
//           className="border p-2 rounded-md"
//           value={selectedYear}
//           onChange={(e) => setSelectedYear(e.target.value)}
//         >
//           <option value="">ทุกปี</option>
//           {uniqueYears.map((year) => (
//             <option key={year} value={year}>{year}</option>
//           ))}
//         </select>
//       </div>

//       <table className="table-auto w-full border-collapse text-sm">
//         <thead>
//           <tr className="bg-gray-200 text-gray-700">
//             <th className="border px-4 py-2">รหัสทรัพย์สิน</th>
//             <th className="border px-4 py-2 hidden lg:table-cell">ชื่อทรัพย์สิน</th>
//             <th className="border px-4 py-2">ภาควิชา</th>
//             <th className="border px-4 py-2">ประเภทสินทรัพย์</th>
//             <th className="border px-4 py-2">จำนวน</th>
//             <th className="border px-4 py-2">ประเภทเงิน</th>
//             <th className="border px-4 py-2">ปีงบประมาณ</th>
//             <th className="border px-4 py-2">สภาพการครุภัณฑ์</th>
//             <th className="border px-4 py-2">จัดการ</th>
//           </tr>
//         </thead>
//         <tbody>
//           {displayData.map((item) => (
//             <tr key={item.main_asset_id} className="text-center">
//               <td className="border px-4 py-2">{item.main_asset_id}</td>
//               <td className="border px-4 py-2 hidden lg:table-cell">{item.main_asset_name}</td>
//               <td className="border px-4 py-2">{item.department_name || "-"}</td>
//               <td className="border px-4 py-2">{item.asset_type || "-"}</td>
//               <td className="border px-4 py-2">{item.subamount || 0}</td>
//               <td className="border px-4 py-2">{item.budget_type || "-"}</td>
//               <td className="border px-4 py-2">{item.fiscal_year || "-"}</td>
//               <td className="border px-4 py-2">{item.usage}</td>
//               <td className="border px-4 py-2 flex justify-center space-x-2">
//                 <Link to={`/show-info/${encodeURIComponent(item.main_asset_id)}`} className="text-blue-500 hover:text-blue-700 bg-gray-100 rounded-lg p-2">
//                   <FaEye />
//                 </Link>
//                 <Link to={`/edit-info/${encodeURIComponent(item.main_asset_id)}`} className="text-yellow-500 hover:text-yellow-700 bg-gray-100 rounded-lg p-2">
//                   <FaEdit />
//                 </Link>
//                 <button className="text-red-500 hover:text-red-700 bg-gray-100 rounded-lg p-2" onClick={() => handleDelete(item.main_asset_id)}>
//                   <FaTrash />
//                 </button>
//                 <button className="text-green-500 hover:text-green-700 bg-gray-100 rounded-lg p-2" onClick={() => exportPDF(item.main_asset_id)}>
//                   <FaFilePdf />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DataTable;






import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaFilePdf, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
// import ActionButtons from "./ActionButtons";

const DataTable = ({ data, handleDelete }) => {
  const [sortOrder, setSortOrder] = useState(null); // null = ไม่เรียง, "asc" = น้อยไปมาก, "desc" = มากไปน้อย

  // ฟังก์ชันจัดเรียงตาม fiscal_year
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // จัดเรียงข้อมูลเฉพาะ fiscal_year
  const sortedData = sortOrder
    ? [...data].sort((a, b) =>
        sortOrder === "asc"
          ? a.fiscal_year - b.fiscal_year
          : b.fiscal_year - a.fiscal_year
      )
    : data;

  // ฟังก์ชันสำหรับ Export ข้อมูลเป็น PDF
  const exportPDF = (mainAssetId) => {
    const doc = new jsPDF();
    const subAssets = data.filter(item => item.main_asset_id === mainAssetId);

    const tableData = subAssets.map(item => [
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
      head: [
        ["รหัสทรัพย์สิน", "ชื่อทรัพย์สิน", "ภาควิชา", "ประเภทสินทรัพย์", "จำนวน", "ประเภทเงิน", "ปีงบประมาณ", "สภาพการครุภัณฑ์"],
      ],
      body: tableData,
    });

    doc.save(`subasset_${mainAssetId}.pdf`);
  };

  return (
    <div className="bg-white mt-4 p-4 rounded-xl shadow-md overflow-x-auto">
      <h1 className="text-lg font-bold mb-4">รายการพัสดุ</h1>
      {/* <ActionButtons /> */}

      <table className="table-auto w-full border-collapse text-sm  ">
        <thead>
          <tr className="bg-gray-200 text-gray-700 rounded-xl">
            <th className="border px-4 py-2">รหัสทรัพย์สิน</th>
            <th className="border px-4 py-2 hidden lg:table-cell">ชื่อทรัพย์สิน</th>
            <th className="border px-4 py-2">ภาควิชา</th>
            <th className="border px-4 py-2">ประเภทสินทรัพย์</th>
            <th className="border px-4 py-2">จำนวน</th>
            <th className="border px-4 py-2">ประเภทเงิน</th>
            <th
              className="border px-4 py-8 cursor-pointer flex items-center justify-center"
              onClick={handleSort}
            >
              ปีงบประมาณ
              {sortOrder === "asc" ? (
                <FaSortUp className="ml-2" />
              ) : sortOrder === "desc" ? (
                <FaSortDown className="ml-2" />
              ) : (
                <FaSort className="ml-2 text-gray-400" />
              )}
            </th>
            <th className="border px-4 py-2">สภาพการครุภัณฑ์</th>
            <th className="border px-4 py-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.main_asset_id} className="text-center">
              <td className="border px-4 py-2">{item.main_asset_id}</td>
              <td className="border px-4 py-2 hidden lg:table-cell">{item.main_asset_name}</td>
              <td className="border px-4 py-2">{item.department_name || "-"}</td>
              <td className="border px-4 py-2">{item.asset_type || "-"}</td>
              <td className="border px-4 py-2">{item.subamount || 0}</td>
              <td className="border px-4 py-2">{item.budget_type || "-"}</td>
              <td className="border px-4 py-2">{item.fiscal_year || "-"}</td>
              <td className="border px-4 py-2">{item.usage}</td>
              <td className="border px-4 py-2 flex justify-center space-x-2">
                <Link to={`/show-info/${encodeURIComponent(item.main_asset_id)}`} className="text-blue-500 hover:text-blue-700 bg-gray-100 rounded-lg p-2">
                  <FaEye />
                </Link>
                <Link to={`/edit-info/${encodeURIComponent(item.main_asset_id)}`} className="text-yellow-500 hover:text-yellow-700 bg-gray-100 rounded-lg p-2">
                  <FaEdit />
                </Link>
                <button className="text-red-500 hover:text-red-700 bg-gray-100 rounded-lg p-2" onClick={() => handleDelete(item.main_asset_id)}>
                  <FaTrash />
                </button>
                <button className="text-orange-500 hover:text-orange-700 bg-gray-100 rounded-lg p-2" onClick={() => exportPDF(item.main_asset_id)}>
                  <FaFilePdf />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
