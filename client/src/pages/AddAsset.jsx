import React, { useState } from "react";
import axios from "axios";
import Breadcrumb from "../components/Breadcrumb";
import AssetForm from "../components/AssetForm";
import AcquisitionInfo from "../components/AcquisitionInfo";
import ActionButtons2 from "../components/ActionButtons2";
import AssetDetails from "../components/AssetDetails";
import AssetInfoSection from "../components/AssetInfoSection";
import ActionButtons5 from "../components/ActionButtons5";

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
    image: null  // เพิ่มฟิลด์เก็บรูปภาพ
  });

  // อัปเดตข้อมูลจากอินพุตทั่วไป
  const handleAssetChange = (field, value) => {
    setAssetData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  // อัปเดตรูปภาพ
  const handleImageChange = (files) => {
    setAssetData((prevData) => ({
      ...prevData,
      image: files, // เก็บหลายไฟล์
    }));
  };
  

  // ฟังก์ชันแจ้งเตือน
  const handleAlert = (message, type = "error") => {
    alert(message);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
  
    // เพิ่มข้อมูล assetData ลงใน formData
    for (const key in assetData) {
      if (key.startsWith("image") && assetData[key] instanceof File) {
        formData.append(key, assetData[key]); // ใช้ชื่อฟิลด์ตรงกับที่เซิร์ฟเวอร์คาดหวัง
      } else {
        formData.append(key, assetData[key]);
      }
    }
  
    try {
      const response = await axios.post('http://localhost:5000/mainasset', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('บันทึกข้อมูลสำเร็จ:', response.data);
      alert('บันทึกข้อมูลสำเร็จ!');
    } catch (error) {
      if (error.response) {
        console.error('ข้อผิดพลาดจากการตอบกลับ:', error.response.data);
        alert(error.response.data.error || 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์!');
      } else if (error.request) {
        console.error('ข้อผิดพลาดจากการส่งคำขอ:', error.request);
        alert('ไม่ได้รับการตอบกลับจากเซิร์ฟเวอร์!');
      } else {
        console.error('ข้อความข้อผิดพลาด:', error.message);
        alert('ข้อผิดพลาดที่ไม่คาดคิด!');
      }
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
      image: null  // เปลี่ยนเป็น null เพื่อให้ไม่มีค่าเริ่มต้น
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
        <ActionButtons5 />
      </div>
    </div>
  );
};

export default AddAsset;
