import React, { useState } from "react";
import Header from './components/Header';
import NavBar from './components/NavBar';
import Dashboardpage from './components/Dashboardpage';

const Dashboard = () => {

  return (
    <div>
    <Header />
    <NavBar />
    <Dashboardpage />
  </div>
  );
};

export default Dashboard;


