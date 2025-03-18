import React, { useState } from "react";
import { FaUserPlus, FaEdit, FaSave, FaTrash } from "react-icons/fa";

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

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">จัดการสิทธิ์ผู้ใช้งาน</h2>
      
      <button 
        className="flex items-center bg-blue-400 text-white px-4 py-2 rounded-full mb-4 hover:bg-blue-500"
        onClick={() => setIsModalOpen(true)}
      >
        <FaUserPlus className="mr-2" />
        เพิ่มผู้ใช้งานเว็บไซต์
      </button>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-t border-gray-300">
          <thead>
            <tr className="text-gray-500">
              <th className="py-2 text-left">ผู้ใช้งาน</th>
              <th className="py-2 text-left">อีเมล</th>
              <th className="py-2 text-left">บทบาท</th>
              <th className="py-2 text-left">สถานะ</th>
              <th className="py-2 text-left">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-300 text-sm sm:text-base">
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">{editingId === user.id ? (
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
                ) : user.role}
                </td>
                <td className="py-2">
                  <button
                    onClick={() => toggleStatus(user.id)}
                    className={`px-3 py-1 rounded-xl text-white ${user.status === "active" ? "bg-green-500" : "bg-gray-400"}`}
                  >
                    {user.status === "active" ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                  </button>
                </td>
                <td className="py-2 flex flex-wrap gap-2">
                  {editingId === user.id ? (
                    <button onClick={() => handleSave(user.id)} className="bg-blue-500 text-white px-3 py-1 rounded-xl hover:bg-blue-600">
                      <FaSave />
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(user.id, user.role)} className="bg-yellow-500 text-white px-3 py-1 rounded-xl hover:bg-yellow-600">
                      <FaEdit />
                    </button>
                  )}
                  <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Permissions;
