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


  
  // Handle submit to send data to the server
  const handleSubmit = async () => {
    if (!assetData.main_asset_id) {
      alert('กรุณากรอก main_asset_id');
      return;
    }


    
    try {
      const response = await axios.post('http://localhost:5000/mainasset', assetData);
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
        {/* Send the asset data and handleAssetChange function to child components */}
        <AssetForm value={assetData} onChange={handleAssetChange} />
        <AcquisitionInfo value={assetData} onChange={handleAssetChange} />
        <AssetDetails value={assetData} onChange={handleAssetChange} />
        <AssetInfoSection value={assetData} onChange={handleAssetChange} />
        
        {/* Connect the save button to handleSubmit and cancel button to handleCancel */}
        <ActionButtons2 
          assetData={assetData}  // Ensure assetData is passed here
          onSave={handleSubmit} 
          onCancel={handleCancel} 
        />
      </div>
    </div>
  );
};

export default AddAsset;
