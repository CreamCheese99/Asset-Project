
// import React from "react";
// import { Link } from "react-router-dom";
// const DataTable = () => {
//   const data = [
//     {
//       id: 1,
//       itemCode: "สมอ.12060100-001-0013/61",
//       assetCode: "1000000000001",
//       category: "โต๊ะ",
//       unit: "ตัว",
//       department: "ครุศาสตร์อุตสาหกรรม",
//       status: "ใช้งานได้",
//       value: 50,
//       type_price:"เงินรายได้"
//     },
//     {
//       id: 2,
//       itemCode: "สมอ.12060100-001-0014/61",
//       assetCode: "1000000000002",
//       category: "เก้าอี้",
//       unit: "ตัว",
//       department: "ครุศาสตร์อุตสาหกรรม",
//       status: "ใช้งานได้",
//       value: 50,
//       type_price:"เงินรายได้"
//     },
//     {
//       id: 3,
//       itemCode: "สมอ.12060100-001-0015/61",
//       assetCode: "1000000000003",
//       category: "คอมพิวเตอร์",
//       unit: "ตัว",
//       department: "ครุศาสตร์อุตสาหกรรม",
//       status: "ใช้งานได้",
//       value: 100,
//       type_price:"เงินรายได้"
//     },
//     // เพิ่มข้อมูลอื่นๆ ได้ที่นี่
//   ];
  
//   const handleDelete = (id) => {
//     if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) {
//       setData(data.filter(item => item.id !== id));
//       console.log("ลบรายการที่มี ID:", id);
//     }
//   };
  
//   return (
//     <div className="bg-white mt-4 p-4 rounded-md shadow-md overflow-x-auto">
//     <table className="table-auto w-full border-collapse text-sm">
//       <thead>
//         <tr className="bg-gray-200 text-gray-700">
//           <th className="border px-4 py-2">รหัสทรัพย์สิน</th>
//           {/* <th className="border px-4 py-2 hidden md:table-cell">รหัสทรัพย์สิน</th> */}
//           <th className="border px-4 py-2 hidden lg:table-cell">ประเภทพัสดุ</th>
//           <th className="border px-4 py-2 hidden lg:table-cell">ประเภทเงิน</th>
//           <th className="border px-4 py-2">ภาควิชา</th>
//           <th className="border px-4 py-2 hidden sm:table-cell">จำนวน</th> 
//           <th className="border px-4 py-2 hidden lg:table-cell">หน่วยนับ</th>    
//           <th className="border px-4 py-2">สภาพการครุภัณฑ์</th>
//           <th className="border px-4 py-2">จัดการ</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item) => (
//           <tr key={item.id} className="text-center">
//             <td className="border px-4 py-2">{item.itemCode}</td>
//             {/* <td className="border px-4 py-2 hidden md:table-cell">{item.assetCode}</td> */}
//             <td className="border px-4 py-2 hidden lg:table-cell">{item.category}</td>
//             <td className="border px-4 py-2 hidden lg:table-cell">{item.type_price}</td>
//             <td className="border px-4 py-2">{item.department}</td>
//             <td className="border px-4 py-2 hidden sm:table-cell">
//               {item.value.toFixed()}
//             </td>
//             <td className="border px-4 py-2 hidden lg:table-cell">{item.unit}</td>
//             <td className="border px-4 py-2">{item.status}</td>
//             <td className="border px-4 py-2 flex justify-center space-x-2">
//               <button className="text-blue-500 hover:text-blue-700 bg-gray-200 rounded-lg px-3 py-1">
//                 <Link to= "/show-info" >ดู</Link>
//               </button>
//               <button className="text-yellow-500 hover:text-yellow-700 bg-gray-200 rounded-lg px-3 py-1">
//                 <Link to="/add-asset">แก้ไข</Link>
//               </button>
//               <button className="text-red-500 hover:text-red-700 bg-gray-200 rounded-lg px-3 py-1" onClick={() => handleDelete(item.id)}>
//                 ลบ
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
  
//   );
// };

// export default DataTable;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // ฟังก์ชันดึงข้อมูลจาก API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/mainasset"); // URL ของ API
        setData(response.data);  // เก็บข้อมูลจาก API ลงใน state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();  // เรียกใช้ฟังก์ชัน fetchData
  }, []);  // ทำงานแค่ครั้งเดียวเมื่อคอมโพเนนต์เริ่มต้น (componentDidMount)

  const handleDelete = (id) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) {
      // ส่งคำขอลบข้อมูลไปยัง API ที่ server
      axios
        .delete(`http://localhost:5000/api/mainasset/${id}`)
        .then((response) => {
          console.log(response.data);
          setData((prevData) => prevData.filter((item) => item.main_asset_ID !== id)); // ลบข้อมูลจาก state
        })
        .catch((error) => console.error("Error deleting asset:", error));
    }
  };

  return (
    <div className="bg-white mt-4 p-4 rounded-md shadow-md overflow-x-auto">
      <table className="table-auto w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border px-4 py-2">รหัสทรัพย์สิน</th>
            <th className="border px-4 py-2 hidden lg:table-cell">ประเภทพัสดุ</th>
            <th className="border px-4 py-2 hidden lg:table-cell">ประเภทเงิน</th>
            <th className="border px-4 py-2">ภาควิชา</th>
            <th className="border px-4 py-2 hidden sm:table-cell">จำนวน</th>
            <th className="border px-4 py-2 hidden lg:table-cell">หน่วยนับ</th>
            <th className="border px-4 py-2">สภาพการครุภัณฑ์</th>
            <th className="border px-4 py-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.main_asset_ID} className="text-center">
              <td className="border px-4 py-2">{item.main_asset_ID}</td>
              <td className="border px-4 py-2 hidden lg:table-cell">{item.main_asset_name}</td>
              <td className="border px-4 py-2 hidden lg:table-cell">{item.budget_type}</td>
              <td className="border px-4 py-2">{item.department}</td>
              <td className="border px-4 py-2 hidden sm:table-cell">{item.value}</td>
              <td className="border px-4 py-2 hidden lg:table-cell">{item.unit}</td>
              <td className="border px-4 py-2">{item.status}</td>
              <td className="border px-4 py-2 flex justify-center space-x-2">
                <Link to="/show-info" className="text-blue-500 hover:text-blue-700 bg-gray-200 rounded-lg px-3 py-1">ดู</Link>
                <Link to="/add-asset" className="text-yellow-500 hover:text-yellow-700 bg-gray-200 rounded-lg px-3 py-1">แก้ไข</Link>
                <button className="text-red-500 hover:text-red-700 bg-gray-200 rounded-lg px-3 py-1" onClick={() => handleDelete(item.main_asset_ID)}>ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
