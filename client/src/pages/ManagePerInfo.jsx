import React, { useState } from "react";

const ManagePerInfo = () => {
  const [department, setDepartment] = useState("");
  const [major, setMajor] = useState("");
  const [departments, setDepartments] = useState([]);
  const [majors, setMajors] = useState([]);

  const addDepartment = (e) => {
    e.preventDefault();
    if (department.trim() !== "") {
      setDepartments([...departments, department]);
      setDepartment("");
    }
  };

  const addMajor = (e) => {
    e.preventDefault();
    if (major.trim() !== "") {
      setMajors([...majors, major]);
      setMajor("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          จัดการข้อมูลทั่วไป
        </h2>

        {/* ฟอร์มเพิ่มภาควิชา */}
        <form onSubmit={addDepartment} className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            เพิ่มภาควิชา
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="กรอกชื่อภาควิชา"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              เพิ่ม
            </button>
          </div>
        </form>

        {/* ฟอร์มเพิ่มสาขาวิชา */}
        <form onSubmit={addMajor} className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            เพิ่มสาขาวิชา
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:ring focus:ring-green-300"
              placeholder="กรอกชื่อสาขาวิชา"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              เพิ่ม
            </button>
          </div>
        </form>

        {/* แสดงรายการภาควิชา */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            รายการภาควิชา
          </h3>
          <ul className="list-disc pl-5 text-gray-600">
            {departments.length === 0 ? (
              <p className="text-gray-400">ไม่มีข้อมูล</p>
            ) : (
              departments.map((dept, index) => <li key={index}>{dept}</li>)
            )}
          </ul>
        </div>

        {/* แสดงรายการสาขาวิชา */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            รายการสาขาวิชา
          </h3>
          <ul className="list-disc pl-5 text-gray-600">
            {majors.length === 0 ? (
              <p className="text-gray-400">ไม่มีข้อมูล</p>
            ) : (
              majors.map((maj, index) => <li key={index}>{maj}</li>)
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManagePerInfo;
