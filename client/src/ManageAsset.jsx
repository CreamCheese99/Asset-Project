import React, { useState } from "react";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Breadcrumb2 from "./components/Breadcrumb2";
import SearchForm from "./components/SearchForm";
import ActionButtons from "./components/ActionButtons";
import DataTable from "./components/DataTable";


const ManageAsset = () => {

    return (
    <div style={{ backgroundColor: '#f1f8e9' }} className="min-h-screen font-sans">
        <Header />
        <NavBar />
        <Breadcrumb2 />
        <div className="container mx-auto p-4">
            <h1 className="text-lg font-bold mb-4">รายการครุภัณฑ์</h1>
            <SearchForm />
            <ActionButtons />
            <DataTable />
            
        </div>
    </div>
    );
  };
  
  export default ManageAsset;
  
