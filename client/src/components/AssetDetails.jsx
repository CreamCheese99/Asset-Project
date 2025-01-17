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
          className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-700"
        >
          + เพิ่มรูป
        </button>
        </div>

        

        {/* <div>
          <label className="block text-sm text-gray-700 mb-2">มูลค่า (บาท)</label>
          <input
            type="number"
            className="w-full border-2 border-blue-100 rounded-md"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">อายุการใช้งาน (ปี)</label>
          <select className="w-full border-2 border-blue-100 rounded-md">
            <option>กรุณาเลือก</option>
            <option>1 ปี</option>
            <option>2 ปี</option>
          </select>
        </div> */}

      </div>
      {/* <div className="mt-4">
        <label className="block text-sm text-gray-700 mb-2">รายละเอียดเพิ่มเติม</label>
        <textarea
          className="w-full border-2 border-blue-100 rounded-md"
          rows="4"
          placeholder="กรอกรายละเอียด"
        ></textarea>
      </div> */}
      
    </div>
  );
};

export default AssetDetails;
