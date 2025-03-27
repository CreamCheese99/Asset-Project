import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/AssetDetails.css";  // นำเข้าไฟล์ CSS

const AssetDetails = ({ value, onChange }) => {
  const [image, setImage] = useState(null);
  const [asset_type, setAsset_Type] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // ตรวจสอบว่าเป็นไฟล์รูปภาพจริง ๆ
      if (!file.type.startsWith("image/")) {
        alert("กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น!");
        return;
      }
      // ตรวจสอบขนาดไฟล์
      if (file.size > 5 * 1024 * 1024) {
        alert("ไฟล์มีขนาดใหญ่เกินไป! กรุณาเลือกไฟล์ที่ไม่เกิน 5MB");
        return;
      }
  
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
      onChange("image", file);
    }
  };

  useEffect(() => {
    const fetchAsset_Type = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/asset_type');
        if (Array.isArray(response.data)) {
          setAsset_Type(response.data); 
        } else {
          console.error("The response data is not an array:", response.data);
        }
      } catch (err) {
        console.error('Error fetching Asset_Type:', err);
      }
    };

    fetchAsset_Type();
  }, []);

  return (
    <div className="bg-white mt-4 p-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold text-gray-700 mb-4">รายละเอียดพัสดุ</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="input-label">ชื่อสินทรัพย์</label>
          <input
            type="text"
            className="input-field"
            placeholder="กรอกชื่อสินทรัพย์"
            value={value.main_asset_name}
            onChange={(e) => onChange('main_asset_name', e.target.value)}
          />
        </div>

        <div>
          <label className="input-label">ประเภทสินทรัพย์</label>
          <select
            className="select-field"
            value={value.asset_type || ''} 
            onChange={(e) => onChange('asset_type', e.target.value)} 
          >
            <option value="">-- กรุณาเลือก --</option>
            {Array.isArray(asset_type) && asset_type.map((dept) => (
              <option key={dept.asset_type_id} value={dept.asset_type_name}>
                {dept.asset_type_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="input-label">สถานที่ใช้งาน</label>
          <input
            type="text"
            className="input-field"
            placeholder="สถานที่ใช้งาน"
            value={value.location_use}
            onChange={(e) => onChange('location_use', e.target.value)}
          />
        </div>

        <div>
          <label className="input-label">การใช้งาน</label>
          <select
            className="select-field"
            value={value.usage || ''} 
            onChange={(e) => onChange('usage', e.target.value)}
          >
            <option value="">-- กรุณาเลือก --</option>
            <option value="ใช้งาน">ใช้งาน</option>
            <option value="ส่งซ่อม">ส่งซ่อม</option>
            <option value="ชำรุด">ชำรุด</option>
            <option value="บริจาค/โอน">บริจาค/โอน</option>
            <option value="รับโอน">รับโอน</option>
            <option value="จำหน่าย">จำหน่าย</option>
          </select>
        </div>

        <div>
          <label className="input-label">สถานที่ส่งมอบ</label>
          <input
            type="text"
            className="input-field"
            placeholder="สถานที่ส่งมอบ"
            value={value.location_deliver}
            onChange={(e) => onChange('location_deliver', e.target.value)}
          />
        </div>

        <div>
          <label className="input-label">ผู้รับผิดชอบ</label>
          <input
            type="text"
            className="input-field"
            placeholder="ผู้รับผิดชอบ"
            value={value.responsible_person}
            onChange={(e) => onChange('responsible_person', e.target.value)}
          />
        </div>

        <div>
            <label className="input-label">เพิ่มรูปภาพ</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="input-file"
            />
            
            {previewImage && (
              <div className="mt-4">
                <img src={previewImage} alt="Asset" className="preview-img" />
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default AssetDetails;
