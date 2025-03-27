// import React, { useState, useEffect } from "react";
// import { FaUserPlus, FaEdit, FaSave, FaTrash, FaTimes } from "react-icons/fa";
// import axios from "axios"; // เพิ่มการใช้งาน axios

// const initialUsers = [
//   { id: "Thanchira", name: "ธัญจิรา จระคร", email: "65030099@kmitl.ac.th", role: "แอดมิน", status: "active" },
//   { id: "Natthamon", name: "นัทธมน ลำเจริญ", email: "65030121@kmitl.ac.th", role: "แอดมิน", status: "inactive" },
//   { id: "Khemaset", name: "เขมเสษฐิ์ ลิมวัฒโนชัย", email: "65030027@kmitl.ac.th", role: "แอดมิน", status: "inactive" },
// ];

// const Permissions = () => {
//   const [users, setUsers] = useState(initialUsers);
//   const [editingId, setEditingId] = useState(null);
//   const [tempRole, setTempRole] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newUser, setNewUser] = useState({ name: "", email: "", role: "choose", department_id: "" });
//   const [department, setDepartment] = useState([]); // เพิ่ม state สำหรับเก็บข้อมูลภาควิชา

//   // ฟังก์ชันสำหรับเปลี่ยนสถานะ
//   const toggleStatus = (id) => {
//     setUsers(users.map(user => 
//       user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user
//     ));
//   };

//   // ฟังก์ชันเริ่มแก้ไขบทบาท
//   const handleEdit = (id, currentRole) => {
//     setEditingId(id);
//     setTempRole({ ...tempRole, [id]: currentRole });
//   };

//   // ฟังก์ชันบันทึกบทบาทที่แก้ไข
//   const handleSave = (id) => {
//     setUsers(users.map(user => 
//       user.id === id ? { ...user, role: tempRole[id] } : user
//     ));
//     setEditingId(null);
//   };

//   // ฟังก์ชันลบผู้ใช้
//   const handleDelete = (id) => {
//     if (window.confirm("คุณต้องการลบผู้ใช้นี้หรือไม่?")) {
//       setUsers(users.filter(user => user.id !== id));
//     }
//   };

//   // ฟังก์ชันเพิ่มผู้ใช้งานใหม่
//   const handleAddUser = () => {
//     if (newUser.name && newUser.email && newUser.role !== "choose" && newUser.department_id) {
//       setUsers([...users, { id: newUser.email, ...newUser, status: "active" }]);
//       setIsModalOpen(false);
//       setNewUser({ name: "", email: "", role: "choose", department_id: "" });
//     } else {
//       alert("กรุณากรอกข้อมูลให้ครบถ้วน");
//     }
//   };

  // // ฟังก์ชันดึงข้อมูลภาควิชาจาก API
  // useEffect(() => {
  //   const fetchDepartment = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/department');
  //       if (Array.isArray(response.data)) {
  //         setDepartment(response.data); // ตั้งค่าข้อมูลภาควิชา
  //       } else {
  //         console.error("ข้อมูลภาควิชาไม่เป็นอาเรย์:", response.data);
  //       }
  //     } catch (err) {
  //       console.error('เกิดข้อผิดพลาดในการดึงข้อมูลภาควิชา:', err);
  //     }
  //   };

  //   fetchDepartment();
  // }, []);

//   return (
//     <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-gray-700">จัดการสิทธิ์ผู้ใช้งาน</h2>

//       {/* ปุ่มเพิ่มผู้ใช้งาน */}
//       <button 
//         className="flex items-center bg-blue-400 text-white px-4 py-2 rounded-full mb-4 hover:bg-blue-500"
//         onClick={() => setIsModalOpen(true)}
//       >
//         <FaUserPlus className="mr-2" />
//         เพิ่มผู้ใช้งานเว็บไซต์
//       </button>

//       {/* ตารางรายชื่อผู้ใช้ */}
//       <table className="w-full border-collapse border-t border-gray-300">
//         <thead>
//           <tr className="text-gray-500">
//             <th className="py-2 text-left">ผู้ใช้งาน</th>
//             <th className="py-2 text-left">อีเมล</th>
//             <th className="py-2 text-left">บทบาท</th>
//             <th className="py-2 text-left">สถานะ</th>
//             <th className="py-2 text-left">จัดการ</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id} className="border-t border-gray-300">
//               <td className="py-2">{user.name}</td>
//               <td className="py-2">{user.email}</td>
//               <td className="py-2">
//                 {editingId === user.id ? (
//                   <select
//                     value={tempRole[user.id]}
//                     onChange={(e) => setTempRole({ ...tempRole, [user.id]: e.target.value })}
//                     className="border border-gray-300 rounded-xl px-2 py-1"
//                   >
//                     <option value="choose">เลือกบทบาท</option>
//                     <option value="admin">แอดมิน</option>
//                     <option value="department">เจ้าหน้าที่ภาควิชา</option>
//                     <option value="manager">ผู้บริหาร</option>
//                   </select>
//                 ) : (
//                   user.role
//                 )}
//               </td>
//               <td className="py-2">
//                 <button
//                   onClick={() => toggleStatus(user.id)}
//                   className={`px-3 py-1 rounded-xl text-white ${user.status === "active" ? "bg-green-500" : "bg-gray-400"}`}
//                 >
//                   {user.status === "active" ? "เปิดใช้งาน" : "ปิดใช้งาน"}
//                 </button>
//               </td>
//               <td className="py-2 flex space-x-2">
//                 {editingId === user.id ? (
//                   <button 
//                     onClick={() => handleSave(user.id)} 
//                     className="bg-blue-500 text-white px-3 py-1 rounded-xl hover:bg-blue-600 flex items-center"
//                   >
//                     <FaSave className="mr-1" /> บันทึก
//                   </button>
//                 ) : (
                //   <button 
                //     onClick={() => handleEdit(user.id, user.role)} 
                //     className="bg-yellow-500 text-white px-3 py-1 rounded-xl hover:bg-yellow-600 flex items-center"
                //   >
                //     <FaEdit className="mr-1" /> แก้ไข
                //   </button>
                // )}
                // <button 
                //   onClick={() => handleDelete(user.id)} 
                //   className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600 flex items-center"
                // >
                //   <FaTrash className="mr-1" /> ลบ
                // </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Popup Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-96">
//             <h3 className="text-lg font-semibold mb-4">เพิ่มผู้ใช้งาน</h3>
//             <input
//               type="text"
//               placeholder="ชื่อผู้ใช้งาน"
//               className="w-full border p-2 rounded-xl mb-2"
//               value={newUser.name}
//               onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//             />
//             <input
//               type="email"
//               placeholder="อีเมล"
//               className="w-full border p-2 rounded-xl mb-2"
//               value={newUser.email}
//               onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//             />

      
              
//             <select
//               className="w-full border p-2 rounded-xl mb-4"
//               value={newUser.department_id}
//               onChange={(e) => setNewUser({ ...newUser, department_id: e.target.value })}
//             >
//               <option value="">เลือกภาควิชา</option>
//               {Array.isArray(department) && department.map((dept) => (
//                 <option key={dept.department_id} value={dept.department_id}>
//                   {dept.department_name}
//                 </option>
//               ))}
//             </select>
            
//             <select
//               className="w-full border p-2 rounded-xl mb-4"
//               value={newUser.role}
//               onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//             >
//               <option value="choose">เลือกบทบาท</option>
//               <option value="admin">แอดมิน</option>
//               <option value="manager">ผู้บริหาร</option>
//               <option value="teacher">อาจารย์</option>
//               <option value="department_officer">เจ้าหน้าที่ภาควิชา</option>
//             </select>
//             <div className="flex justify-between">
//               <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded-xl">
//                 ยกเลิก
//               </button>
//               <button onClick={handleAddUser} className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
//                 บันทึก
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Permissions;

import React, { useState, useEffect } from "react";
import { FaUserPlus, FaEdit, FaSave, FaTrash } from "react-icons/fa";
import axios from "axios";

const Permissions = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [tempRole, setTempRole] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newUser, setNewUser] = useState({
    user_name: "",
    user_email: "",
    role: "choose",
    department_id: "",
    user_id: "",
  });

  const [department, setDepartment] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (err) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', err);
      }
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchDepartment = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/department');
        if (Array.isArray(response.data)) {
          setDepartment(response.data);
        } else {
          console.error("ข้อมูลภาควิชาไม่เป็นอาเรย์:", response.data);
        }
      } catch (err) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลภาควิชา:', err);
      }
      setIsLoading(false);
    };
    fetchDepartment();
  }, []);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/role");
        if (response.data && Array.isArray(response.data)) {
          setRoles(response.data);
        } else {
          console.error("ข้อมูลบทบาทไม่ถูกต้อง:", response.data);
        }
      } catch (err) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลบทบาท:", err);
      }
    };
    fetchRole();
  }, []);

  const toggleStatus = async (id) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user
    );
    setUsers(updatedUsers);
    try {
      await axios.put(`http://localhost:5000/api/users/${id}/status`, { status: updatedUsers.find(user => user.id === id).status });
    } catch (err) {
      console.error("Error updating user status:", err);
    }
  };

  const handleEdit = (id, currentRole) => {
    setEditingId(id);
    setTempRole({ ...tempRole, [id]: currentRole });
  };

  const handleSave = async (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, role: tempRole[id] } : user
    ));
    setEditingId(null);
    try {
      await axios.put(`http://localhost:5000/api/users/${id}/role`, { role: tempRole[id] });
    } catch (err) {
      console.error("Error saving user role:", err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      alert("ลบผู้ใช้สำเร็จ");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบผู้ใช้:", error);
    }
  };
  
  
  
  

  const [successMessage, setSuccessMessage] = useState(""); // state สำหรับข้อความสำเร็จ

  
  const handleAddUser = async () => {
    if (newUser.user_name && newUser.user_email && newUser.role !== "choose" && newUser.department_id && newUser.user_id) {
      const newUserData = {
        user_id: newUser.user_id,
        user_name: newUser.user_name,
        user_email: newUser.user_email,
        department_id: newUser.department_id,
        role: newUser.role,
      };

      try {
        const response = await axios.post('http://localhost:5000/api/users', newUserData);
        setSuccessMessage("เพิ่มผู้ใช้งานสำเร็จ!");
        setIsModalOpen(false); // ปิด modal หลังจากเพิ่มสำเร็จ
        setNewUser({
          user_name: "",
          user_email: "",
          role: "choose",
          department_id: "",
          user_id: "",
        });
      } catch (err) {
        console.error("Error adding new user:", err);
        alert("เกิดข้อผิดพลาดในการเพิ่มผู้ใช้งาน");
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
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

      {isLoading ? (
        <div>กำลังโหลด...</div>
      ) : (
        <table className="w-full border-collapse border-t border-gray-300">
          <thead>
            <tr className="text-gray-500">
              <th className="py-2 text-left">ผู้ใช้งาน</th>
              <th className="py-2 text-left">รหัสประจำตัว</th>
              <th className="py-2 text-left">อีเมล</th>
              <th className="py-2 text-left">ภาควิชา</th>
              <th className="py-2 text-left">บทบาท</th>
              <th className="py-2 text-left">สถานะ</th>
              <th className="py-2 text-left">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-300">
                <td className="py-2">{user.user_name}</td>
                <td className="py-2">{user.user_id}</td>
                <td className="py-2">{user.user_email}</td>
                <td className="py-2">{user.department_name}</td>
                <td className="py-2">
                  {editingId === user.id ? (
                    <select
                      value={tempRole[user.id]}
                      onChange={(e) => setTempRole({ ...tempRole, [user.id]: e.target.value })}
                      className="border p-1 rounded-md"
                    >
                      {roles.map(role => (
                        <option key={role.role_id} value={role.role_name}>
                          {role.role_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    user.role_name
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
                      onClick={() => handleSave(user.user_id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-xl hover:bg-blue-600"
                    >
                      <FaSave className="mr-1" /> บันทึก
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(user.id, user.role)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-xl hover:bg-yellow-600"
                    >
                      <FaEdit className="mr-1" /> แก้ไข
                    </button>
                  )}
                    <button
                      onClick={() => handleDelete(user.user_id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600"
                    >
                      <FaTrash className="mr-1" /> ลบ
                    </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">เพิ่มผู้ใช้งาน</h3>
            <input
              type="text"
              placeholder="ชื่อผู้ใช้งาน"
              className="w-full border p-2 rounded-xl mb-2"
              value={newUser.user_name || ""}
              onChange={(e) => setNewUser({ ...newUser, user_name: e.target.value })}
            />
            <input
              type="number"
              placeholder="รหัสประจำตัว"
              className="w-full border p-2 rounded-xl mb-2"
              value={newUser.user_id}
              onChange={(e) => setNewUser({ ...newUser, user_id: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="อีเมล"
              className="w-full border p-2 rounded-xl mb-2"
              value={newUser.user_email}
              onChange={(e) => setNewUser({ ...newUser, user_email: e.target.value })}
            />
            <select
              className="w-full border p-2 rounded-xl mb-4"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="choose">เลือกบทบาท</option>
              {roles.map((role) => (
                <option key={role.role_id} value={role.role_name}>
                  {role.role_name}
                </option>
              ))}
            </select>
            <select
              className="w-full border p-2 rounded-xl mb-4"
              value={newUser.department_id}
              onChange={(e) => setNewUser({ ...newUser, department_id: e.target.value })}
            >
              <option value="">เลือกภาควิชา</option>
              {department.map((dept) => (
                <option key={dept.department_id} value={dept.department_id}>
                  {dept.department_name}
                </option>
              ))}
            </select>
            <div className="flex justify-between">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-300 px-4 py-2 rounded-xl"
            >
              ปิด
            </button>
            <button
              onClick={handleAddUser}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
            >
              เพิ่มผู้ใช้งาน
            </button>
          </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Permissions;


