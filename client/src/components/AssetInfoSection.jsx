import React, { useState } from "react";
import API from "../API";
import '../css/AssetInfoSection.css'
import { FaEdit, FaTrash } from "react-icons/fa";

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
  const [data, setData] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const formatCurrency = (num) => {
    if (!num) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // ใส่เครื่องหมายจุลภาคทุก 3 หลัก
  };

  const handlePriceChange = (input) => {
    const rawValue = input.replace(/,/g, ""); // ลบเครื่องหมายจุลภาคออก
    setNewPrice(rawValue); // เก็บค่าเป็นตัวเลขปกติ
  };

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
      setNewTypeSubAsset(item.type_sub_asset);
    }
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setEditMode(false);
  };

  const handleSave = async () => {
    if (!newSubasset || !newDetail || !newPrice || !newQuantity || !newUnit || !newStatus || !newNote || !newTypeSubAsset) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setLoading(true);

    const subAssetData = {
      sub_asset_name: newSubasset,
      details: newDetail,
      quantity: parseInt(newQuantity),
      unit_price: parseFloat(newPrice),
      counting_unit: newUnit,
      status: newStatus,
      note: newNote,
      type_sub_asset: newTypeSubAsset,
      main_asset_id: value.main_asset_id,
    };

    try {
      let response;
      if (editMode) {
        response = await API.put(`http://localhost:5000/api/subasset/${editId}`, subAssetData);
        setData(data.map(item => (item.id === editId ? { ...item, ...subAssetData } : item)));
        setStatusMessage("แก้ไขข้อมูลพัสดุย่อยสำเร็จ!");
      } else {
        response = await API.post('http://localhost:5000/api/subasset', subAssetData);
        setData([...data, { ...subAssetData, id: data.length + 1 }]);
        setStatusMessage("บันทึกข้อมูลพัสดุย่อยสำเร็จ!");
      }

      setIsPopupOpen(false);
      resetForm();
      setLoading(false);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล!');
      setLoading(false);
      setStatusMessage("เกิดข้อผิดพลาดในการบันทึกข้อมูล!");
    }
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    setStatusMessage("ลบข้อมูลพัสดุย่อยสำเร็จ!");
  };

  const resetForm = () => {
    setNewSubasset("");
    setNewDetail("");
    setNewPrice("");
    setNewQuantity("");
    setNewUnit("");
    setNewStatus("");
    setNewNote("");
    setNewTypeSubAsset("");
  };

  return (
    <div className="subasset-container">
      <h3 className="subasset-title">ข้อมูลพัสดุย่อย</h3>
      <p className="subasset-description">ส่วนเพิ่มข้อมูลพัสดุย่อย สำหรับอาจารย์ เจ้าหน้าที่ภาควิชาหรือผู้ที่มีสิทธิ์ในการเพิ่มข้อมูลพัสดุ</p>
      <div className="subasset-button-container">
        <button className="subasset-button" onClick={() => handleButtonClick()}>+ เพิ่ม</button>
      </div>

      {isPopupOpen && (
        <div className="subasset-popup-overlay" onClick={handleClosePopup}>
          <div className="subasset-popup-container" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-700 mb-4">{editMode ? "แก้ไขข้อมูลพัสดุย่อย" : "ข้อมูลพัสดุย่อย"}</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Inputs for all fields */}
              <div>
                <label className="subasset-label">รายการพัสดุย่อย</label>
                <input type="text" className="subasset-input" value={newSubasset} onChange={(e) => setNewSubasset(e.target.value)} />
              </div>
              <div>
                <label className="subasset-label">ประเภทพัสดุ</label>
                <input type="text" className="subasset-input" value={newTypeSubAsset} onChange={(e) => setNewTypeSubAsset(e.target.value)} />
              </div>
              <div>
                <label className="subasset-label">รายละเอียด</label>
                <textarea
                  className="subasset-input"
                  value={newDetail}
                  onChange={(e) => setNewDetail(e.target.value)}
                  rows={4} // ปรับความสูงเริ่มต้นตามต้องการ
                  placeholder="กรอกรายละเอียดเพิ่มเติม เช่น รายการที่จัดซื้อ เงื่อนไข หรืออื่นๆ"
                />
              </div>

              <div>
                <label className="subasset-label">ราคาต่อหน่วย</label>
                <input type="text" className="subasset-input" value={formatCurrency(newPrice)} onChange={(e) => handlePriceChange(e.target.value)} />
              </div>
              <div>
                <label className="subasset-label">จำนวน</label>
                <input type="number" className="subasset-input" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} />
              </div>
              <div>
                <label className="subasset-label">หน่วยนับ</label>
                <select className="subasset-select" value={newUnit} onChange={(e) => setNewUnit(e.target.value)}>
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
                <select className="subasset-select" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
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
                <input type="text" className="subasset-input" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
              </div>
              <div className="subasset-popup-button-group">
                <button className="subasset-cancel-button" onClick={handleClosePopup}>ยกเลิก</button>
                <button className="subasset-save-button" onClick={handleSave} disabled={loading}>{loading ? "กำลังบันทึก..." : "บันทึก"}</button>
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
                <button className="edit-button" onClick={() => handleButtonClick(item)}><FaEdit /></button>
                <button className="delete-button" onClick={() => handleDelete(item.id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetInfoSection;
