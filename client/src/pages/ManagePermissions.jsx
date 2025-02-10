import React, { useState } from "react";

const initialUsers = [
  { id: "somchai", name: "สมชาย ใจดี", email: "somchai@org.com", department: "IT", role: "Admin", status: "active" },
  { id: "somying", name: "สมหญิง รักงาน", email: "somying@org.com", department: "HR", role: "Administrator", status: "active" },
  { id: "somsak", name: "สมศักดิ์ มุ่งมั่น", email: "somsak@org.com", department: "Finance", role: "Office", status: "inactive" },
  { id: "somjai", name: "สมใจ พากเพียร", email: "somjai@org.com", department: "Marketing", role: "General", status: "active" },
  { id: "sompong", name: "สมปอง ตั้งใจ", email: "sompong@org.com", department: "Sales", role: "General", status: "inactive" },
];

const ManagePermissions = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");

  // Handle role change
  const handleRoleChange = (id, newRole) => {
    setUsers(users.map(user => user.id === id ? { ...user, role: newRole } : user));
  };

  // Toggle user status
  const toggleStatus = (id) => {
    setUsers(users.map(user => user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user));
  };

  // Filter users
  const filteredUsers = users.filter(user =>
    user.name.includes(search) || user.email.includes(search)
  ).filter(user =>
    selectedDept === "all" || user.department === selectedDept
  ).filter(user =>
    selectedRole === "all" || user.role === selectedRole
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">จัดการสิทธิ์ผู้ใช้งาน</h2>

      {/* Search & Filters */}
      <div className=" flex space-x-4 mb-4 ">
        <input
          type="text"
          placeholder="ค้นหาชื่อหรืออีเมล..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-1/3 rounded-xl"
        />
        <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} className="rounded-xl border border-gray-300 rounded px-3 py-2">  
          <option>--เลือกภาควิชา--</option>
          <option>ครุศาสตร์อุตสาหกรรม</option>
          <option>ครุศาสตร์สถาปัตยกรรมเเละการออกแบบ</option>
          <option>ครุศาสตร์วิศวกรรม</option>
          <option>ครุศาสตร์การเกษาตร</option>
        </select>
        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className=" rounded-xl border border-gray-300 rounded px-3 py-2">
          <option >--เลือกสิทธิ์การใช้งาน--</option>
          <option >Admin</option>
          <option >Administrator</option>
          <option >Office</option>
          <option >General</option>
        </select>
      </div>

      {/* User Table */}
      <table className="min-w-full bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b text-left">ชื่อ - นามสกุล</th>
            <th className="py-2 px-4 border-b text-left">อีเมล</th>
            <th className="py-2 px-4 border-b text-left">แผนก</th>
            <th className="py-2 px-4 border-b text-left">สิทธิ์การใช้งาน</th>
            <th className="py-2 px-4 border-b text-left">สถานะ</th>
            <th className="py-2 px-4 border-b text-left">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.department}</td>
              <td className="py-2 px-4 border-b">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="border border-gray-300 rounded-xl px-2 py-1"
                >
                  <option value="Admin">Admin</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Office">Office</option>
                  <option value="General">General</option>
                </select>
              </td>
              <td className="py-2 px-4 border-b rounded-xl ">
                <button
                  className={`px-4 py-2 rounded-xl ${user.status === "active" ? "bg-black text-white" : "bg-gray-300 text-black"}`}
                  onClick={() => toggleStatus(user.id)}
                >
                  {user.status === "active" ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <button className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-700">ปิดใช้งาน</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePermissions;
