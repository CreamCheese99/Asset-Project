import React, { useState, useEffect } from "react";
import API from "../API";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const ManageAssetTypes = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [tempData, setTempData] = useState({ assetType: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAssetTypes();
  }, []);

  const fetchAssetTypes = async () => {
    try {
      const response = await API.get("/asset_type");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching asset types:", error);
    }
  };

  const handleEdit = (id, item) => {
    setEditingId(id);
    setTempData({ assetType: item.asset_type_name });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!tempData.assetType.trim()) {
      alert("กรุณากรอกประเภทสินทรัพย์");
      return;
    }
  
    const confirmMsg = editingId
      ? "คุณต้องการแก้ไขข้อมูลประเภทสินทรัพย์นี้หรือไม่?"
      : "คุณต้องการเพิ่มประเภทสินทรัพย์นี้หรือไม่?";
  
    if (!window.confirm(confirmMsg)) {
      return;
    }
  
    try {
      if (editingId) {
        await API.put(`/asset_type/${editingId}`, {
          asset_type_name: tempData.assetType,
        });
      } else {
        await API.post("/asset_type", {
          asset_type_name: tempData.assetType,
        });
      }
      fetchAssetTypes();
    } catch (error) {
      console.error("Error saving asset type:", error);
    }
  
    setEditingId(null);
    setIsModalOpen(false);
    setTempData({ assetType: "" });
  };
  
  const handleDelete = async (id) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบประเภทสินทรัพย์นี้? การลบจะไม่สามารถกู้คืนได้")) {
      try {
        await API.delete(`/asset_type/${id}`);
        fetchAssetTypes();
      } catch (error) {
        console.error("Error deleting asset type:", error);
      }
    }
  };
  

  return (
    <div className="container mx-auto p-4 mt-4 bg-white rounded-lg shadow-lg max-w-7xl"> 
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-left">ประเภทสินทรัพย์</h2>
      <button
        className="flex items-center bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 shadow-md"
        onClick={() => {
          setEditingId(null);
          setTempData({ assetType: "" });
          setIsModalOpen(true);
        }}
      >
        <FaPlus className="mr-2" /> เพิ่ม
      </button>
      
      <table className="w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-2 px-4 text-left">ประเภทสินทรัพย์</th>
            <th className="py-2 px-4 text-left">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.asset_type_id} className="border-t border-gray-300">
              <td className="py-2 px-4">{item.asset_type_name}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(item.asset_type_id, item)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 shadow-md flex items-center"
                >
                  <FaEdit className="mr-1" /> 
                </button>
                <button
                  onClick={() => handleDelete(item.asset_type_id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 shadow-md flex items-center"
                >
                  <FaTrash className="mr-1" /> 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-xl font-semibold mb-4">
              {editingId ? "แก้ไขประเภทสินทรัพย์" : "เพิ่มประเภทสินทรัพย์"}
            </h3>
            <input
              type="text"
              placeholder="ประเภทสินทรัพย์"
              className="w-full border p-3 rounded-full mb-4"
              value={tempData.assetType}
              onChange={(e) => setTempData({ ...tempData, assetType: e.target.value })}
            />
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400  rounded-full text-white px-4 py-2 rounded-full hover:bg-red-500"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSave}
                className={`px-4 py-2 rounded-full text-white ${
                  tempData.assetType.trim() ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!tempData.assetType.trim()}
              >
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
