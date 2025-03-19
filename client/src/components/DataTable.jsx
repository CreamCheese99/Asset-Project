
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
  const [mainAssetData, setMainAssetData] = useState([]);
  const [subAssetData, setSubAssetData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mainResponse = await axios.get("http://localhost:5000/mainasset");
        console.log("Main Asset Data:", mainResponse.data);
        setMainAssetData(mainResponse.data);
  
        const subResponse = await axios.get("http://localhost:5000/subasset");
        console.log("Sub Asset Data:", subResponse.data);
        setSubAssetData(subResponse.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleDelete = (id) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) {
      axios
        .delete(`http://localhost:5000/api/mainasset/${id}`)
        .then(() => {
          setMainAssetData((prevData) => prevData.filter((item) => item.main_asset_id !== id));
          setSubAssetData((prevData) => prevData.filter((item) => item.main_asset_id !== id));
        })
        .catch((error) => console.error("Error deleting asset:", error));
    }
  };

  // 🔹 รวมข้อมูล mainasset + subasset (เชื่อมโยงด้วย main_asset_id)
  const mergedData = mainAssetData.map((main) => {
    const relatedSubassets = subAssetData.filter((sub) => sub.main_asset_id === main.main_asset_id);
    
    return {
      ...main,
      department: relatedSubassets.map((sub) => sub.department).join(", "), // รวมภาควิชา
      value: relatedSubassets.reduce((total, sub) => total + (sub.value || 0), 0), // รวมจำนวน
      unit: relatedSubassets.length > 0 ? relatedSubassets[0].unit : "-", // เอาค่า unit จาก subasset ตัวแรก
    };
  });

  return (
    <div className="bg-white mt-4 p-4 rounded-md shadow-md overflow-x-auto">
      <table className="table-auto w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border px-4 py-2">รหัสทรัพย์สิน</th>
            <th className="border px-4 py-2 hidden lg:table-cell">ชื่อทรัพย์สิน</th>
            <th className="border px-4 py-2">ภาควิชา</th>
            <th className="border px-4 py-2">จำนวน</th>
            {/* <th className="border px-4 py-2">หน่วยนับ</th> */}
            <th className="border px-4 py-2">สภาพการครุภัณฑ์</th>
            <th className="border px-4 py-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {mergedData.map((item) => (
            <tr key={item.main_asset_id} className="text-center">
              <td className="border px-4 py-2">{item.main_asset_id}</td>
              <td className="border px-4 py-2 hidden lg:table-cell">{item.main_asset_name}</td>
              <td className="border px-4 py-2">{item.department_name || "-"}</td>
              <td className="border px-4 py-2">{item.subamount || 0}</td>
              {/* <td className="border px-4 py-2">{item.unit || "-"}</td> */}
              <td className="border px-4 py-2">{item.status}</td>
              <td className="border px-4 py-2 flex justify-center space-x-2">
              <Link 
                  to={`/show-info/${item.main_asset_id}`} 
                  className="text-blue-500 hover:text-blue-700 bg-gray-200 rounded-lg px-3 py-1"
                >
                  ดู
                </Link>
                <Link to="/add-asset" className="text-yellow-500 hover:text-yellow-700 bg-gray-200 rounded-lg px-3 py-1">แก้ไข</Link>
                <button className="text-red-500 hover:text-red-700 bg-gray-200 rounded-lg px-3 py-1" onClick={() => handleDelete(item.main_asset_id)}>ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
