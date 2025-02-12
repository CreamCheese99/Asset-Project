import React, { useState } from "react";
import { FaUserPlus, FaEdit, FaSave, FaTrash, FaTimes } from "react-icons/fa";

const initialUsers = [
  { id: "Thanchira", name: "ธัญจิรา จระคร", email: "65030099@kmitl.ac.th", role: "แอดมิน", status: "active" },
  { id: "Natthamon", name: "นัทธมน ลำเจริญ", email: "65030121@kmitl.ac.th", role: "แอดมิน", status: "inactive" },
  { id: "Khemaset", name: "เขมเสษฐิ์ ลิมวัฒโนชัย", email: "65030027@kmitl.ac.th", role: "แอดมิน", status: "inactive" },
];

const Permissions = () => {
  const [users, setUsers] = useState(initialUsers);
  const [editingId, setEditingId] = useState(null);
  const [tempRole, setTempRole] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "choose" });

  const toggleStatus = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user
    ));
  };

  const handleEdit = (id, currentRole) => {
    setEditingId(id);
    setTempRole({ ...tempRole, [id]: currentRole });
  };

  const handleSave = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, role: tempRole[id] } : user
    ));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("คุณต้องการลบผู้ใช้นี้หรือไม่?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role !== "choose") {
      setUsers([...users, { id: newUser.email, ...newUser, status: "active" }]);
      setIsModalOpen(false);
      setNewUser({ name: "", email: "", role: "choose" });
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  return (
 
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">จัดการสิทธิ์ผู้ใช้งาน</h2>

        {/* ปุ่มเพิ่มผู้ใช้งาน */}
        <button 
          className="flex items-center bg-blue-400 text-white px-4 py-2 rounded-full mb-4 hover:bg-blue-500"
          onClick={() => setIsModalOpen(true)}
        >
          <FaUserPlus className="mr-2" />
          เพิ่มผู้ใช้งานเว็บไซต์
        </button>

        {/* ตารางรายชื่อผู้ใช้ */}
        <table className="w-full border-collapse border-t border-gray-300">
          <thead>
            <tr className="text-gray-500">
              <th className="py-2 text-left">ผู้ใช้งาน</th>
              <th className="py-2 text-left">อีเมล</th> {/* New email column */}
              <th className="py-2 text-left">บทบาท</th>
              <th className="py-2 text-left">สถานะ</th>
              <th className="py-2 text-left">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-300">
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.email}</td> {/* Display email */}
                <td className="py-2">
                  {editingId === user.id ? (
                    <select
                      value={tempRole[user.id]}
                      onChange={(e) => setTempRole({ ...tempRole, [user.id]: e.target.value })}
                      className="border border-gray-300 rounded-xl px-2 py-1"
                    >
                      <option value="choose">เลือกบทบาท</option>
                      <option value="admin">แอดมิน</option>
                      <option value="department">เจ้าหน้าที่ภาควิชา</option>
                      <option value="manager">ผู้บริหาร</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="py-2">
                  <button
                    onClick={() => toggleStatus(user.id)}
                    className={`px-3 py-1 rounded-xl text-white ${user.status === "active" ? "bg-green-500" : "bg-gray-400"}`}
                  >
                    {user.status === "active" ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                  </button>
                </td>
                <td className="py-2 flex space-x-2">
                  {editingId === user.id ? (
                    <button 
                      onClick={() => handleSave(user.id)} 
                      className="bg-blue-500 text-white px-3 py-1 rounded-xl hover:bg-blue-600 flex items-center"
                    >
                      <FaSave className="mr-1" /> บันทึก
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleEdit(user.id, user.role)} 
                      className="bg-yellow-500 text-white px-3 py-1 rounded-xl hover:bg-yellow-600 flex items-center"
                    >
                      <FaEdit className="mr-1" /> แก้ไข
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600 flex items-center"
                  >
                    <FaTrash className="mr-1" /> ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Popup Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96">
              <h3 className="text-lg font-semibold mb-4">เพิ่มผู้ใช้งาน</h3>
              <input
                type="text"
                placeholder="ชื่อผู้ใช้งาน"
                className="w-full border p-2 rounded-xl mb-2"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="อีเมล"
                className="w-full border p-2 rounded-xl mb-2"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              <select
                className="w-full border p-2 rounded-xl mb-4"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="choose">เลือกบทบาท</option>
                <option value="admin">แอดมิน</option>
                <option value="department">เจ้าหน้าที่ภาควิชา</option>
                <option value="manager">ผู้บริหาร</option>
              </select>
              <div className="flex justify-between">
                <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded-xl">
                  ✖ ยกเลิก
                </button>
                <button onClick={handleAddUser} className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
   
  );
};

export default Permissions;
