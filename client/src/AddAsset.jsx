import React, { useState } from "react";
import Header from "./components/Header";
import Breadcrumb from "./components/Breadcrumb";
import AssetForm from "./components/AssetForm";
import AcquisitionInfo from "./components/AcquisitionInfo";
import ActionButtons2 from "./components/ActionButtons2";
import AssetDetails from "./components/AssetDetails";
import AssetInfoSection from "./components/AssetInfoSection";
import SubAssetInfo from "./components/SubassetInfo";

const AddAsset = () => {
  const handleSave = () => {
    alert("บันทึกข้อมูลสำเร็จ!");
  };

  const handleCancel = () => {
    alert("ยกเลิกการทำงาน");
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Header />
      <Breadcrumb />
      <div className="container mx-auto p-4">
        <AssetForm />
        <AcquisitionInfo />
        <AssetDetails />
        <AssetInfoSection />
        <SubAssetInfo/>
        <ActionButtons2 onSave={handleSave} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default AddAsset;
