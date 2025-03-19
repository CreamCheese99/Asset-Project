import React, { useState } from "react";
import axios from "axios";
import Breadcrumb from "../components/Breadcrumb";
import AssetForm from "../components/AssetForm";
import AcquisitionInfo from "../components/AcquisitionInfo";
import ActionButtons2 from "../components/ActionButtons2";
import AssetDetails from "../components/AssetDetails";
import AssetInfoSection from "../components/AssetInfoSection";

const AddAsset = () => {
  // State to hold asset data
  const [assetData, setAssetData] = useState({
    main_asset_id: '',
    main_asset_name: '',
    status: '',
    fiscal_year: '',
    date_received: '',
    budget_limit: '',
    averange_price: '',
    budget_type: '',
    location_use: '',
    location_deliver: '',
    usage: '',
    responsible_person: '',
    sub_asset_name: '',
    asset_type: '',
    details: '',
    quantity: '',
    unit_price: '',
    counting_unit: '',
    department_id: ''
  });

  // Update asset data based on input changes
  const handleAssetChange = (field, value) => {
    setAssetData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  // ฟังก์ชันแจ้งเตือนและจัดการข้อผิดพลาด
  const handleAlert = (message, type = "error") => {
    alert(message); // ใช้ alert เพื่อแสดงข้อความ
  };

  const handleSubmit = async () => {
    // ตรวจสอบว่า main_asset_id มีค่าหรือไม่
    if (!assetData.main_asset_id) {
      handleAlert('กรุณากรอก main_asset_id');
      return;
    }

    try {
      // ส่งข้อมูลของ Main Asset ไปบันทึกก่อน
      const mainAssetResponse = await axios.post('http://localhost:5000/mainasset', assetData);
      console.log('บันทึกข้อมูล mainasset สำเร็จ:', mainAssetResponse.data);

      // เมื่อกรอกข้อมูลของ Sub Asset แล้ว ต้องบันทึกไปยังฐานข้อมูล Sub Asset
      if (assetData.sub_asset_name) {
        const subAssetData = {
          sub_asset_name: assetData.sub_asset_name,
          quantity: assetData.quantity,
          unit_price: assetData.unit_price,
          counting_unit: assetData.counting_unit,
          details: assetData.details,
          main_asset_id: assetData.main_asset_id, // การเชื่อมโยงกับ main asset
        };

        const subAssetResponse = await axios.post('http://localhost:5000/api/subasset', subAssetData);
        console.log('บันทึกข้อมูล subasset สำเร็จ:', subAssetResponse.data);
      }

      handleAlert('บันทึกข้อมูลสำเร็จ!', "success");
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
      handleAlert('เกิดข้อผิดพลาดในการบันทึกข้อมูล!');
    }
  };

  // Handle cancel (reset form)
  const handleCancel = () => {
    setAssetData({
      main_asset_id: '',
      main_asset_name: '',
      status: '',
      fiscal_year: '',
      date_received: '',
      budget_limit: '',
      averange_price: '',
      budget_type: '',
      location_use: '',
      location_deliver: '',
      usage: '',
      responsible_person: '',
      sub_asset_name: '',
      asset_type: '',
      details: '',
      quantity: '',
      unit_price: '',
      counting_unit: '',
      department_id: ''
    });
  };

  return (
    <div style={{ backgroundColor: '#f1f8e9' }} className="min-h-screen font-sans">
      <Breadcrumb />
      <div className="container mx-auto p-4">
        {/* ส่ง state และฟังก์ชันอัปเดตให้กับ child components */}
        <AssetForm value={assetData} onChange={handleAssetChange} />
        <AcquisitionInfo value={assetData} onChange={handleAssetChange} />
        <AssetDetails value={assetData} onChange={handleAssetChange} />
        <AssetInfoSection 
          value={assetData} 
          onChange={handleAssetChange} 
          mainAssetId={assetData.main_asset_id}  // ส่ง main_asset_id ไปยัง AssetInfoSection
        />
        <ActionButtons2 
          assetData={assetData}  
          onSave={handleSubmit} 
          onCancel={handleCancel} 
        />
      </div>
    </div>
  );
};

export default AddAsset;
