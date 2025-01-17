import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import BreadcrumbUser from "./components/BreadcrumbUser";

const UserPage = () => {
  // State สำหรับจัดการการเลือกสิทธิ์
  const [permissions, setPermissions] = useState({
    userName: "", // เพิ่ม state สำหรับเก็บชื่อผู้ใช้
    canEdit: false,
    canDelete: false,
    canAdd: false,
    canView: false,
    isAdmin: false, // เพิ่มสิทธิ์แอดมิน
  });

  // ฟังก์ชันที่ใช้ในการอัพเดตสถานะของสิทธิ์
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [name]: checked,
    }));
  };

  // ฟังก์ชันที่ใช้ในการอัพเดตชื่อผู้ใช้
  const handleUserNameChange = (event) => {
    const { value } = event.target;
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      userName: value,
    }));
  };

  return (
    <div style={{ backgroundColor: '#f1f8e9' }} className="min-h-screen font-sans">
      {/* ส่วนของ Header, NavBar, Breadcrumb */}
      <Header />
      <NavBar />
      <BreadcrumbUser />
      
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">จัดการสิทธิ์ของผู้ใช้</h2>
        
        {/* ฟอร์มสำหรับกรอกชื่อผู้ใช้ */}
        <div className="mb-4">
          <label htmlFor="userName" className="block text-lg font-medium mb-2">
            ชื่อผู้ใช้
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={permissions.userName}
            onChange={handleUserNameChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="กรอกชื่อผู้ใช้"
          />
        </div>

        {/* ฟอร์มสิทธิ์ต่าง ๆ */}
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="canAdd"
              checked={permissions.canAdd}
              onChange={handleCheckboxChange}
              id="canAdd"
              className="mr-2"
            />
            <label htmlFor="canAdd">สามารถเพิ่มข้อมูล</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="canEdit"
              checked={permissions.canEdit}
              onChange={handleCheckboxChange}
              id="canEdit"
              className="mr-2"
            />
            <label htmlFor="canEdit">สามารถแก้ไขข้อมูล</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="canDelete"
              checked={permissions.canDelete}
              onChange={handleCheckboxChange}
              id="canDelete"
              className="mr-2"
            />
            <label htmlFor="canDelete">สามารถลบข้อมูล</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="canView"
              checked={permissions.canView}
              onChange={handleCheckboxChange}
              id="canView"
              className="mr-2"
            />
            <label htmlFor="canView">สามารถดูรายการข้อมูล</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isAdmin"
              checked={permissions.isAdmin}
              onChange={handleCheckboxChange}
              id="isAdmin"
              className="mr-2"
            />
            <label htmlFor="isAdmin">สิทธิ์แอดมิน</label>
          </div>
        </div>

        {/* ปุ่มบันทึกการเปลี่ยนแปลง */}
        <button
          onClick={() => alert(`ชื่อผู้ใช้: ${permissions.userName}\nสิทธิ์ได้รับการอัพเดต!`)}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          บันทึกการเปลี่ยนแปลง
        </button>
      </div>
    </div>
  );
};

export default UserPage;
