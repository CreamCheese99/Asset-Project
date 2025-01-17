import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddAsset from "./AddAsset";
import ShowAllAsset from "./ShowAllAsset";
import ManageAsset from "./ManageAsset";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Permissions from "./Permissions";


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Dashboard/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/manage-asset" element={<ManageAsset />} />
        <Route path="/add-asset" element={<AddAsset />} />
        <Route path="/show-asset" element={<ShowAllAsset/>}/>
        <Route path="/permissions" element={<Permissions />} />
      </Routes>
    </Router>
  );
};

export default App;
