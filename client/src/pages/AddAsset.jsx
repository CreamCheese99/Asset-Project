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
    department_id: '',
    note:'',
    type_sub_asset:'',
    image: ''  // เพิ่มฟิลด์เก็บรูปภาพ
  });

  // อัปเดตข้อมูลจากอินพุตทั่วไป
  const handleAssetChange = (field, value) => {
    setAssetData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  // อัปเดตรูปภาพ
  const handleImageChange = (file) => {
    setAssetData((prevData) => ({
      ...prevData,
      image: file, // เก็บไฟล์รูป
    }));
  };

  // ฟังก์ชันแจ้งเตือน
  const handleAlert = (message, type = "error") => {
    alert(message);
  };

  const handleSubmit = async () => {
    if (!assetData.main_asset_id) {
      handleAlert('กรุณากรอก main_asset_id');
      return;
    }
  
    try {
      const formData = new FormData();
  
      // เพิ่มข้อมูลทั้งหมดลงใน FormData
      Object.keys(assetData).forEach((key) => {
        if (assetData[key] !== null && assetData[key] !== undefined) {
          if (key === 'image' && assetData[key] instanceof File) {
            formData.append(key, assetData[key]); // แนบไฟล์รูป
          } else if (key !== 'image') {
            formData.append(key, assetData[key]);
          }
        }
      });
  
      // ตรวจสอบว่าไฟล์ใน FormData ถูกต้องหรือไม่
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
  
      // ส่งข้อมูลไป backend
      const mainAssetResponse = await axios.post(
        'http://localhost:5000/mainasset',
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log('บันทึกข้อมูล mainasset สำเร็จ:', mainAssetResponse.data);
  
      handleAlert('บันทึกข้อมูลสำเร็จ!', "success");
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
      handleAlert('เกิดข้อผิดพลาดในการบันทึกข้อมูล!');
    }
  };
  
  // รีเซ็ตข้อมูล
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
      department_id: '',
      note:'',
      type_sub_asset:'',
      image: ''  // เพิ่มฟิลด์เก็บรูปภาพ
    });
  };

  return (
    <div style={{ backgroundColor: '#f1f8e9' }} className="min-h-screen font-sans">
      <Breadcrumb />
      <div className="container mx-auto p-4">
        {/* ส่งฟังก์ชันและค่าไปยัง child components */}
        <AssetForm value={assetData} onChange={handleAssetChange} />
        <AcquisitionInfo value={assetData} onChange={handleAssetChange} />
        <AssetDetails value={assetData} onChange={handleAssetChange} onImageChange={handleImageChange} />
        <ActionButtons2 
          assetData={assetData}  
          onSave={handleSubmit } 
          onCancel={handleCancel} 
        />
        <div className="mt-14"> {/* เว้นระยะห่างระหว่าง component */}
            <AssetInfoSection 
              value={assetData} 
              onChange={handleAssetChange} 
              mainAssetId={assetData.main_asset_id}  
            />
        </div>
      </div>
    </div>
  );
};

export default AddAsset;
