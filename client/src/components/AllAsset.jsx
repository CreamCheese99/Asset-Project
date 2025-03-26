// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const AllAsset = () => {
//   const [searchTerm, setSearchTerm] = useState("");  // สถานะเก็บคำค้นหา
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
//       image: "https://via.placeholder.com/400x300",
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
//       image: "https://via.placeholder.com/400x300",
//     },
//     {
//       id: 3,
//       itemCode: "สมอ.12060100-001-0015/61",
//       assetCode: "1000000000003",
//       category: "เครื่องปรับอากาศ",
//       unit: "ตัว",
//       department: "ครุศาสตร์วิศวกรรม",
//       status: "เสียหาย",
//       value: 3,
//       image: "https://via.placeholder.com/400x300",
//     },
//     {
//       id: 4,
//       itemCode: "สมอ.12060100-001-0016/61",
//       assetCode: "1000000000004",
//       category: "เครื่องถ่ายเอกสาร",
//       unit: "ตัว",
//       department: "ครุศาสตร์สถาปัตยกรรมเเละการออกแบบ",
//       status: "ใช้งานได้",
//       value: 10,
//       image: "https://via.placeholder.com/400x300",
//     },
//     {
//       id: 5,
//       itemCode: "สมอ.12060100-001-0017/61",
//       assetCode: "1000000000005",
//       category: "โปรเจคเตอร์",
//       unit: "ตัว",
//       department: "ครุศาสตร์การเกษตร",
//       status: "ใช้งานได้",
//       value: 5,
//       image: "https://via.placeholder.com/400x300",
//     },
//     {
//       id: 6,
//       itemCode: "สมอ.12060100-001-0018/61",
//       assetCode: "1000000000006",
//       category: "คอมพิวเตอร์",
//       unit: "เครื่อง",
//       department: "ครุศาสตร์อุตสาหกรรม",
//       status: "ใช้งานได้",
//       value: 8,
//       image: "https://via.placeholder.com/400x300",
//     },
//   ];

//   // ฟังก์ชันในการค้นหา
//   const filteredData = data.filter(
//     (item) =>
//       item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||  // ค้นหาจากหมวดหมู่
//       item.itemCode.toLowerCase().includes(searchTerm.toLowerCase())      // ค้นหาจากรหัสทรัพย์สิน
//   );

//   return (
//     <div className="bg-gray-50 py-6 px-4 min-h-screen mt-4 p-4 rounded-xl ">
//       <div className="container mx-auto">
//         {/* ฟอร์มค้นหา */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="ค้นหาจากหมวดหมู่หรือรหัสทรัพย์สิน"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}  // อัปเดตสถานะเมื่อพิมพ์
//             className="w-full px-4 py-2 border-2 border-gray-300 rounded-md"
//           />
//         </div>

//         {/* รายการครุภัณฑ์ */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredData.length > 0 ? (
//             filteredData.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 overflow-hidden"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.category}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h2 className="text-lg font-semibold text-gray-700">
//                     {item.category} <span className="text-sm text-gray-500">(ตัวอย่าง)</span>
//                   </h2>
//                   <p className="text-sm text-gray-500 mb-2">{item.itemCode}</p>
//                   <div className="text-sm text-gray-600">
//                     <p>ภาควิชา: {item.department}</p>
//                     <p>
//                       จำนวน: {item.value} {item.unit}
//                     </p>
//                     <p>สถานะ: {item.status}</p>
//                   </div>
//                   <div className="mt-4">
//                     <Link 
//                       to="/show-info"
//                       className="block w-full text-center px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-md hover:bg-teal-600"
//                     >
//                       ดูรายละเอียด
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500">ไม่พบข้อมูลที่ค้นหา</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllAsset;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllAsset = () => {
  const [searchTerm, setSearchTerm] = useState("");  // State for search input
  const [assets, setAssets] = useState([]);  // State for assets data
  const [loading, setLoading] = useState(true);  // State for loading status
  const [error, setError] = useState(null);  // State for error handling

  // Fetch assets data from the API
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mainasset');
        
        if (!response.ok) {
          throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลจากเซิร์ฟเวอร์');
        }

        const data = await response.json();
        
        // ตรวจสอบว่า data เป็นอาเรย์ก่อน
        if (Array.isArray(data)) {
          setAssets(data);  // Set fetched data to state
        } else {
          throw new Error('ข้อมูลที่ได้รับไม่ถูกต้อง');
        }
      } catch (error) {
        console.error("Error fetching assets:", error);
        setError(error.message);  // Set error message
      } finally {
        setLoading(false);  // Set loading to false once data is fetched
      }
    };

    fetchAssets();
  }, []);

  // Filter assets based on search term
  const filteredData = assets.filter(
    (item) =>
      item.main_asset_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sub_asset_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 py-6 px-4 min-h-screen mt-4 p-4 rounded-xl ">
      <div className="container mx-auto">
        {/* Search input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="ค้นหาจากชื่อทรัพย์สินหรือรหัสทรัพย์สิน"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md"
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        )}

        {/* Asset list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-center text-gray-500">กำลังโหลดข้อมูล...</p>
          ) : filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.main_asset_id} className="bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 overflow-hidden">
                {/* Image */}
                <img src="https://via.placeholder.com/400x300" alt={item.main_asset_name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-700">
                    {item.main_asset_name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">{item.main_asset_id}</p>
                  <div className="text-sm text-gray-600">
                    <p>สถานะ: {item.status}</p>
                    <p>ชื่อทรัพย์สินย่อย: {item.main_asset_name}</p>
                    <p>สถานะทรัพย์สินย่อย: {item.main_asset_status}</p>
                  </div>
                  <div className="mt-4">
                    <Link
                      to={`/show-info/${item.main_asset_id}`} 
                      className="block w-full text-center px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-md hover:bg-teal-600"
                    >
                      ดูรายละเอียด
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">ไม่พบข้อมูลที่ค้นหา</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAsset;
