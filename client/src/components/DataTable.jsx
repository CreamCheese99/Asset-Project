


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
//                   className="text-red-500 hover:text-red-700 bg-gray-200 rounded-lg p-2"
//                   onClick={() => handleDelete(item.main_asset_id)}
//                 >
//                   <FaTrash />
//                 </button>

//                 <button
//                   className="text-green-500 hover:text-green-700 bg-gray-200 rounded-lg p-2"
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

//**********************************************.ใช้ได้ *********************************************** */
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaEye, FaEdit, FaTrash, FaFilePdf, FaSortUp, FaSortDown } from "react-icons/fa";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const DataTable = ({ data, filteredData, handleDelete }) => {
//   const [sortOrder, setSortOrder] = useState("asc"); // เพิ่ม state สำหรับการจัดเรียง

//   // ถ้ายังไม่มีการฟิลเตอร์ ให้ใช้ข้อมูลทั้งหมด
//   const displayData = (filteredData && filteredData.length > 0) ? filteredData : data;

//   // ฟังก์ชันจัดเรียงตาม fiscal_year
//   const handleSort = () => {
//     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//   };

//   // จัดเรียงข้อมูลตาม fiscal_year
//   const sortedData = [...displayData].sort((a, b) => {
//     if (sortOrder === "asc") {
//       return a.fiscal_year - b.fiscal_year;
//     } else {
//       return b.fiscal_year - a.fiscal_year;
//     }
//   });

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
//             <th
//                className="border px-4 py-2 cursor-pointer flex items-center justify-center"
//                onClick={handleSort}
//              >
//                ปีงบประมาณ
//                {sortOrder === "asc" ? (
//                  <FaSortUp className="ml-2" />
//                ) : sortOrder === "desc" ? (
//                  <FaSortDown className="ml-2" />
//                ) : (
//                  <FaSortUp className="ml-2 text-gray-400" />
//                )}
//              </th>
//             <th className="border px-4 py-2">สภาพการครุภัณฑ์</th>
//             <th className="border px-4 py-2">จัดการ</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedData.map((item) => (
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
//                   className="text-red-500 hover:text-red-700 bg-gray-200 rounded-lg p-2"
//                   onClick={() => handleDelete(item.main_asset_id)}
//                 >
//                   <FaTrash />
//                 </button>

//                 <button
//                   className="text-green-500 hover:text-green-700 bg-gray-200 rounded-lg p-2"
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


//************************************* ตาม department ************************************** */
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaEye, FaEdit, FaTrash, FaFilePdf, FaSortUp, FaSortDown } from "react-icons/fa";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import axios from "axios"; // ใช้ axios เพื่อดึงข้อมูลจาก API


// const DataTable = ({ data, filteredData, handleDelete }) => {
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [departmentData, setDepartmentData] = useState([]);
//   const [departmentName, setDepartmentName] = useState(""); // กำหนด state สำหรับ department_name
//   const [roleId, setRoleId] = useState(null);

//   useEffect(() => {
//     const userDeptId = localStorage.getItem("departmentId")?.trim(); // Get departmentId from localStorage
//     const token = localStorage.getItem("token"); // Token for authentication
//     const userRoleId = localStorage.getItem("roleId"); // Get roleId from localStorage
//     setRoleId(userRoleId); // Set roleId state
  
//     if (userDeptId && userRoleId !== "3") {
//       // Fetch department data from API using departmentId if roleId is not 3
//       axios
//         .get(`http://localhost:5000/api/department`, { headers: { Authorization: `Bearer ${token}` } })
//         .then((response) => {
//           if (Array.isArray(response.data) && response.data.length > 0) {
//             const department = response.data.find(dept => dept.department_id.toString() === userDeptId);
            
//             if (department) {
//               setDepartmentName(department.department_name); // Set department name if found
//             }
//           }
//         })
//         .catch((error) => {
//           console.error("ไม่สามารถดึงข้อมูลภาควิชาได้:", error);
//         });
//     }
//   }, []); // Runs only once when the component is mounted
  
//   useEffect(() => {
//     let displayData = (filteredData && filteredData.length > 0) ? filteredData : data;
  
//     if (roleId !== "3" && departmentName) {
//       // Filter data based on department_name if roleId is not 3
//       displayData = displayData.filter(item => item.department_name === departmentName);
//     }
  
//     setDepartmentData(displayData); // Set filtered data to state
//   }, [data, filteredData, departmentName, roleId]); // Re-run this effect when dependencies change
  
//   // การจัดเรียงข้อมูลโดยใช้ fiscal_year
//   const sortedData = [...departmentData].sort((a, b) => {
//     return sortOrder === "asc"
//       ? a.fiscal_year - b.fiscal_year
//       : b.fiscal_year - a.fiscal_year;
//   });

//   const exportPDF = (mainAssetId) => {
//     const doc = new jsPDF();
//     const subAssets = departmentData.filter(item => item.main_asset_id === mainAssetId);

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
//       head: [["รหัสทรัพย์สิน", "ชื่อทรัพย์สิน", "ภาควิชา", "ประเภทสินทรัพย์", "จำนวน", "ประเภทเงิน", "ปีงบประมาณ", "สภาพการครุภัณฑ์"]],
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
//             <th className="border px-4 py-2 cursor-pointer flex items-center justify-center" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
//               ปีงบประมาณ
//               {sortOrder === "asc" ? <FaSortUp className="ml-2" /> : <FaSortDown className="ml-2" />}
//             </th>
//             <th className="border px-4 py-2">สภาพการครุภัณฑ์</th>
//             <th className="border px-4 py-2">จัดการ</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedData.length === 0 ? (
//             <tr>
//               <td colSpan="9" className="text-center py-4 text-gray-500">
//                 ไม่พบข้อมูลที่เกี่ยวข้องกับภาควิชาของคุณ
//               </td>
//             </tr>
//           ) : (
//             sortedData.map((item) => (
//               <tr key={item.main_asset_id} className="text-center">
//                 <td className="border px-4 py-2">{item.main_asset_id}</td>
//                 <td className="border px-4 py-2 hidden lg:table-cell">{item.main_asset_name}</td>
//                 <td className="border px-4 py-2">{item.department_name || "-"}</td>
//                 <td className="border px-4 py-2">{item.asset_type || "-"}</td>
//                 <td className="border px-4 py-2">{item.subamount || 0}</td>
//                 <td className="border px-4 py-2">{item.budget_type || "-"}</td>
//                 <td className="border px-4 py-2">{item.fiscal_year || "-"}</td>
//                 <td className="border px-4 py-2">{item.usage}</td>
//                 <td className="border px-4 py-2 flex justify-center space-x-2">
//                   <Link to={`/show-info/${encodeURIComponent(item.main_asset_id)}`} className="text-blue-500 hover:text-blue-700 bg-gray-100 rounded-lg p-2">
//                     <FaEye />
//                   </Link>
//                   <Link to={`/edit-info/${encodeURIComponent(item.main_asset_id)}`} className="text-yellow-500 hover:text-yellow-700 bg-gray-100 rounded-lg p-2">
//                     <FaEdit />
//                   </Link>
//                   <button className="text-red-500 hover:text-red-700 bg-gray-200 rounded-lg p-2" onClick={() => handleDelete(item.main_asset_id)}>
//                     <FaTrash />
//                   </button>
//                   <button className="text-green-500 hover:text-green-700 bg-gray-200 rounded-lg p-2" onClick={() => exportPDF(item.main_asset_id)}>
//                     <FaFilePdf />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DataTable;


//***************************************************************************************** */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaFilePdf, FaSortUp, FaSortDown } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios"; // ใช้ axios เพื่อดึงข้อมูลจาก API

const DataTable = ({ data, filteredData, handleDelete }) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [departmentData, setDepartmentData] = useState([]);
  const [departmentName, setDepartmentName] = useState(""); // กำหนด state สำหรับ department_name
  const [roleId, setRoleId] = useState(null);
  const [userName, setUserName] = useState(""); // กำหนด state สำหรับ user_name (ใช้ตรวจสอบในกรณี roleId = 5)

  useEffect(() => {
    const userDeptId = localStorage.getItem("departmentId")?.trim(); // Get departmentId from localStorage
    const token = localStorage.getItem("token"); // Token for authentication
    const userRoleId = localStorage.getItem("roleId"); // Get roleId from localStorage
    const userUserName = localStorage.getItem("userName"); // Get userName from localStorage
    setRoleId(userRoleId); // Set roleId state
    setUserName(userUserName); // Set userName state
  

    if (userDeptId && userRoleId !== "3") {
      // Fetch department data from API using departmentId if roleId is not 3
      axios
        .get(`http://localhost:5000/api/department`, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          if (Array.isArray(response.data) && response.data.length > 0) {
            const department = response.data.find(dept => dept.department_id.toString() === userDeptId);
            
            if (department) {
              setDepartmentName(department.department_name); // Set department name if found
            }
          }
        })
        .catch((error) => {
          console.error("ไม่สามารถดึงข้อมูลภาควิชาได้:", error);
        });
    }
  }, []); // Runs only once when the component is mounted

  

  useEffect(() => {
    console.log("roleId:", roleId);
    console.log("userName:", userName);
    let displayData = (filteredData && filteredData.length > 0) ? filteredData : data;
  


    // ถ้า roleId เป็น 5 ให้กรองข้อมูลตาม responsible_person
    if (roleId === "5") {
      console.log("Filtering data for role 5...");
      displayData = displayData.filter(item => {
        if (item.responsible_person) {
          console.log("Checking responsible_person:", item.responsible_person, "against userName:", userName);
          return item.responsible_person.trim() === userName.trim(); // ตรวจสอบการกรอง
        }
        console.log(item.responsible_person);
        return false; // ถ้า responsible_person เป็น undefined หรือ null
      });
    } else if (roleId !== "3" && departmentName) {
      // Filter data based on department_name if roleId is not 3
      displayData = displayData.filter(item => item.department_name === departmentName);
    }
  
    setDepartmentData(displayData); // Set filtered data to state
  }, [data, filteredData, departmentName, roleId, userName]); // Re-run this effect when dependencies change
  


  // การจัดเรียงข้อมูลโดยใช้ fiscal_year
  const sortedData = [...departmentData].sort((a, b) => {
    return sortOrder === "asc"
      ? a.fiscal_year - b.fiscal_year
      : b.fiscal_year - a.fiscal_year;
  });

  const exportPDF = (mainAssetId) => {
    const doc = new jsPDF();
    const subAssets = departmentData.filter(item => item.main_asset_id === mainAssetId);

    const tableData = subAssets.map(item => [
      item.main_asset_id,
      item.main_asset_name,
      item.department_name || "-",
      item.asset_type || "-",
      item.responsible_person|| "-",
      item.subamount || 0,
      item.budget_type || "-",
      item.fiscal_year || "-",
      item.usage || "-",
    ]);

    doc.autoTable({
      head: [["รหัสทรัพย์สิน", "ชื่อทรัพย์สิน", "ภาควิชา", "ประเภทสินทรัพย์", "ผู้รับผิดชอบ", "จำนวน", "ประเภทเงิน", "ปีงบประมาณ", "สภาพการครุภัณฑ์"]],
      body: tableData,
    });

    doc.save(`subasset_${mainAssetId}.pdf`);
  };

  return (
    <div className="bg-white mt-4 p-4 rounded-md shadow-md overflow-x-auto">
      <h1 className="text-lg font-bold mb-4">รายการพัสดุ</h1>
      <table className="table-auto w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border px-4 py-2">รหัสทรัพย์สิน</th>
            <th className="border px-4 py-2 hidden lg:table-cell">ชื่อทรัพย์สิน</th>
            <th className="border px-4 py-2">รหัสภาควิชา</th>
            <th className="border px-4 py-2">ภาควิชา</th>
            <th className="border px-4 py-2">ประเภทสินทรัพย์</th>
            <th className="border px-4 py-2">ผู้รับผิดชอบ</th>
            <th className="border px-4 py-2">จำนวน</th>
            <th className="border px-4 py-2">ประเภทเงิน</th>
            <th className="border px-4 py-2 cursor-pointer flex items-center justify-center" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
              ปีงบประมาณ
              {sortOrder === "asc" ? <FaSortUp className="ml-2" /> : <FaSortDown className="ml-2" />}
            </th>
            <th className="border px-4 py-2">สภาพการครุภัณฑ์</th>
            <th className="border px-4 py-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center py-4 text-gray-500">
                ไม่พบข้อมูลที่เกี่ยวข้องกับภาควิชาของคุณ
              </td>
            </tr>
          ) : (
            sortedData.map((item) => (
              <tr key={item.main_asset_id} className="text-center">
                <td className="border px-4 py-2">{item.main_asset_id}</td>
                <td className="border px-4 py-2 hidden lg:table-cell">{item.main_asset_name}</td>
                <td className="border px-4 py-2">{item.department_id || "-"}</td>
                <td className="border px-4 py-2">{item.department_name || "-"}</td>
                <td className="border px-4 py-2">{item.asset_type || "-"}</td>
                <td className="border px-4 py-2">{item.responsible_person || "-"}</td>
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
                  <button className="text-red-500 hover:text-red-700 bg-gray-200 rounded-lg p-2" onClick={() => handleDelete(item.main_asset_id)}>
                    <FaTrash />
                  </button>
                  <button className="text-green-500 hover:text-green-700 bg-gray-200 rounded-lg p-2" onClick={() => exportPDF(item.main_asset_id)}>
                    <FaFilePdf />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
