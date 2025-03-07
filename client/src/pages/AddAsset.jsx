import React, { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import AssetForm from "../components/AssetForm";
import AcquisitionInfo from "../components/AcquisitionInfo";
import ActionButtons2 from "../components/ActionButtons2";
import AssetDetails from "../components/AssetDetails";
import AssetInfoSection from "../components/AssetInfoSection";

const AddAsset = () => {
  // สร้าง state เพื่อเก็บข้อมูลจากทุกฟอร์ม
  const [assetData, setAssetData] = useState({
    asset_id: "",
    department: "",
    condition: "",
    acquisition_date: "",
    purchase_price: "",
    supplier: "",
    details: "",
    location: "",
  });

  // ฟังก์ชันอัปเดตค่า State เมื่อฟอร์มเปลี่ยนแปลงค่า
  const updateAssetData = (field, value) => {
    setAssetData((prev) => ({ ...prev, [field]: value }));
  };

  // ฟังก์ชันบันทึกข้อมูล
  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/mainassets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assetData), // ส่งข้อมูลทั้งหมดไป backend
      });

      if (response.ok) {
        alert("บันทึกข้อมูลสำเร็จ!");
        setAssetData({
          asset_id: "",
          department: "",
          condition: "",
          acquisition_date: "",
          purchase_price: "",
          supplier: "",
          details: "",
          location: "",
        });
      } else {
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  };

  // ฟังก์ชันยกเลิก
  const handleCancel = () => {
    alert("ยกเลิกการทำงาน");
    setAssetData({
      asset_id: "",
      department: "",
      condition: "",
      acquisition_date: "",
      purchase_price: "",
      supplier: "",
      details: "",
      location: "",
    });
  };

  return (
    <div style={{ backgroundColor: "#f1f8e9" }} className="min-h-screen font-sans">
      <Breadcrumb />
      <div className="container mx-auto p-4">
        <AssetForm assetData={assetData} updateAssetData={updateAssetData} />
        <AcquisitionInfo assetData={assetData} updateAssetData={updateAssetData} />
        <AssetDetails assetData={assetData} updateAssetData={updateAssetData} />
        <AssetInfoSection assetData={assetData} updateAssetData={updateAssetData} />
        <ActionButtons2 onSave={handleSave} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default AddAsset;
