import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/AssetDetails.css"; // นำเข้าไฟล์ CSS

const AssetDetails = ({ value, onChange }) => {
  const [images, setImages] = useState([null, null, null, null, null]);
  const [previewImages, setPreviewImages] = useState([null, null, null, null, null]);
  const [assetType, setAssetType] = useState([]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น!");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("ไฟล์มีขนาดใหญ่เกินไป! กรุณาเลือกไฟล์ที่ไม่เกิน 5MB");
        return;
      }

      // อัปเดต state ของ images
      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);

      // อัปเดต preview
      const updatedPreviews = [...previewImages];
      updatedPreviews[index] = URL.createObjectURL(file);
      setPreviewImages(updatedPreviews);

      // ส่งค่าไปให้ parent component
      onChange(`image${index + 1}`, file);
    }
  };

  useEffect(() => {
    const fetchAssetType = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/asset_type");
        if (Array.isArray(response.data)) {
          setAssetType(response.data);
        } else {
          console.error("The response data is not an array:", response.data);
        }
      } catch (err) {
        console.error("Error fetching Asset_Type:", err);
      }
    };

    fetchAssetType();
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
            onChange={(e) => onChange("main_asset_name", e.target.value)}
          />
        </div>

        <div>
          <label className="input-label">ประเภทสินทรัพย์</label>
          <select
            className="select-field"
            value={value.asset_type || ""}
            onChange={(e) => onChange("asset_type", e.target.value)}
          >
            <option value="">-- กรุณาเลือก --</option>
            {Array.isArray(assetType) &&
              assetType.map((type) => (
                <option key={type.asset_type_id} value={type.asset_type_name}>
                  {type.asset_type_name}
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
            onChange={(e) => onChange("location_use", e.target.value)}
          />
        </div>

        <div>
          <label className="input-label">การใช้งาน</label>
          <select
            className="select-field"
            value={value.usage || ""}
            onChange={(e) => onChange("usage", e.target.value)}
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
            onChange={(e) => onChange("location_deliver", e.target.value)}
          />
        </div>
{/* 
        <div>
          <label className="input-label">ผู้รับผิดชอบ</label>
          <input
            type="text"
            className="input-field"
            placeholder="ผู้รับผิดชอบ"
            value={value.responsible_person}
            onChange={(e) => onChange("responsible_person", e.target.value)}
          />
        </div> */}

        {/* อัปโหลดรูปภาพ 5 รูป */}
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index}>
            <label className="input-label">เพิ่มรูปภาพ {index + 1}</label>
            <input
              type="file"
              accept="image/*"
              name={`image${index + 1}`}  
              onChange={(e) => handleImageChange(e, index)}
              className="input-file"
            />
            {previewImages[index] && (
              <div className="mt-4">
                <img src={previewImages[index]} alt={`Asset ${index + 1}`} className="preview-img" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetDetails;
