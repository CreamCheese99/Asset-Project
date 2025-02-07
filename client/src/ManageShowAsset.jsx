import React, { useState } from "react";
import Header from "./components/Header";
import Breadcrumb from "./components/Breadcrumb";
import AssetForm from "./components/AssetForm";
import AcquisitionInfo from "./components/AcquisitionInfo";
import ActionButtons2 from "./components/ActionButtons2";
import AssetDetails from "./components/AssetDetails";
import NavBar from "./components/NavBar";
import ActionButtons3 from "./components/ActionButtons3";

const ManageShowAsset = () => {
  const handleSave = () => {
    alert("บันทึกข้อมูลสำเร็จ!");
  };

  const handleCancel = () => {
    alert("ยกเลิกการทำงาน");
  };

  return (
    // <div>
    //   <Header />
    //   <NavBar/>
    //   <Breadcrumb />
      <div className="container mx-auto p-4">
        <AssetForm />
        <AcquisitionInfo />
        <AssetDetails />
        <ActionButtons3 />
      </div>
    // </div>
  );
};

export default ManageShowAsset;
