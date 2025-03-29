import React, { useState } from "react";
import axios from "axios";
import '../css/AssetInfoSection.css'

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
    console.log("Data received:", data);
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
    <div className="subasset-container">
    <h3 className="subasset-title">ข้อมูลพัสดุย่อย</h3>
    <p className="subasset-description">
      ส่วนเพิ่มข้อมูลพัสดุย่อย สำหรับอาจารย์ เจ้าหน้าที่ภาควิชาหรือผู้ที่มีสิทธิ์ ในการเพิ่มข้อมูลพัสดุ
    </p>
    <div className="subasset-button-container">
      <button
        className="subasset-button"
        onClick={() => handleButtonClick()}
      >
        + เพิ่ม
      </button>
    </div>
  
    {isPopupOpen && (
      <div
        className="subasset-popup-overlay"
        onClick={handleClosePopup}
      >
        <div
          className="subasset-popup-container"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-bold text-gray-700 mb-4">
            {editMode ? "แก้ไขข้อมูลพัสดุย่อย" : "ข้อมูลพัสดุย่อย"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="subasset-label">รายการพัสดุย่อย</label>
              <input
                type="text"
                className="subasset-input"
                placeholder="รายการพัสดุย่อย"
                value={newSubasset}
                onChange={(e) => setNewSubasset(e.target.value)}
              />
            </div>
            <div>
              <label className="subasset-label">ประเภทพัสดุ</label>
              <input
                type="text"
                className="subasset-input"
                value={newTypeSubAsset}
                onChange={(e) => setNewTypeSubAsset(e.target.value)}
              />
            </div>
            <div>
              <label className="subasset-label">รายละเอียด</label>
              <input
                type="text"
                className="subasset-input"
                value={newDetail}
                onChange={(e) => setNewDetail(e.target.value)}
              />
            </div>
            <div>
              <label className="subasset-label">ราคาต่อหน่วย</label>
              <input
                type="number"
                className="subasset-input"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </div>
            <div>
              <label className="subasset-label">จำนวน</label>
              <input
                type="number"
                className="subasset-input"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
              />
            </div>
            <div>
              <label className="subasset-label">หน่วยนับ</label>
              <select
                className="subasset-select"
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
              <label className="subasset-label">การใช้งาน</label>
              <select
                className="subasset-select"
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
              <label className="subasset-label">หมายเหตุ</label>
              <input
                type="text"
                className="subasset-input"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
            </div>
  
            <div className="subasset-popup-button-group">
              <button
                className="subasset-cancel-button"
                onClick={handleClosePopup}
              >
                ยกเลิก
              </button>
              <button
                className="subasset-save-button"
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
  
    <table className="subasset-table">
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
            <td className="border px-4 py-2">{item.status}</td>
            <td className="border px-4 py-2">{item.note}</td>
            <td className="border px-4 py-2 subasset-table-actions">
              <button
                className="edit-button"
                onClick={() => handleButtonClick(item)}
              >
                แก้ไข
              </button>
              <button
                className="delete-button"
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
