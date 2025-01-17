import React, { useState } from "react";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Breadcrumb4 from "./components/Breadcrumb4";
import ClickIcon from "./components/ClickIcon";


const Permissions = () => {

    return (
    <div style={{ backgroundColor: '#f1f8e9' }} className="min-h-screen font-sans">
        <Header />
        <NavBar />
        <Breadcrumb4 />
        <ClickIcon />
    </div>
    );
  };
  
  export default Permissions;
  
