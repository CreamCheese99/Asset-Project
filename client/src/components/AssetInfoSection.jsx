
// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const AssetInfoSection = ({ value, onChange }) => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [newSubasset, setNewSubasset] = useState("");
//   const [newDetail, setNewDetail] = useState("");
//   const [newPrice, setNewPrice] = useState("");
//   const [newQuantity, setNewQuantity] = useState("");
//   const [newUnit, setNewUnit] = useState("");
//   const [newStatus, setNewStatus] = useState("");
//   const [loading, setLoading] = useState(false); // สถานะการโหลด
//   const [data, setData] = useState([
//     {
//       id: 1,
//       subasset: "คีย์บอร์ด",
//       detail: "-",
//       price: 500,
//       quantity: 50,
//       unit: "ตัว",
//       status: "ใช้งานได้",
//     },
//   ]);

//   const [editMode, setEditMode] = useState(false); // ฟังก์ชันการแก้ไข

//   const [editId, setEditId] = useState(null); // ใช้เก็บ ID ของพัสดุที่จะถูกแก้ไข

//   // ฟังก์ชันเปิด Popup สำหรับเพิ่มหรือแก้ไข
//   const handleButtonClick = (item = null) => {
//     resetForm(); // รีเซ็ตฟอร์มก่อนเปิด popup
//     setEditMode(!!item); // ถ้ามี item หมายถึงการแก้ไข
//     if (item) {
//       setEditId(item.id);
//       setNewSubasset(item.subasset);
//       setNewDetail(item.detail);
//       setNewPrice(item.price.toString());
//       setNewQuantity(item.quantity.toString());
//       setNewUnit(item.unit);
//       setNewStatus(item.status);
//     }
//     setIsPopupOpen(true);
//   };

//   // ฟังก์ชันปิด Popup
//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//     setEditMode(false); // รีเซ็ต editMode เมื่อปิด popup
//   };

//   // ฟังก์ชันบันทึกข้อมูล
//   const handleSave = async () => {
//     if (!newSubasset || !newDetail || !newPrice || !newQuantity || !newUnit || !newStatus) {
//       alert("กรุณากรอกข้อมูลให้ครบถ้วน");
//       return;
//     }

//     setLoading(true); // เริ่มโหลด

//     const subAssetData = {
//       id: editMode ? editId : data.length + 1,
//       subasset: newSubasset,
//       detail: newDetail,
//       price: parseFloat(newPrice),
//       quantity: parseInt(newQuantity),
//       unit: newUnit,
//       status: newStatus,
//     };

//     // จำลองการบันทึก (รอการโหลด)
//     setTimeout(() => {
//       if (editMode) {
//         setData(data.map(item => (item.id === editId ? subAssetData : item)));
//       } else {
//         setData([...data, subAssetData]);
//       }
//       setIsPopupOpen(false); // ปิด popup
//       resetForm(); // รีเซ็ตฟอร์ม
//       setLoading(false); // จบการโหลด
//     }, 500);
//   };

//   // ฟังก์ชันลบข้อมูล
//   const handleDelete = (id) => {
//     setData(data.filter((item) => item.id !== id));
//   };

//   // ฟังก์ชันรีเซ็ตฟอร์ม
//   const resetForm = () => {
//     setNewSubasset("");
//     setNewDetail("");
//     setNewPrice("");
//     setNewQuantity("");
//     setNewUnit("");
//     setNewStatus("");
//   };

//   // ฟังก์ชันสำหรับแปลงราคากลับเป็นรูปแบบสกุลเงิน
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("th-TH", {
//       style: "currency",
//       currency: "THB",
//     }).format(amount);
//   };

//   return (
//     <div className="bg-white mt-4 p-4 rounded-md shadow-md overflow-x-auto">
//       <h3 className="text-lg font-bold text-gray-700 mb-4">ข้อมูลพัสดุย่อย</h3>
//       <div className="flex justify-between items-center mb-6">
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-700"
//           onClick={() => handleButtonClick()} // เปิด popup สำหรับเพิ่ม
//         >
//           + เพิ่ม
//         </button>
//       </div>

//       {isPopupOpen && (
//         <div
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
//           onClick={handleClosePopup} // ปิด popup เมื่อคลิกข้างนอก
//         >
//           <div
//             className="bg-white p-6 rounded-md shadow-md w-1/2"
//             onClick={(e) => e.stopPropagation()} // หยุดการคลิกจากด้านใน
//           >
//             <h3 className="text-lg font-bold text-gray-700 mb-4">{editMode ? "แก้ไขข้อมูลพัสดุย่อย" : "ข้อมูลพัสดุย่อย"}</h3>
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
//                   <option value="">-- กรุณาเลือก --</option>
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
//                   <option value="">-- กรุณาเลือก --</option>
//                   <option>ใช้งาน</option>
//                   <option>ส่งซ่อม</option>
//                   <option>ชำรุด</option>
//                   <option>บริจาค/โอน</option>
//                   <option>รับโอน</option>
//                   <option>จำหน่าย</option>
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
//                   disabled={loading} // ปิดปุ่มเมื่อกำลังบันทึก
//                 >
//                   {loading ? "กำลังบันทึก..." : "บันทึก"}
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
//             <tr key={item.id} className="text-gray-700">
//               <td className="border px-4 py-2">{item.subasset}</td>
//               <td className="border px-4 py-2">{item.detail}</td>
//               <td className="border px-4 py-2">{formatCurrency(item.price)}</td>
//               <td className="border px-4 py-2">{item.quantity}</td>
//               <td className="border px-4 py-2">{item.unit}</td>
//               <td className="border px-4 py-2">{item.status}</td>
//               <td className="border px-4 py-2">
//                 <button
//                   className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-700"
//                   onClick={() => handleButtonClick(item)} // เปิด popup สำหรับแก้ไข
//                 >
//                   แก้ไข
//                 </button>
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-700 ml-2"
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
import axios from "axios";

const AssetInfoSection = ({ value, onChange }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newSubasset, setNewSubasset] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newUnit, setNewUnit] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newTypeSubAsset, setNewTypeSubAsset] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([ ]);


  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // ฟังก์ชันเปิด Popup สำหรับเพิ่มหรือแก้ไข
  const handleButtonClick = (item = null) => {
    resetForm();
    setEditMode(!!item);
    if (item) {
      setEditId(item.id);
      setNewSubasset(item.sub_asset_name);
      setNewDetail(item.details);
      setNewPrice(item.unit_price.toString());
      setNewQuantity(item.quantity.toString());
      setNewUnit(item.counting_unit);
      setNewStatus(item.status);
      setNewNote(item.note);
      setNewTypeSubAsset(item.type_sub_asset)
    }
    setIsPopupOpen(true);
  };

  // ฟังก์ชันปิด Popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setEditMode(false);
  };

  // ฟังก์ชันบันทึกข้อมูล
  const handleSave = async () => {
    if (!newSubasset || !newDetail || !newPrice || !newQuantity || !newUnit || !newStatus || !newNote || !newTypeSubAsset) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setLoading(true);

    // สร้าง object สำหรับส่งไปยัง backend
    const subAssetData = {
      sub_asset_name: newSubasset,
      details: newDetail,
      quantity: parseInt(newQuantity),
      unit_price: parseFloat(newPrice),
      counting_unit: newUnit,
      status: newStatus,
      note:newNote,
      type_sub_asset:newTypeSubAsset,
      main_asset_id: value.main_asset_id, // ใช้ main_asset_id จาก props
    };

    try {
      // ส่งข้อมูลไปที่ backend โดยไม่ส่ง sub_asset_id ให้กับระบบ
      const response = await axios.post('http://localhost:5000/api/subasset', subAssetData);
      console.log('บันทึกข้อมูลสำเร็จ:', response.data);

      if (editMode) {
        setData(data.map(item => (item.id === editId ? { ...item, ...subAssetData } : item)));
      } else {
        setData([...data, { ...subAssetData, id: data.length + 1 }]);
      }

      setIsPopupOpen(false);
      resetForm();
      setLoading(false);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล!');
      setLoading(false);
    }
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
    setNewNote("");
    setNewTypeSubAsset("")
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
          onClick={() => handleButtonClick()}
        >
          + เพิ่ม
        </button>
      </div>

      {isPopupOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClosePopup}
        >
          <div
            className="bg-white p-6 rounded-md shadow-md w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-gray-700 mb-4">
              {editMode ? "แก้ไขข้อมูลพัสดุย่อย" : "ข้อมูลพัสดุย่อย"}
            </h3>
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
                <label className="block text-gray-700 text-sm mb-2">ประเภทพัสดุ</label>
                <input
                  type="text"
                  className="w-full border-2 border-blue-100 rounded-xl p-2"
                  value={newTypeSubAsset}
                  onChange={(e) => setNewTypeSubAsset(e.target.value)}
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

              <div>
                <label className="block text-gray-700 text-sm mb-2">หมายเหตุ</label>
                <input
                  type="text"
                  className="w-full border-2 border-blue-100 rounded-xl p-2"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
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
                  disabled={loading}
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
            <th className="border px-4 py-2">ประเภทพัสดุ</th>
            <th className="border px-4 py-2">รายละเอียด</th>
            <th className="border px-4 py-2">ราคาต่อหน่วย</th>
            <th className="border px-4 py-2">จำนวน</th>
            <th className="border px-4 py-2">หน่วยนับ</th>
            <th className="border px-4 py-2">การใช้งาน</th>
            <th className="border px-4 py-2">หมายเหตุ</th>
            <th className="border px-4 py-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-gray-700">
              <td className="border px-4 py-2">{item.sub_asset_name}</td>
              <td className="border px-4 py-2">{item.type_sub_asset}</td>
              <td className="border px-4 py-2">{item.details}</td>
              <td className="border px-4 py-2">{formatCurrency(item.unit_price)}</td>
              <td className="border px-4 py-2">{item.quantity}</td>
              <td className="border px-4 py-2">{item.counting_unit}</td>
              <td className="border px-4 py-2">{item.note}</td>
              <td className="border px-4 py-2">{item.status}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-700 mr-2"
                  onClick={() => handleButtonClick(item)}
                >
                  แก้ไข
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-700"
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
