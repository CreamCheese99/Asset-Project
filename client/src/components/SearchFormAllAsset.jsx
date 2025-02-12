import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const SearchFormAllAsset = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    assetCode: "",
    department: "", // เลือกภาควิชาจากดรอปดาวน์
    status: "ใช้งาน",
    assetType: "ครุภัณฑ์สำนักงาน",
    budgetYear: "2566",
  });

  // ตัวแปรที่เก็บข้อมูลภาควิชา (มาจากฐานข้อมูลหรือข้อมูลที่มีอยู่)
  const [departments, setDepartments] = useState([]);

  // ฟังก์ชันดึงข้อมูลภาควิชาจากฐานข้อมูลหรือ API
  useEffect(() => {
    // สมมติว่าดึงข้อมูลภาควิชาจาก API หรือฐานข้อมูล
    const departmentList = [
    "ครุศาสตร์วิศวกรรม",
    "ครุศาสตร์เกษตร",
    "ครุศาสตร์สถาปัตยกรรม",
    "ครุศาสตร์การออกแบบ",
    "ครุศาสตร์การออกแบบสภาพแวดล้อมภายใน",
    ];
    setDepartments(departmentList);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i + 543); // ปีพุทธศักราช
    }
    return years;
  };

  return (
    <div className="bg-white mt-4 p-6 rounded-lg shadow-lg max-w-full mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        <FaSearch className="inline-block text-teal-500 mr-2" />
        ค้นหาข้อมูลครุภัณฑ์
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            รหัสทรัพย์สิน
          </label>
          <input
            type="text"
            name="assetCode"
            value={filters.assetCode}
            onChange={handleChange}
            placeholder="สมอ.xxx-xxx-xxxx/61"
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            ประเภทสินทรัพย์
          </label>
          <select
            name="assetType"
            value={filters.assetType}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
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
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            ภาควิชา
          </label>
          <select
            name="department"
            value={filters.department}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">เลือกภาควิชา</option>
            {departments.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            ประจำปีงบประมาณ
          </label>
          <select
            name="budgetYear"
            value={filters.budgetYear}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {getYearOptions().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            สภาพการครุภัณฑ์
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option>ใช้งาน</option>
            <option>ซ่อม</option>
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

export default SearchFormAllAsset;
