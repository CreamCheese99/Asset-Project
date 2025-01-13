// import React from "react";
// import Header from "./components/Header";
// import SearchForm from "./components/SearchForm";
// import ActionButtons from "./components/ActionButtons";
// import DataTable from "./components/DataTable";

// const App = () => {
//   return (
//     <div className="container mx-auto p-4">
//       <Header />
//       <SearchForm />
//       <ActionButtons />
//       <DataTable />
//     </div>
//   );
// };

// export default App;




import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Breadcrumb2 from "./components/Breadcrumb2";
import AddAsset from "./AddAsset";
import ActionButtons from "./components/ActionButtons";
import SearchForm from "./components/SearchForm";
import DataTable from "./components/DataTable";
import NavBar from "./components/NavBar";

const HomePage = () => (
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-asset" element={<AddAsset />} />
      </Routes>
    </Router>
  );
};

export default App;
