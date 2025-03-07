import React, { useState } from "react";

const AssetForm = ({ assetData, setAssetData }) => {
  return (
    <div className="bg-white mt-4 p-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold text-gray-700 mb-4">ข้อมูลครุภัณฑ์</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm mb-2">รหัสทรัพย์สิน</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-md"
            placeholder="สมอ.xxx-xxx-xxxx/61"
            value={assetData.asset_id}
            onChange={(e) => setAssetData({ ...assetData, asset_id: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-2">ชื่อทรัพย์สิน</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-md"
            placeholder="ชื่อครุภัณฑ์"
            value={assetData.main_item_name}
            onChange={(e) => setAssetData({ ...assetData, main_item_name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-2">ภาควิชา</label>
          <select
            className="w-full border-2 border-blue-100 rounded-md"
            value={assetData.department}
            onChange={(e) => setAssetData({ ...assetData, department: e.target.value })}
          >
            <option>ครุศาสตร์อุตสาหกรรม</option>
            <option>ครุศาสตร์สถาปัตยกรรมเเละการออกแบบ</option>
            <option>ครุศาสตร์วิศวกรรม</option>
            <option>ครุศาสตร์การเกษตร</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-2">สภาพการครุภัณฑ์</label>
          <select
            className="w-full border-2 border-blue-100 rounded-md"
            value={assetData.condition}
            onChange={(e) => setAssetData({ ...assetData, condition: e.target.value })}
          >
            <option>ใช้งาน</option>
            <option>ส่งซ่อม</option>
            <option>ชำรุด</option>
            <option>บริจาค/โอน</option>
            <option>รับโอน</option>
            <option>จำหน่าย</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AssetForm;
