import React from "react";

const SearchForm = () => {
  return (
    <div className="bg-white mt-4 p-4 rounded-md shadow-md">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-700 text-sm mb-2">ภาควิชา</label>
          <select className="w-full border-2 border-blue-100 rounded-md">
            <option>ครุศาสตร์อุตสาหกรรม</option>
            <option>ครุศาสตร์สถาปัตยกรรมเเละการออกแบบ</option>
            <option>ครุศาสตร์วิศวกรรม</option>
            <option>ครุศาสตร์การเกษาตร</option>
            
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-2">ประเภทพัสดุ</label>
          <select className="w-full border-2 border-blue-100 rounded-md">
            <option>ประเภทพัสดุ1</option>
            <option>ประเภทพัสดุ2</option>
            <option>ประเภทพัสดุ3</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-2">ประเภทเงิน</label>
          <select className="w-full border-2 border-blue-100 rounded-md">
            <option>เงินรายได้</option>
            <option>เงินงบประมาณ</option>
            <option>เงินสะสมคลัง</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-2">สถานะ</label>
          <select className="w-full border-2 border-blue-100 rounded-md">
            <option>สถานะ1</option>
            <option>สถานะ2</option>
            <option>สถานะ3</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700 text-sm mb-2">รหัสทรัพย์สิน </label>
          <input type="text" className="w-full border-2 border-blue-100 rounded-md" />
        </div>
        {/* <div className="col-span-2">
          <label className="block text-gray-700 text-sm mb-2">หมายเลขครุภัณฑ์</label>
          <input type="text" className="w-full border-2 border-blue-100 rounded-md" />
        </div> */}
        <div className="col-span-4 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            ค้นหา
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
