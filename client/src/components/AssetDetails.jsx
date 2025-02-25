import React from "react";

const AssetDetails = () => {
  return (
    <div className="bg-white mt-4 p-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold text-gray-700 mb-4">รายละเอียดพัสดุ</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-2">ประเภทพัสดุ</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-md"
            placeholder="กรอกชื่อประเภทพัสดุ"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">สถานที่ใช้งาน</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-md"
            placeholder="สถานที่ใช้งาน"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">การใช้งาน</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-md"
            placeholder="การใช้งาน"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">สถานที่ส่งมอบ</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-md"
            placeholder="สถานที่ส่งมอบ"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">ผู้รับผิดชอบ</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-md"
            placeholder="ผู้รับผิดชอบ"
          />
        </div>
        <div>
        <label className="block text-sm text-gray-700 mb-2">เพิ่มรูปภาพ</label>
        <button
          className="bg-green-500 text-white px-4 py-1 rounded-xl hover:bg-green-700"
        >
          + เพิ่มรูป
        </button>
        </div>
      </div>  
    </div>
  );
};

export default AssetDetails;
