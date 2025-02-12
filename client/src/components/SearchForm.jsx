import React from "react";

const SearchForm = () => {
  return (
    <div className="bg-white mt-4 p-4 rounded-xl shadow-md">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-700 text-sm mb-2">ภาควิชา</label>
          <select className="w-full border-2 border-blue-100 rounded-xl">
            <option>ครุศาสตร์อุตสาหกรรม</option>
            <option>ครุศาสตร์สถาปัตยกรรมเเละการออกแบบ</option>
            <option>ครุศาสตร์วิศวกรรม</option>
            <option>ครุศาสตร์การเกษตร</option>
            
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-2">ประเภทสินทรัพย์</label>
          <select className="w-full border-2 border-blue-100 rounded-xl">
            <option>ครุภัณฑ์สำนักงาน</option>
            <option>ครุภัณฑ์ยานพาหนะและขนส่ง</option>
            <option>ครุภัณฑ์ไฟฟ้าและวิทยุ</option>
            <option>ครุภัณฑ์ไฟฟ้าและวิทยุ-เครื่องกำเนิดไฟฟ้า</option>
            <option>ครุภัณฑ์เขียนและเผยแพร่</option>
            <option>ครุภัณฑ์การเกษตร-เครื่องมืออุปกรณ์</option>
            <option>ครุภัณฑ์การเกษตร-เครื่องจักรกล</option>
            <option>ครุภัณฑ์โรงงาน-เครื่องมืออุปกรณ์</option>
            <option>ครุภัณฑ์โรงงาน-เครื่องจักรกล</option>
            <option>ครุภัณฑ์ก่อสร้าง-เครื่องมือและอุปกรณ์</option>
            <option>ครุภัณฑ์ก่อสร้าง-เครื่องจักรกล</option>
            <option>ครุภัณฑ์วิทยาศาสตร์และการแพทย์</option>
            <option>ครุภัณฑ์คอมพิวเตอร์</option>
            <option>ครุภัณฑ์กีฬา-กายภาพ</option>
            <option>ครุภัณฑ์สนาม</option>
            <option>ครุภัณฑ์งานบ้านงานครัว</option>
            <option>ครุภัณฑ์การศึกษา</option>
            <option>ครุภัณฑ์ศิลปะ-นาฏศิลป์</option>
            <option>ครุภัณฑ์อาวุธ</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-2">ประเภทเงิน</label>
          <select className="w-full border-2 border-blue-100 rounded-xl">
            <option>เงินรายได้</option>
            <option>เงินงบประมาณ</option>
            <option>เงินสะสมคลัง</option>
            <option>เงินกันเหลือมปี</option>
            
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-2">สภาพการครุภัณฑ์</label>
          <select className="w-full border-2 border-blue-100 rounded-xl">
            <option>ใช้งาน</option>
            <option>ซ่อม</option>
            <option>ชำรุด</option>
            <option>บริจาค/โอน</option>
            <option>รับโอน</option>
            <option>จำหน่าย</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700 text-sm mb-2">รหัสทรัพย์สิน </label>
          <input type="text" className="w-full border-2 border-blue-100 rounded-xl" />
        </div>
        {/* <div className="col-span-2">
          <label className="block text-gray-700 text-sm mb-2">หมายเลขครุภัณฑ์</label>
          <input type="text" className="w-full border-2 border-blue-100 rounded-md" />
        </div> */}
        <div className="col-span-4 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
            ค้นหา
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
