import React from 'react';

function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-100 text-white">
      {/* Logo / Header */}
      <div className="p-4 bg-gray-300 text-center">
        <h1 className="text-xl font-bold">ครุภัณฑ์</h1>
      </div>

      {/* Menu Items */}
      <ul className="flex-1 mt-4 space-y-2">
        <li>
          <a href="#" className="font-prompt block px-4 py-2 hover:bg-gray-700 rounded transition">หมวดหมู่-ประเภทครุภัณฑ์</a>
        </li>

        <li>
          <a href="#" className="font-prompt block px-4 py-2 hover:bg-gray-700 rounded transition">รายการครุภัณฑ์</a>
        </li>

        <li>
          <a href="#" className="font-prompt block px-4 py-2 hover:bg-gray-700 rounded transition" >รายงาน</a>
        </li>

        <li>
          <a href="#" className="font-prompt block px-4 py-2 hover:bg-gray-700 rounded transition">จัดการผู้ใช้งาน</a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
