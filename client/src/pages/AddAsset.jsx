import React, { useState } from "react";
import axios from "axios";

import Breadcrumb from "../components/Breadcrumb";
import AssetForm from "../components/AssetForm";
import AcquisitionInfo from "../components/AcquisitionInfo";
import ActionButtons2 from "../components/ActionButtons2";
import AssetDetails from "../components/AssetDetails";
import AssetInfoSection from "../components/AssetInfoSection";

const AddAsset = () => {
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
    counting_unit: '',
    department: ''  
  });
  

  // อัปเดตค่าใน state ตามการเปลี่ยนแปลงของ input
  const handleAssetChange = (field, value) => {
    setAssetData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
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
      alert('บันทึกข้อมูลสำเร็จ!');
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

  // ฟังก์ชันสำหรับการยกเลิก
  const handleCancel = () => {
    console.log("ยกเลิกการเพิ่มข้อมูล");
    setAssetData({   // รีเซ็ตค่าในฟอร์ม
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
  };

  return (
    <div style={{ backgroundColor: '#f1f8e9' }} className="min-h-screen font-sans">
      <Breadcrumb />
      <div className="container mx-auto p-4">
        {/* ส่งค่า state และฟังก์ชันอัปเดตให้ component ลูก */}
        <AssetForm value={assetData} onChange={handleAssetChange} />
        <AcquisitionInfo value={assetData} onChange={handleAssetChange} />
        <AssetDetails value={assetData} onChange={handleAssetChange} />
        <AssetInfoSection value={assetData} onChange={handleAssetChange} />
        
        {/* เชื่อมปุ่มบันทึกให้เรียก handleSubmit */}
        <ActionButtons2 onSave={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default AddAsset;
