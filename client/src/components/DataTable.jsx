// import React from 'react';
// import TableRow from './TableRow';

// function DataTable() {
//   return (
//     <div className="font-prompt md:container md:mx-auto w-1/2 p-8 text-left">
//       <h2 className="text-lg font-semibold mb-4 text-gray-700">ข้อมูลพัสดุย่อย</h2>
//       <table className="border-collapse table-auto w-full border border-gray-300 rounded-lg text-center bg-white">
//         <thead className="bg-gray-100 rounded-t-lg">
//           <tr>
//             <th className="p-3 border text-base border-gray-300 text-gray-700">ลำดับ</th>
//             <th className="p-3 border text-base border-gray-300 text-gray-700">รหัสพัสดุย่อย</th>
//             <th className="p-3 border text-base border-gray-300 text-gray-700">พัสดุหลัก</th>
//             <th className="p-3 border text-base border-gray-300 text-gray-700">จำนวนพัสดุย่อย</th>
//             <th className="p-3 border text-base border-gray-300 text-gray-700">สถานที่ใช้งาน</th>
//             <th className="p-3 border text-base border-gray-300 text-gray-700">สภาพใช้งาน</th>
//             <th className="p-3 border text-base border-gray-300 text-gray-700">ราคา/หน่วย</th>
//             <th className="p-3 border text-base border-gray-300 text-gray-700">อายุการใช้งาน</th>
//             <th className="p-3 border text-base border-gray-300 text-gray-700">สาเหตุเลิกใช้งาน</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* Example row, replace with dynamic rows */}
//           <TableRow index={1} subCode="SC001" mainItem="พัสดุหลัก 1" quantity={10} location="อาคาร A" condition="ดี" price={500} lifespan="5 ปี" reason="ไม่มีการใช้งาน" />
//           {/* Add more TableRow components as needed or dynamically generate them */}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default DataTable;


import React from "react";

const DataTable = () => {
  const data = [
    {
      id: 1,
      itemCode: "สมอ.12060100-001-0013/61",
      assetCode: "1000000000001",
      category: "โต๊ะ",
      unit: "ตัว",
      department: "ครุศาสตร์อุตสาหกรรม",
      status: "ใช้งานได้",
      value: 50,
    },
    {
      id: 2,
      itemCode: "สมอ.12060100-001-0014/61",
      assetCode: "1000000000002",
      category: "เก้าอี้",
      unit: "ตัว",
      department: "ครุศาสตร์อุตสาหกรรม",
      status: "ใช้งานได้",
      value: 50,
    },
    {
      id: 1,
      itemCode: "สมอ.12060100-001-0015/61",
      assetCode: "1000000000003",
      category: "คอมพิวเตอร์",
      unit: "ตัว",
      department: "ครุศาสตร์อุตสาหกรรม",
      status: "ใช้งานได้",
      value: 100,
    },
    // เพิ่มข้อมูลอื่นๆ ได้ที่นี่
  ];

  return (
    <div className="bg-white mt-4 p-4 rounded-md shadow-md overflow-x-auto">
    <table className="table-auto w-full border-collapse text-sm">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="border px-4 py-2">หมายเลขครุภัณฑ์</th>
          <th className="border px-4 py-2 hidden md:table-cell">รหัสทรัพย์สิน</th>
          <th className="border px-4 py-2 hidden lg:table-cell">ประเภทครุภัณฑ์</th>
          <th className="border px-4 py-2">ภาควิชา</th>
          <th className="border px-4 py-2 hidden sm:table-cell">จำนวน</th> 
          <th className="border px-4 py-2 hidden lg:table-cell">หน่วยนับ</th>    
          <th className="border px-4 py-2">สถานะ</th>
          <th className="border px-4 py-2">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="text-center">
            <td className="border px-4 py-2">{item.itemCode}</td>
            <td className="border px-4 py-2 hidden md:table-cell">{item.assetCode}</td>
            <td className="border px-4 py-2 hidden lg:table-cell">{item.category}</td>
            <td className="border px-4 py-2">{item.department}</td>
            <td className="border px-4 py-2 hidden sm:table-cell">
              {item.value.toFixed()}
            </td>
            <td className="border px-4 py-2 hidden lg:table-cell">{item.unit}</td>
            <td className="border px-4 py-2">{item.status}</td>
            <td className="border px-4 py-2 flex justify-center space-x-2">
              <button className="text-blue-500 hover:text-blue-700 bg-gray-200 rounded-lg px-3 py-1">
                ดู
              </button>
              <button className="text-yellow-500 hover:text-yellow-700 bg-gray-200 rounded-lg px-3 py-1">
                แก้ไข
              </button>
              <button className="text-red-500 hover:text-red-700 bg-gray-200 rounded-lg px-3 py-1">
                ลบ
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

