// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const AssetInfoSection = () => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [newSubasset, setNewSubasset] = useState("");
//   const [newType, setNewType] = useState("");
//   const [newDetail, setNewDetail] = useState("");
//   const [newPrice, setNewPrice] = useState("");
//   const [newQuantity, setNewQuantity] = useState("");
//   const [newUnit, setNewUnit] = useState("");
//   const [newStatus, setNewStatus] = useState("");
//   const [data, setData] = useState([
//     {
//       id: 1,
//       subasset: "คีย์บอร์ด",
//       type: "อุปกรณ์อิเล็กทรอนิกส์",
//       detail: "-",
//       price: 500,
//       quantity: 50,
//       unit: "ตัว",
//       status: "ใช้งานได้",
//     },
//   ]);

//   const handleButtonClick = () => {
//     setIsPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//   };

//   const handleSave = () => {
//     if (!newSubasset || !newType || !newPrice || !newQuantity || !newUnit || !newStatus) {
//       alert("กรุณากรอกข้อมูลให้ครบถ้วน");
//       return;
//     }

//     const newAsset = {
//       id: data.length + 1,
//       subasset: newSubasset,
//       type: newType,
//       detail: newDetail,
//       price: parseFloat(newPrice),
//       quantity: parseInt(newQuantity),
//       unit: newUnit,
//       status: newStatus,
//     };
//     setData([...data, newAsset]);
//     setIsPopupOpen(false); // Close the popup
//     resetForm(); // Reset form fields
//   };

//   const handleDelete = (id) => {
//     setData(data.filter((item) => item.id !== id));
//   };

//   const resetForm = () => {
//     setNewSubasset("");
//     setNewType("");
//     setNewDetail("");
//     setNewPrice("");
//     setNewQuantity("");
//     setNewUnit("");
//     setNewStatus("");
//   };

//   return (
//     <div className="bg-white mt-4 p-4 rounded-md shadow-md overflow-x-auto">
//       <h3 className="text-lg font-bold text-gray-700 mb-4">ข้อมูลพัสดุย่อย</h3>
//       <div className="flex justify-between items-center mb-6">
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-700"
//           onClick={handleButtonClick}
//         >
//           + เพิ่ม
//         </button>
//       </div>

//       {isPopupOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-md shadow-md w-1/2">
//             <h3 className="text-lg font-bold text-gray-700 mb-4">ข้อมูลพัสดุย่อย</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-700 text-sm mb-2">รายการพัสดุย่อย</label>
//                 <input
//                   type="text"
//                   className="w-full border-2 border-blue-100 rounded-xl p-2"
//                   placeholder="รายการพัสดุย่อย"
//                   value={newSubasset}
//                   onChange={(e) => setNewSubasset(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 text-sm mb-2">ประเภท</label>
//                 <select
//                   className="w-full border-2 border-blue-100 rounded-xl p-2"
//                   value={newType}
//                   onChange={(e) => setNewType(e.target.value)}
//                 >
//                   <option>อุปกรณ์อิเล็กทรอนิกส์</option>
//                   <option>เครื่องมือ</option>
//                   <option>วัสดุสำนักงาน</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-gray-700 text-sm mb-2">รายละเอียด</label>
//                 <input
//                   type="text"
//                   className="w-full border-2 border-blue-100 rounded-xl p-2"
//                   value={newDetail}
//                   onChange={(e) => setNewDetail(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 text-sm mb-2">ราคาต่อหน่วย</label>
//                 <input
//                   type="number"
//                   className="w-full border-2 border-blue-100 rounded-xl p-2"
//                   value={newPrice}
//                   onChange={(e) => setNewPrice(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 text-sm mb-2">จำนวน</label>
//                 <input
//                   type="number"
//                   className="w-full border-2 border-blue-100 rounded-xl p-2"
//                   value={newQuantity}
//                   onChange={(e) => setNewQuantity(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 text-sm mb-2">หน่วยนับ</label>
//                 <select
//                   className="w-full border-2 border-blue-100 rounded-xl p-2"
//                   value={newUnit}
//                   onChange={(e) => setNewUnit(e.target.value)}
//                 >
//                   <option>เครื่อง</option>
//                   <option>เตียง</option>
//                   <option>แผ่น</option>
//                   <option>โหล</option>
//                   <option>ใบ</option>
//                   <option>คัน</option>
//                   <option>ขด</option>
//                   <option>ชุด</option>
//                   <option>ตัว</option>
//                   <option>ตู้</option>
//                   <option>บาน</option>
//                   <option>ผืน</option>
//                   <option>ระบบ</option>
//                   <option>หลัง</option>

  
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-gray-700 text-sm mb-2">การใช้งาน</label>
//                 <select
//                   className="w-full border-2 border-blue-100 rounded-xl p-2"
//                   value={newStatus}
//                   onChange={(e) => setNewStatus(e.target.value)}
//                 >
//                   <option>ใช้งานได้</option>
//                   <option>เสียหาย</option>
//                 </select>
//               </div>
//               <div className="flex justify-end mt-4">
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-700 mr-2"
//                   onClick={handleClosePopup}
//                 >
//                   ยกเลิก
//                 </button>
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
//                   onClick={handleSave}
//                 >
//                   บันทึก
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <table className="table-auto w-full border-collapse text-sm">
//         <thead>
//           <tr className="bg-gray-200 text-gray-700">
//             <th className="border px-4 py-2">รายการพัสดุย่อย</th>
//             <th className="border px-4 py-2">ประเภท</th>
//             <th className="border px-4 py-2">รายละเอียด</th>
//             <th className="border px-4 py-2">ราคาต่อหน่วย</th>
//             <th className="border px-4 py-2">จำนวน</th>
//             <th className="border px-4 py-2">หน่วยนับ</th>
//             <th className="border px-4 py-2">การใช้งาน</th>
//             <th className="border px-4 py-2">จัดการ</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item) => (
//             <tr key={item.id} className="text-center">
//               <td className="border px-4 py-2">{item.subasset}</td>
//               <td className="border px-4 py-2">{item.type}</td>
//               <td className="border px-4 py-2">{item.detail}</td>
//               <td className="border px-4 py-2">{item.price.toFixed(2)}</td>
//               <td className="border px-4 py-2">{item.quantity}</td>
//               <td className="border px-4 py-2">{item.unit}</td>
//               <td className="border px-4 py-2">{item.status}</td>
//               <td className="border px-4 py-2 flex justify-center space-x-2">
//                 <button className="text-blue-500 hover:text-blue-700 bg-gray-200 rounded-lg px-3 py-1">
//                   <Link to="/show-info">ดู</Link>
//                 </button>
//                 <button className="text-yellow-500 hover:text-yellow-700 bg-gray-200 rounded-lg px-3 py-1">
//                   <Link to="/add-asset">แก้ไข</Link>
//                 </button>
//                 <button
//                   className="text-red-500 hover:text-red-700 bg-gray-200 rounded-lg px-3 py-1"
//                   onClick={() => handleDelete(item.id)}
//                 >
//                   ลบ
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AssetInfoSection;


import React, { useState } from "react";
import { Link } from "react-router-dom";

const AssetInfoSection = ({ value, onChange }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newSubasset, setNewSubasset] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newUnit, setNewUnit] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(false); // สถานะการโหลด
  const [data, setData] = useState([
    {
      id: 1,
      subasset: "คีย์บอร์ด",
      detail: "-",
      price: 500,
      quantity: 50,
      unit: "ตัว",
      status: "ใช้งานได้",
    },
  ]);

  const [editMode, setEditMode] = useState(false); // ฟังก์ชันการแก้ไข

  const [editId, setEditId] = useState(null); // ใช้เก็บ ID ของพัสดุที่จะถูกแก้ไข

  // ฟังก์ชันเปิด Popup สำหรับเพิ่มหรือแก้ไข
  const handleButtonClick = (item = null) => {
    resetForm(); // รีเซ็ตฟอร์มก่อนเปิด popup
    setEditMode(!!item); // ถ้ามี item หมายถึงการแก้ไข
    if (item) {
      setEditId(item.id);
      setNewSubasset(item.subasset);
      setNewDetail(item.detail);
      setNewPrice(item.price.toString());
      setNewQuantity(item.quantity.toString());
      setNewUnit(item.unit);
      setNewStatus(item.status);
    }
    setIsPopupOpen(true);
  };

  // ฟังก์ชันปิด Popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setEditMode(false); // รีเซ็ต editMode เมื่อปิด popup
  };

  // ฟังก์ชันบันทึกข้อมูล
  const handleSave = async () => {
    if (!newSubasset || !newDetail || !newPrice || !newQuantity || !newUnit || !newStatus) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setLoading(true); // เริ่มโหลด

    const newAsset = {
      id: editMode ? editId : data.length + 1,
      subasset: newSubasset,
      detail: newDetail,
      price: parseFloat(newPrice),
      quantity: parseInt(newQuantity),
      unit: newUnit,
      status: newStatus,
    };

    // จำลองการบันทึก (รอการโหลด)
    setTimeout(() => {
      if (editMode) {
        setData(data.map(item => (item.id === editId ? newAsset : item)));
      } else {
        setData([...data, newAsset]);
      }
      setIsPopupOpen(false); // ปิด popup
      resetForm(); // รีเซ็ตฟอร์ม
      setLoading(false); // จบการโหลด
    }, 500);
  };

  // ฟังก์ชันลบข้อมูล
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  // ฟังก์ชันรีเซ็ตฟอร์ม
  const resetForm = () => {
    setNewSubasset("");
    setNewDetail("");
    setNewPrice("");
    setNewQuantity("");
    setNewUnit("");
    setNewStatus("");
  };

  // ฟังก์ชันสำหรับแปลงราคากลับเป็นรูปแบบสกุลเงิน
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(amount);
  };

  return (
    <div className="bg-white mt-4 p-4 rounded-md shadow-md overflow-x-auto">
      <h3 className="text-lg font-bold text-gray-700 mb-4">ข้อมูลพัสดุย่อย</h3>
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-700"
          onClick={() => handleButtonClick()} // เปิด popup สำหรับเพิ่ม
        >
          + เพิ่ม
        </button>
      </div>

      {isPopupOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClosePopup} // ปิด popup เมื่อคลิกข้างนอก
        >
          <div
            className="bg-white p-6 rounded-md shadow-md w-1/2"
            onClick={(e) => e.stopPropagation()} // หยุดการคลิกจากด้านใน
          >
            <h3 className="text-lg font-bold text-gray-700 mb-4">{editMode ? "แก้ไขข้อมูลพัสดุย่อย" : "ข้อมูลพัสดุย่อย"}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-2">รายการพัสดุย่อย</label>
                <input
                  type="text"
                  className="w-full border-2 border-blue-100 rounded-xl p-2"
                  placeholder="รายการพัสดุย่อย"
                  value={newSubasset}
                  onChange={(e) => setNewSubasset(e.target.value)}
                />
              </div>
            
              <div>
                <label className="block text-gray-700 text-sm mb-2">รายละเอียด</label>
                <input
                  type="text"
                  className="w-full border-2 border-blue-100 rounded-xl p-2"
                  value={newDetail}
                  onChange={(e) => setNewDetail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2">ราคาต่อหน่วย</label>
                <input
                  type="number"
                  className="w-full border-2 border-blue-100 rounded-xl p-2"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2">จำนวน</label>
                <input
                  type="number"
                  className="w-full border-2 border-blue-100 rounded-xl p-2"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2">หน่วยนับ</label>
                <select
                  className="w-full border-2 border-blue-100 rounded-xl p-2"
                  value={newUnit}
                  onChange={(e) => setNewUnit(e.target.value)}
                >
                  <option value="">-- กรุณาเลือก --</option>
                  <option>เครื่อง</option>
                  <option>เตียง</option>
                  <option>แผ่น</option>
                  <option>โหล</option>
                  <option>ใบ</option>
                  <option>คัน</option>
                  <option>ขด</option>
                  <option>ชุด</option>
                  <option>ตัว</option>
                  <option>ตู้</option>
                  <option>บาน</option>
                  <option>ผืน</option>
                  <option>ระบบ</option>
                  <option>หลัง</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2">การใช้งาน</label>
                <select
                  className="w-full border-2 border-blue-100 rounded-xl p-2"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="">-- กรุณาเลือก --</option>
                  <option>ใช้งาน</option>
                  <option>ส่งซ่อม</option>
                  <option>ชำรุด</option>
                  <option>บริจาค/โอน</option>
                  <option>รับโอน</option>
                  <option>จำหน่าย</option>
                </select>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-700 mr-2"
                  onClick={handleClosePopup}
                >
                  ยกเลิก
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
                  onClick={handleSave}
                  disabled={loading} // ปิดปุ่มเมื่อกำลังบันทึก
                >
                  {loading ? "กำลังบันทึก..." : "บันทึก"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <table className="table-auto w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border px-4 py-2">รายการพัสดุย่อย</th>
            <th className="border px-4 py-2">รายละเอียด</th>
            <th className="border px-4 py-2">ราคาต่อหน่วย</th>
            <th className="border px-4 py-2">จำนวน</th>
            <th className="border px-4 py-2">หน่วยนับ</th>
            <th className="border px-4 py-2">การใช้งาน</th>
            <th className="border px-4 py-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-gray-700">
              <td className="border px-4 py-2">{item.subasset}</td>
              <td className="border px-4 py-2">{item.detail}</td>
              <td className="border px-4 py-2">{formatCurrency(item.price)}</td>
              <td className="border px-4 py-2">{item.quantity}</td>
              <td className="border px-4 py-2">{item.unit}</td>
              <td className="border px-4 py-2">{item.status}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-700"
                  onClick={() => handleButtonClick(item)} // เปิด popup สำหรับแก้ไข
                >
                  แก้ไข
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-700 ml-2"
                  onClick={() => handleDelete(item.id)}
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetInfoSection;
