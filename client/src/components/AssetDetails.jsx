import React from "react";

const AssetDetails = () => {
  return (
    <div className="bg-white rounded-md shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-700 mb-4">รายละเอียดครุภัณฑ์</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-2">รายการ</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-md"
            placeholder="กรอกชื่อรายการ"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">หมายเลขเครื่อง S/N</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-md"
            placeholder="กรอกหมายเลข S/N"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">รุ่น</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-md"
            placeholder="กรอกรุ่น"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">ยี่ห้อ</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-md"
            placeholder="กรอกยี่ห้อ"
          />
        </div>
        <div>
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
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm text-gray-700 mb-2">รายละเอียดเพิ่มเติม</label>
        <textarea
          className="w-full border-2 border-blue-100 rounded-md"
          rows="4"
          placeholder="กรอกรายละเอียด"
        ></textarea>
      </div>
    </div>
  );
};

export default AssetDetails;
