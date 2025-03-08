import React, { useState } from "react";

import Breadcrumb from "../components/Breadcrumb";
import AssetForm from "../components/AssetForm";
import AcquisitionInfo from "../components/AcquisitionInfo";
import ActionButtons2 from "../components/ActionButtons2";
import AssetDetails from "../components/AssetDetails";
import AssetInfoSection from "../components/AssetInfoSection";
//import NavBar from "./components/NavBar";

const AddAsset = () => {
  const handleSave = () => {
    alert("บันทึกข้อมูลสำเร็จ!");
  };

  const handleCancel = () => {
    alert("ยกเลิกการทำงาน");
  };

  return (
    <div style={{ backgroundColor: '#f1f8e9' }} className=" min-h-screen font-sans">

      <Breadcrumb />
      <div className="container mx-auto p-4">
        <AssetForm />
        <AcquisitionInfo />
        <AssetDetails />
        <AssetInfoSection />
        <ActionButtons2 onSave={handleSave} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default AddAsset;
