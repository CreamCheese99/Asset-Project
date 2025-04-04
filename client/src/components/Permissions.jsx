import React, { useState, useEffect } from "react";
import { FaUserPlus, FaEdit, FaSave, FaTrash ,FaTimes} from "react-icons/fa";
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
    department_id: ""
  });

  const [department, setDepartment] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5001/api/users');
        setUsers(response.data);
      } catch (err) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', err);
        alert('ไม่สามารถโหลดข้อมูลผู้ใช้ได้');
      }
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchDepartment = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5001/api/department');
        if (Array.isArray(response.data)) {
          setDepartment(response.data);
        } else {
          console.error("ข้อมูลภาควิชาไม่เป็นอาเรย์:", response.data);
        }
      } catch (err) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลภาควิชา:', err);
        alert('ไม่สามารถโหลดข้อมูลภาควิชาได้');
      }
      setIsLoading(false);
    };
    fetchDepartment();
  }, []);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/role");
        if (response.data && Array.isArray(response.data)) {
          setRoles(response.data);
        } else {
          console.error("ข้อมูลบทบาทไม่ถูกต้อง:", response.data);
        }
      } catch (err) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลบทบาท:", err);
        alert('ไม่สามารถโหลดข้อมูลบทบาทได้');
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
      await axios.put(`http://localhost:5001/api/users/${id}/status`, { status: updatedUsers.find(user => user.id === id).status });
    } catch (err) {
      console.error("Error updating user status:", err);
      alert('ไม่สามารถอัพเดตสถานะผู้ใช้ได้');
    }
  };
  
  const handleEdit = (id, currentRoleId) => {
    console.log(id,currentRoleId);
    setEditingId(id);
    setTempRole({ ...tempRole, [id]: currentRoleId }); // ใช้ role_id
  };
  const handleSave = async (id) => {
    try {
      const selectedRoleId = tempRole[id]; // role_id ที่ถูกเลือก
      if (!selectedRoleId) {
        alert("กรุณาเลือกบทบาทก่อนบันทึก");
        return;
      }
      const response = await axios.put(`http://localhost:5001/api/users/${id}/role`, { role_id: selectedRoleId });
      setUsers(users.map(user =>
        user.user_id === id
          ? { 
              ...user, 
              role_id: selectedRoleId, 
              role_name: roles.find(role => role.role_id === selectedRoleId)?.role_name || user.role_name 
            }
          : user
      ));
  
      setEditingId(null);
      alert("บันทึกบทบาทสำเร็จ!");
    } catch (err) {
      console.error("Error saving user role:", err);
      alert("ไม่สามารถบันทึกบทบาทได้");
    }
  };
  
  
  
  const handleCancelEdit = () => {
    setEditingId(null); // ยกเลิกการแก้ไข
  };
  
  
  
  

  const handleDelete = (id) => {
    // ตรวจสอบว่า id มีค่าหรือไม่
    console.log(id);
    if (!id) {
      alert("ไม่พบข้อมูลที่ต้องการลบ");
      return;  // หากไม่มี id ให้หยุดการทำงาน
    }
  
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) {
      axios
        .delete(`http://localhost:5001/api/users/${id}`)  // ส่ง id เป็น parameter
        .then((response) => {
          // เช็คว่า response มีข้อความตอบกลับที่ถูกต้องหรือไม่
          if (response.status === 200) {
            // ลบผู้ใช้จาก state โดยใช้ user_id
            setUsers(users.filter(user => user.user_id !== id)); // ใช้ user_id ตรงกับฐานข้อมูล
            alert("ลบข้อมูลสำเร็จ!"); // แจ้งเตือนเมื่อสำเร็จ
          }
        })
        .catch((error) => {
          console.error("เกิดข้อผิดพลาดในการลบ:", error);
          alert("ไม่สามารถลบข้อมูลได้");
        });
    }
  };
  
  
  

  const handleAddUser = async () => {
    if (newUser.user_name && newUser.user_email && newUser.role !== "choose" && newUser.department_id) {
      setIsAddingUser(true);  
      const newUserData = {
        user_name: newUser.user_name,
        user_email: newUser.user_email,
        department_id: newUser.department_id,
        role: newUser.role
      };
  
      try {
        const response = await axios.post("http://localhost:5001/api/users", newUserData);
        setUsers(prevUsers => [...prevUsers, { 
          user_id: response.data.userId,
          ...newUserData 
        }]);
  
        alert("เพิ่มผู้ใช้งานสำเร็จ!");
        setIsModalOpen(false);
        setNewUser({ user_name: "", user_email: "", role: "choose", department_id: "" });
      } catch (err) {
        console.error("เกิดข้อผิดพลาดในการเพิ่มผู้ใช้:", err);
        alert("เกิดข้อผิดพลาด ไม่สามารถเพิ่มผู้ใช้ได้");
      } finally {
        setIsAddingUser(false);
      }
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">จัดการสิทธิ์ผู้ใช้งาน</h2>
      <button
        className="flex items-center bg-blue-400 text-white px-4 py-2 rounded-full mb-4 hover:bg-blue-500"
        onClick={() => setIsModalOpen(true)}
      >
        <FaUserPlus className="mr-2" />
        เพิ่มผู้ใช้
      </button>

      {isLoading ? (
        <div>กำลังโหลด...</div>
      ) : (
        <table className="w-full border-collapse border-t border-gray-300 rounded-xl">
          <thead>
            <tr className="text-gray-500 rounded-xl">
              <th className="py-2 text-left">ชื่อผู้ใช้งาน</th>
              <th className="py-2 text-left">อีเมล</th>
              <th className="py-2 text-left">ภาควิชา</th>
              <th className="py-2 text-left">บทบาท</th>
              {/* <th className="py-2 text-left">สถานะ</th> */}
              <th className="py-2 text-left">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-300">
                <td className="py-2">{user.user_name}</td>
                <td className="py-2">{user.user_email}</td>
                <td className="py-2">{user.department_name}</td>
                <td className="py-2">
                  {editingId === user.user_id ? ( 
                    <select
                      onChange={(e) => setTempRole({ ...tempRole, [user.user_id]: e.target.value })} 
                      className="border p-1 rounded-md"
                    >
                      {roles.map(role => ( 
                        <option key={role.role_id} value={role.role_id} selected={role.role_id === user.role_id}> 
                          {role.role_name}
                        </option>
                      ))}
                    </select> 
                  ) : ( 
                    user.role_name
                  )}
                </td>

                {/* <td className="py-2">
                  <button
                    onClick={() => toggleStatus(user.user_id)}
                    className={`px-3 py-1 rounded-xl text-white ${user.status === "active" ? "bg-green-500" : "bg-gray-400"}`}
                  >
                    {user.status === "active" ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                  </button>
                </td> */}
                
                <td className="py-2 flex space-x-2">
                  {editingId === user.user_id ? (
                    <>
                      <button
                        onClick={() => handleSave(user.user_id)} // บันทึกการเปลี่ยนแปลง
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                      >
                        <FaSave />
                      </button>
                      <button
                          onClick={() => handleCancelEdit(user.role_name)}
                          className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                        >
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(user.user_id);
                          setTempRole({ ...tempRole, [user.user_id]: user.role_id });
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                      >
                        <FaEdit />
                      </button>
                  )}
                  <button
                    onClick={() => handleDelete(user.user_id)} // ลบผู้ใช้
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className="fixed top-0 left-0 z-10 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center rounded-xl">
          <div className="bg-white p-6 rounded-xl shadow-md w-1/2">
            <h3 className="text-lg font-semibold mb-4">เพิ่มผู้ใช้งานใหม่</h3>
            <input
              type="text"
              className="w-full border p-2 rounded-xl mb-4"
              placeholder="ชื่อผู้ใช้งาน"
              value={newUser.user_name}
              onChange={(e) => setNewUser({ ...newUser, user_name: e.target.value })}
            />
            <input
              type="email"
              className="w-full border p-2 rounded-xl mb-4"
              placeholder="อีเมล"
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
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-xl"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleAddUser}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                disabled={isAddingUser}
              >
                {isAddingUser ? "กำลังเพิ่ม..." : "เพิ่มผู้ใช้งาน"}
              </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Permissions;