import React, { useState } from "react";
import Header from "./components/Header";
import Breadcrumb3 from "./components/Breadcrumb3";
import NavBar from "./components/NavBar";
import SearchFormAllAsset from "./components/SearchFormAllAsset";
import AllAsset from "./components/AllAsset";
const ShowAllAsset = () => {

  return (
    <div style={{ backgroundColor: '#f1f8e9' }} className=" min-h-screen font-sans">
      {/* <Header />
      <NavBar/> */}
      <Breadcrumb3 />
      <div className="container mx-auto p-4">
        <h1 className="text-lg font-bold mb-4">ข้อมูลสรุปรายการพัสดุ</h1>
        <SearchFormAllAsset />
        <AllAsset />
      </div>
    </div>
  );
};

export default ShowAllAsset;
