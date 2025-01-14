import React, { useState } from "react";

const AssetInfoSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const data = [
    {
      id: 1,
      subasset: "คีย์บอร์ด",
      type: "อุปกรณ์อิเล็กทรอนิกส์",
      detail: "-",
      price: 500,
      quantity: 50,
      unit: "ตัว",
      status: "ใช้งานได้",
    },
  ];

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="bg-white mt-4 p-4 rounded-md shadow-md overflow-x-auto">
      <h3 className="text-lg font-bold text-gray-700 mb-4">ข้อมูลสินทรัพย์ย่อย</h3>
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={handleButtonClick}
        >
          + เพิ่ม
        </button>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-1/2">
            <h3 className="text-lg font-bold text-gray-700 mb-4">ข้อมูลพัสดุย่อย</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-2">รายการพัสดุย่อย</label>
                <input
                  type="text"
                  className="w-full border-2 border-blue-100 rounded-md"
                  placeholder="รายการพัสดุย่อย"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2">ประเภท</label>
                <select className="w-full border-2 border-blue-100 rounded-md">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2">รายละเอียด</label>
                <input type="text" className="w-full border-2 border-blue-100 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2">ราคาต่อหน่วย </label>
                <input type="number" className="w-full border-2 border-blue-100 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2">จำนวน </label>
                <input type="number" className="w-full border-2 border-blue-100 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2">หน่วยนับ</label>
                <input type="text" className="w-full border-2 border-blue-100 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2">การใช้งาน</label>
                <select className="w-full border-2 border-blue-100 rounded-md">
                  <option>ใช้งานได้</option>
                  <option>เสียหาย</option>
                  </select>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-2"
                  onClick={handleClosePopup}
                >
                  ยกเลิก
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      <table className="table-auto w-full border-collapse text-sm">
        <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="border  px-4 py-2 ">รายการพัสดุย่อย</th>
          <th className="border  px-4 py-2 ">ประเภท</th>
          <th className="border  px-4 py-2 ">รายละเอียด</th>
          <th className="border  px-4 py-2 ">ราคาต่อหน่วย</th>
          <th className="border  px-4 py-2 ">จำนวน</th>
          <th className="border  px-4 py-2 ">หน่วยนับ</th>
          <th className="border  px-4 py-2 ">การใช้งาน</th>
          <th className="border px-4 py-2 ">จัดการ</th>
        </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border px-4 py-2">{item.subasset}</td>
              <td className="border px-4 py-2">{item.type}</td>
              <td className="border px-4 py-2">{item.detail}</td>
              <td className="border px-4 py-2">{item.price.toFixed()}</td>
              <td className="border px-4 py-2">{item.quantity.toFixed()}</td>
              <td className="border px-4 py-2">{item.unit}</td>
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

export default AssetInfoSection;
