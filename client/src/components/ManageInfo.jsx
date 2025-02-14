import React, { useState } from "react";
import { FaPlus, FaEdit, FaSave, FaTrash, FaTimes } from "react-icons/fa";


const initialData = [
  { id: "1", department: "วิศวกรรมศาสตร์", field: "วิศวกรรมคอมพิวเตอร์", curriculum: "หลักสูตรปริญญาตรี" },
  { id: "2", department: "บริหารธุรกิจ", field: "การตลาด", curriculum: "หลักสูตรปริญญาโท" },
];

const ManageInfo = () => {
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [tempData, setTempData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({ department: "", field: "", curriculum: "" });

  const handleEdit = (id, item) => {
    setEditingId(id);
    setTempData({ ...item });
  };

  const handleSave = (id) => {
    setData(data.map(item => (item.id === id ? tempData : item)));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("คุณต้องการลบข้อมูลนี้หรือไม่?")) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const handleAddEntry = () => {
    if (newEntry.department && newEntry.field && newEntry.curriculum) {
      setData([...data, { id: Date.now().toString(), ...newEntry }]);
      setIsModalOpen(false);
      setNewEntry({ department: "", field: "", curriculum: "" });
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  return (
   
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">เพิ่มข้อมูลทั่วไป</h2>

        <button 
          className="flex items-center bg-blue-400 text-white px-4 py-2 rounded-full mb-4 hover:bg-blue-500"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className="mr-2" />
          เพิ่มข้อมูล
        </button>

        <table className="w-full border-collapse border-t border-gray-300">
          <thead>
            <tr className="text-gray-500">
              <th className="py-2 text-left">ภาควิชา</th>
              <th className="py-2 text-left">สาขาวิชา</th>
              <th className="py-2 text-left">หลักสูตร</th>
              <th className="py-2 text-left">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t border-gray-300">
                <td className="py-2">{editingId === item.id ? (
                  <input
                    type="text"
                    value={tempData.department}
                    onChange={(e) => setTempData({ ...tempData, department: e.target.value })}
                    className="border p-1 rounded"
                  />
                ) : (
                  item.department
                )}</td>
                <td className="py-2">{editingId === item.id ? (
                  <input
                    type="text"
                    value={tempData.field}
                    onChange={(e) => setTempData({ ...tempData, field: e.target.value })}
                    className="border p-1 rounded"
                  />
                ) : (
                  item.field
                )}</td>
                <td className="py-2">{editingId === item.id ? (
                  <input
                    type="text"
                    value={tempData.curriculum}
                    onChange={(e) => setTempData({ ...tempData, curriculum: e.target.value })}
                    className="border p-1 rounded"
                  />
                ) : (
                  item.curriculum
                )}</td>
                <td className="py-2 flex space-x-2">
                  {editingId === item.id ? (
                    <button 
                      onClick={() => handleSave(item.id)} 
                      className="bg-blue-500 text-white px-3 py-1 rounded-xl hover:bg-blue-600 flex items-center"
                    >
                      <FaSave className="mr-1" /> บันทึก
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleEdit(item.id, item)} 
                      className="bg-yellow-500 text-white px-3 py-1 rounded-xl hover:bg-yellow-600 flex items-center"
                    >
                      <FaEdit className="mr-1" /> แก้ไข
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(item.id)} 
                    className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600 flex items-center"
                  >
                    <FaTrash className="mr-1" /> ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96">
              <h3 className="text-lg font-semibold mb-4">เพิ่มข้อมูล</h3>
              <input
                type="text"
                placeholder="ภาควิชา"
                className="w-full border p-2 rounded-xl mb-2"
                value={newEntry.department}
                onChange={(e) => setNewEntry({ ...newEntry, department: e.target.value })}
              />
              <input
                type="text"
                placeholder="สาขาวิชา"
                className="w-full border p-2 rounded-xl mb-2"
                value={newEntry.field}
                onChange={(e) => setNewEntry({ ...newEntry, field: e.target.value })}
              />
              <input
                type="text"
                placeholder="หลักสูตร"
                className="w-full border p-2 rounded-xl mb-4"
                value={newEntry.curriculum}
                onChange={(e) => setNewEntry({ ...newEntry, curriculum: e.target.value })}
              />
              <div className="flex justify-between">
                <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded-xl">
                  ✖ ยกเลิก
                </button>
                <button onClick={handleAddEntry} className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
   
  );
};

export default ManageInfo;
