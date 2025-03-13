// // **********************หน้าการเพิ่มข้อมูลภาควิชา เเละประเภทสินทรัพย์******************************

// import React, { useState } from "react";
// import { FaPlus, FaEdit, FaSave, FaTrash } from "react-icons/fa";

// const initialData = [
//   { id: "1", department: "วิศวกรรมศาสตร์", curricula: ["หลักสูตรปริญญาตรี"] },
//   { id: "2", department: "บริหารธุรกิจ", curricula: ["หลักสูตรปริญญาโท"] },
// ];

// const ManageInfo = () => {
//   const [data, setData] = useState(initialData);
//   const [editingId, setEditingId] = useState(null);
//   const [tempData, setTempData] = useState({ department: "", curricula: [""] });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isCurriculumPopupOpen, setIsCurriculumPopupOpen] = useState(false);
//   const [newCurriculum, setNewCurriculum] = useState(""); // สำหรับเก็บค่าหลักสูตรใหม่ที่กรอกใน popup

//   const handleEdit = (id, item) => {
//     setEditingId(id);
//     setTempData({ ...item, curricula: [...item.curricula] });
//     setIsModalOpen(true); // เปิด modal เมื่อทำการแก้ไข
//   };

//   const handleSave = () => {
//     // ถ้ากำลังแก้ไขข้อมูล จะทำการอัปเดตข้อมูลใน data
//     if (editingId) {
//       setData(data.map(item => (item.id === editingId ? tempData : item)));
//     } else {
//       // ถ้ากำลังเพิ่มข้อมูลใหม่ จะเพิ่มข้อมูลใหม่ลงใน data
//       setData([...data, { id: Date.now().toString(), ...tempData }]);
//     }

//     setEditingId(null);
//     setIsModalOpen(false); // ปิด modal หลังจากบันทึก
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("คุณต้องการลบภาควิชานี้หรือไม่?")) {
//       setData(data.filter(item => item.id !== id));
//     }
//   };

//   const handleAddCurriculum = () => {
//     // ตรวจสอบว่าหลักสูตรใหม่ไม่เป็นค่าว่าง
//     if (newCurriculum.trim()) {
//       setTempData({
//         ...tempData,
//         curricula: [...tempData.curricula, newCurriculum], // เพิ่มหลักสูตรใหม่เข้าไปในภาควิชา
//       });
//       setNewCurriculum(""); // เคลียร์ค่าใน input หลังจากเพิ่ม
//       setIsCurriculumPopupOpen(false); // ปิด popup หลังจากเพิ่มหลักสูตร
//     } else {
//       alert("กรุณากรอกหลักสูตรให้ครบถ้วน");
//     }
//   };

//   const handleAddEntry = () => {
//     if (tempData.department.trim() && tempData.curricula.some(c => c.trim())) {
//       setData([...data, { id: Date.now().toString(), ...tempData }]);
//       setIsModalOpen(false);
//       setTempData({ department: "", curricula: [""] });
//     } else {
//       alert("กรุณากรอกข้อมูลให้ครบถ้วน");
//     }
//   };


//   return (
//     <div className="container mx-auto p-4 mt-4  bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-gray-700">ข้อมูลภาควิชา</h2>
      
//       <button 
//         className="flex items-center bg-blue-400 text-white px-4 py-2 rounded-full mb-4 hover:bg-blue-500"
//         onClick={() => setIsModalOpen(true)}
//       >
//         <FaPlus className="mr-2" />
//         เพิ่ม
//       </button>
      
//       <table className="w-full border-collapse border-t border-gray-300">
//         <thead>
//           <tr className="text-gray-500">
//             <th className="py-2 text-left">ภาควิชา</th>
//             <th className="py-2 text-left">หลักสูตร</th>
//             <th className="py-2 text-left">จัดการ</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item) => (
//             <tr key={item.id} className="border-t border-gray-300">
//               <td className="py-2">{item.department}</td>
//               <td className="py-2">
//                 {item.curricula.map((cur, index) => (
//                   <div key={index}>{cur}</div>
//                 ))}
//               </td>
//               <td className="py-2 flex space-x-2">
//                 <button 
//                   onClick={() => handleEdit(item.id, item)} 
//                   className="bg-yellow-500 text-white px-3 py-1 rounded-xl hover:bg-yellow-600 flex items-center"
//                 >
//                   <FaEdit className="mr-1" /> แก้ไข
//                 </button>
//                 <button 
//                   onClick={() => handleDelete(item.id)} 
//                   className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600 flex items-center"
//                 >
//                   <FaTrash className="mr-1" /> ลบ
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal สำหรับเพิ่มภาควิชาและหลักสูตร */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-96">
//             <h3 className="text-lg font-semibold mb-4">{editingId ? "แก้ไขภาควิชา" : "เพิ่มภาควิชา"}</h3>
//             <input
//               type="text"
//               placeholder="ภาควิชา"
//               className="w-full border p-2 rounded-xl mb-2"
//               value={tempData.department}
//               onChange={(e) => setTempData({ ...tempData, department: e.target.value })}
//             />
//             {tempData.curricula.map((cur, index) => (
//               <div key={index} className="flex items-center">
//                 <input
//                   type="text"
//                   placeholder="หลักสูตร"
//                   className="w-full border p-2 rounded-xl mb-2"
//                   value={cur}
//                   onChange={(e) => {
//                     const updatedCurricula = [...tempData.curricula];
//                     updatedCurricula[index] = e.target.value;
//                     setTempData({ ...tempData, curricula: updatedCurricula });
//                   }}
//                 />
//               </div>
//             ))}
//             <button onClick={() => setIsCurriculumPopupOpen(true)} className="text-blue-500">
//               + เพิ่มหลักสูตร
//             </button>
//             <div className="flex justify-between mt-4">
//               <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded-xl">
//                 ✖ ยกเลิก
//               </button>
//               <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
//                 บันทึก
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Popup สำหรับกรอกหลักสูตร */}
//       {isCurriculumPopupOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-96">
//             <h3 className="text-lg font-semibold mb-4">กรอกรายละเอียดหลักสูตร</h3>
//             <input
//               type="text"
//               placeholder="กรุณากรอกหลักสูตร"
//               className="w-full border p-2 rounded-xl mb-2"
//               value={newCurriculum}
//               onChange={(e) => setNewCurriculum(e.target.value)}
//             />
//             <div className="flex justify-between mt-4">
//               <button onClick={() => setIsCurriculumPopupOpen(false)} className="bg-gray-300 px-4 py-2 rounded-xl">
//                 ✖ ยกเลิก
//               </button>
//               <button onClick={handleAddCurriculum} className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
//                 เพิ่ม
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageInfo;

import { FaPlus, FaEdit, FaSave, FaTrash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageInfo = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [tempData, setTempData] = useState({ department_name: "", curriculum: [""] });

  useEffect(() => {
    axios
      .get("http://localhost:5000/department")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (id, item) => {
    setEditingId(id);
    setTempData({ ...item, curriculum: [...item.curriculum] });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      axios
        .put(`http://localhost:5000/department/${editingId}`, tempData)
        .then(() => {
          setData(data.map((item) => (item.department_id === editingId ? tempData : item)));
          setIsModalOpen(false);
        })
        .catch((error) => console.error("Error updating data:", error));
    } else {
      axios
        .post("http://localhost:5000/department", tempData)
        .then((response) => {
          setData([...data, response.data]);
          setIsModalOpen(false);
        })
        .catch((error) => console.error("Error adding data:", error));
    }
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("คุณต้องการลบภาควิชานี้หรือไม่?")) {
      axios
        .delete(`http://localhost:5000/department/${id}`)
        .then(() => setData(data.filter((item) => item.department_id !== id)))
        .catch((error) => console.error("Error deleting data:", error));
    }
  };

  const handleCurriculumChange = (index, value) => {
    const updatedCurriculum = [...tempData.curriculum];
    updatedCurriculum[index] = value;
    setTempData({ ...tempData, curriculum: updatedCurriculum });
  };

  const handleAddCurriculum = () => {
    setTempData({ ...tempData, curriculum: [...tempData.curriculum, ""] });
  };

  const handleRemoveCurriculum = (index) => {
    const updatedCurriculum = tempData.curriculum.filter((_, i) => i !== index);
    setTempData({ ...tempData, curriculum: updatedCurriculum });
  };

  return (
    <div className="container mx-auto p-6 mt-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">ข้อมูลภาควิชา</h2>

      <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full mb-4 hover:bg-blue-600" onClick={() => setIsModalOpen(true)}>
        <FaPlus className="mr-2" /> เพิ่ม
      </button>

      <table className="w-full border-collapse border-t border-gray-300">
        <thead>
          <tr className="text-gray-600 bg-gray-100">
            <th className="py-2 px-4 text-left">ภาควิชา</th>
            <th className="py-2 px-4 text-left">หลักสูตร</th>
            <th className="py-2 px-4 text-left">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.department_id} className="border-t border-gray-300">
              <td className="py-2 px-4">{item.department_name}</td>
              <td className="py-2 px-4">
                {item.curriculum.map((cur, index) => (
                  <div key={index} className="bg-gray-200 p-1 rounded-lg inline-block mr-2">{cur}</div>
                ))}
              </td>
              <td className="py-2 px-4 flex space-x-2">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600 flex items-center" onClick={() => handleEdit(item.department_id, item)}>
                  <FaEdit className="mr-1" /> แก้ไข
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 flex items-center" onClick={() => handleDelete(item.department_id)}>
                  <FaTrash className="mr-1" /> ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-lg font-semibold mb-4">{editingId ? "แก้ไขภาควิชา" : "เพิ่มภาควิชา"}</h3>

            <input type="text" placeholder="ภาควิชา" className="w-full border p-2 rounded-full mb-2" value={tempData.department_name} onChange={(e) => setTempData({ ...tempData, department_name: e.target.value })} />

            {tempData.curriculum.map((cur, index) => (
              <div key={index} className="flex items-center mb-2">
                <input type="text" placeholder="หลักสูตร" className="w-full border p-2 rounded-full" value={cur} onChange={(e) => handleCurriculumChange(index, e.target.value)} />
                <button className="ml-2 text-red-500" onClick={() => handleRemoveCurriculum(index)}>×</button>
              </div>
            ))}

            <button onClick={handleAddCurriculum} className="text-blue-500">+ เพิ่มหลักสูตร</button>
            <div className="flex justify-between mt-4">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded-full">ยกเลิก</button>
              {/* <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">บันทึก</button> */}
              
              <button 
                onClick={handleSave} 
                className={`px-4 py-2 rounded-full text-white ${
                  tempData.department_name.trim() && tempData.curriculum.some(cur => cur.trim()) 
                    ? "bg-blue-500 hover:bg-blue-600" 
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!tempData.department_name.trim() || !tempData.curriculum.some(cur => cur.trim())}
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
