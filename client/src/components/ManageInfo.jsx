import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import API from "../API";

const ManageInfo = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [tempData, setTempData] = useState({ department_name: "", curriculum: [""] });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await API.get("/department-curriculum");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (id, item) => {
    setEditingId(id);
    setTempData({ ...item, curriculum: [...item.curriculum] });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("คุณต้องการลบภาควิชาและหลักสูตรนี้หรือไม่?")) {
      try {
        await API.delete(`/department/${id}`);
        setData(data.filter((item) => item.department_id !== id));
      } catch (error) {
        console.error("Error deleting department:", error);
      }
    }
  };

  // const handleSave = async () => {
  //   try {
  //     if (editingId) {
  //       await API.put(`http://localhost:5000/department/${editingId}`, tempData);
  //     } else {
  //       await API.post("http://localhost:5000/department", tempData);
  //     }
  //     fetchData(); // โหลดข้อมูลใหม่หลังการเพิ่ม/แก้ไข
  //     setIsModalOpen(false);
  //     setEditingId(null);
  //   } catch (error) {
  //     console.error("Error saving data:", error);
  //   }
  // };
  const handleSave = async () => {
    const trimmedCurriculum = tempData.curriculum
      .map((cur) => cur.trim())
      .filter((cur) => cur !== ""); // ลบหลักสูตรที่ว่างออก
  
    if (!tempData.department_name.trim()) {
      alert("กรุณากรอกชื่อภาควิชา");
      return;
    }
  
    if (trimmedCurriculum.length === 0) {
      alert("กรุณากรอกอย่างน้อยหนึ่งหลักสูตร");
      return;
    }
  
    const cleanData = {
      department_name: tempData.department_name.trim(),
      curriculum: trimmedCurriculum,
    };
  
    try {
      if (editingId) {
        await API.put(`/department/${editingId}`, cleanData);
      } else {
        await API.post("/department", cleanData);
      }
      fetchData();
      setIsModalOpen(false);
      setEditingId(null);
      setTempData({ department_name: "", curriculum: [""] });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  
  
  return (
    <div className="container mx-auto p-4 mt-4 bg-white rounded-lg shadow-lg max-w-7xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-left">ข้อมูลภาควิชา</h2>

      <button
        className="flex items-center bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 shadow-md"
        onClick={() => {
          setEditingId(null);
          setTempData({ department_name: "", curriculum: [""] });
          setIsModalOpen(true);
        }}
      >
        <FaPlus className="mr-2" /> เพิ่ม
      </button>

      <div className="overflow-x-auto">
        <table className="w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr className="text-gray-600 bg-gray-100">
              <th className="py-2 px-4 text-left">ภาควิชา/หน่วนงาน</th>
              <th className="py-2 px-4 text-left">หลักสูตร/งาน</th>
              <th className="py-2 px-4 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.department_id} className="border-t border-gray-300">
                <td className="py-2 px-4">{item.department_name}</td>
                <td className="py-2 px-4 flex flex-wrap gap-2">
                  {item.curriculum.map((cur, index) => (
                    <span key={index} className="bg-gray-200 p-1 rounded-lg text-sm">{cur}</span>
                  ))}
                </td>
                <td className="py-2 px-4 text-center">
                  <div className="inline-flex space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 shadow-md flex items-center"
                      onClick={() => handleEdit(item.department_id, item)}
                    >
                      <FaEdit className="mr-1" /> 
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 shadow-md flex items-center"
                      onClick={() => handleDelete(item.department_id)}
                    >
                      <FaTrash className="mr-1" /> 
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-center">
              {editingId ? "แก้ไขภาควิชา" : "เพิ่มภาควิชา"}
            </h3>

            <input
              type="text"
              placeholder="ภาควิชา"
              className="w-full border p-2 rounded-lg mb-2"
              value={tempData.department_name}
              onChange={(e) => setTempData({ ...tempData, department_name: e.target.value })}
            />

            {tempData.curriculum.map((cur, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="หลักสูตร"
                  className="w-full border p-2 rounded-lg"
                  value={cur}
                  onChange={(e) => {
                    const updatedCurriculum = [...tempData.curriculum];
                    updatedCurriculum[index] = e.target.value;
                    setTempData({ ...tempData, curriculum: updatedCurriculum });
                  }}
                />
                {tempData.curriculum.length > 1 && (
                  <button
                    className="ml-2 text-red-500"
                    onClick={() =>
                      setTempData({
                        ...tempData,
                        curriculum: tempData.curriculum.filter((_, i) => i !== index),
                      })
                    }
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={() =>
                setTempData({
                  ...tempData,
                  curriculum: [...tempData.curriculum, ""],
                })
              }
              className="text-blue-500 mt-2"
              disabled={tempData.curriculum.some((cur) => cur.trim() === "")}
            >
              + เพิ่มหลักสูตร
            </button>

            <div className="flex justify-between mt-4">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-400  rounded-full text-white px-4 py-2 rounded-full hover:bg-red-500">
                ยกเลิก
              </button>

              <button
                onClick={handleSave}
                className={`px-4 py-2 rounded-full text-white transition-all ${
                  !tempData.department_name.trim() || tempData.curriculum.every((cur) => cur.trim() === "")
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={!tempData.department_name.trim() || tempData.curriculum.every((cur) => cur.trim() === "")}
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

export default ManageInfo;
