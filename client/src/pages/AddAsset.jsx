import React, { useState } from "react";
import axios from "axios";

import Breadcrumb from "../components/Breadcrumb";
import AssetForm from "../components/AssetForm";
import AcquisitionInfo from "../components/AcquisitionInfo";
import ActionButtons2 from "../components/ActionButtons2";
import AssetDetails from "../components/AssetDetails";
import AssetInfoSection from "../components/AssetInfoSection";

const AddAsset = () => {
  // กำหนดค่าเริ่มต้นให้กับ state
  const [assetData, setAssetData] = useState({
    main_asset_ID: '',
    main_asset_name: '',
    status: '',
    fiscal_year: '',
    date_received: '',
    badget_limit: '',
    averange_price: '',
    budget_type: '',
    asset_type: '',
    location_use: '',
    location_deliver: '',
    usage: '',
    reponsible_personata: '',
    sub_asset_name: '',
    type: '',
    details: '',
    quantity: '',
    unit_price: '',
    counting_unit: ''
  });

  // ฟังก์ชันที่อัพเดตข้อมูลใน state
  const handleAssetChange = (field, value) => {
    setAssetData((prevData) => ({
      ...prevData, // เก็บข้อมูลเดิมไว้ก่อน
      [field]: value, // อัพเดตฟิลด์ที่ต้องการ
    }));
  };

  // ฟังก์ชันสำหรับการบันทึกข้อมูล
  const handleSave = () => {
    console.log("ข้อมูลทั้งหมด:", assetData);
    // ส่งข้อมูลไปยัง backend หรือทำงานอื่น ๆ ที่ต้องการ
  };

  // ฟังก์ชันสำหรับการยกเลิก
  const handleCancel = () => {
    console.log("ยกเลิกการเพิ่มข้อมูล");
    // ฟังก์ชันยกเลิก (เช่น ล้างฟอร์ม หรือกลับไปหน้าเดิม)
  };

  // ฟังก์ชันสำหรับการส่งข้อมูลไปยัง server
  const handleSubmit = async () => {
    if (!assetData.main_asset_ID) {
      alert('กรุณากรอก main_asset_ID');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/MainAsset', assetData);
      console.log('บันทึกข้อมูลสำเร็จ:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('ข้อผิดพลาดจากการตอบกลับ:', error.response.data);
        alert('เกิดข้อผิดพลาดที่เซิร์ฟเวอร์!');
      } else if (error.request) {
        console.error('ข้อผิดพลาดจากการส่งคำขอ:', error.request);
        alert('ไม่ได้รับการตอบกลับจากเซิร์ฟเวอร์!');
      } else {
        console.error('ข้อความข้อผิดพลาด:', error.message);
        alert('ข้อผิดพลาดที่ไม่คาดคิด!');
      }
    }
  };
  
  return (
    <div style={{ backgroundColor: '#f1f8e9' }} className="min-h-screen font-sans">
      <Breadcrumb />
      <div className="container mx-auto p-4">
        <AssetForm value={assetData.main_asset_ID} onChange={(value) => handleAssetChange('main_asset_ID', value)} />
        <AcquisitionInfo value={assetData.fiscal_year} onChange={(value) => handleAssetChange('fiscal_year', value)} />
        <AssetDetails value={assetData.details} onChange={(value) => handleAssetChange('details', value)} />
        <AssetInfoSection value={assetData.asset_type} onChange={(value) => handleAssetChange('asset_type', value)} />
        <ActionButtons2 onSave={handleSave} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default AddAsset;
