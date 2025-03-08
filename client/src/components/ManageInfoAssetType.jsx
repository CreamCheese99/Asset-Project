import React, { useState } from "react";
import { FaPlus, FaEdit, FaSave, FaTrash } from "react-icons/fa";

const initialData = [
  { id: "1", assetType: "เครื่องใช้สำนักงาน" },
  { id: "2", assetType: "อุปกรณ์อิเล็กทรอนิกส์" },
];

const ManageAssetTypes = () => {
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [tempData, setTempData] = useState({ assetType: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (id, item) => {
    setEditingId(id);
    setTempData({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      setData(data.map((item) => (item.id === editingId ? tempData : item)));
    } else {
      setData([...data, { id: Date.now().toString(), ...tempData }]);
    }

    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("คุณต้องการลบประเภทสินทรัพย์นี้หรือไม่?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4  mt-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">ประเภทสินทรัพย์</h2>
      
      <button 
        className="flex items-center bg-blue-400 text-white px-4 py-2 rounded-full mb-4 hover:bg-blue-500"
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus className="mr-2" />
        เพิ่ม
      </button>
      
      <table className="w-full border-collapse border-t border-gray-300">
        <thead>
          <tr className="text-gray-500">
            <th className="py-2 text-left">ประเภทสินทรัพย์</th>
            <th className="py-2 text-left">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t border-gray-300">
              <td className="py-2">{item.assetType}</td>
              <td className="py-2 flex space-x-2">
                <button 
                  onClick={() => handleEdit(item.id, item)} 
                  className="bg-yellow-500 text-white px-3 py-1 rounded-xl hover:bg-yellow-600 flex items-center"
                >
                  <FaEdit className="mr-1" /> แก้ไข
                </button>
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

      {/* Modal สำหรับเพิ่ม/แก้ไขประเภทสินทรัพย์ */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">{editingId ? "แก้ไขประเภทสินทรัพย์" : "เพิ่มประเภทสินทรัพย์"}</h3>
            <input
              type="text"
              placeholder="ประเภทสินทรัพย์"
              className="w-full border p-2 rounded-xl mb-2"
              value={tempData.assetType}
              onChange={(e) => setTempData({ ...tempData, assetType: e.target.value })}
            />
            <div className="flex justify-between mt-4">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded-xl">
                ✖ ยกเลิก
              </button>
              <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAssetTypes;
