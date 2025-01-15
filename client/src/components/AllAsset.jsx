
import React from "react";

const AllAsset = () => {
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
          <th className="border px-4 py-2">รหัสทรัพย์สิน</th>
          {/* <th className="border px-4 py-2 hidden md:table-cell">รหัสทรัพย์สิน</th> */}
          <th className="border px-4 py-2 hidden lg:table-cell">ประเภทครุภัณฑ์</th>
          <th className="border px-4 py-2">ภาควิชา</th>
          <th className="border px-4 py-2 hidden sm:table-cell">จำนวนครุภัณฑ์ย่อย</th> 
          <th className="border px-4 py-2 hidden lg:table-cell">หน่วยนับ</th>    
          <th className="border px-4 py-2">สถานะ</th>
          <th className="border px-4 py-2">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="text-center">
            <td className="border px-4 py-2">{item.itemCode}</td>
            {/* <td className="border px-4 py-2 hidden md:table-cell">{item.assetCode}</td> */}
            <td className="border px-4 py-2 hidden lg:table-cell">{item.category}</td>
            <td className="border px-4 py-2">{item.department}</td>
            <td className="border px-4 py-2 hidden sm:table-cell">
              {item.value.toFixed()}
            </td>
            <td className="border px-4 py-2 hidden lg:table-cell">{item.unit}</td>
            <td className="border px-4 py-2">{item.status}</td>
            <td className="border px-4 py-2 flex justify-center space-x-2">
              <button className="text-blue-500 hover:text-blue-700 bg-gray-200 rounded-lg px-3 py-1">
                พิมพ์
              </button>
             
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
};

export default AllAsset;