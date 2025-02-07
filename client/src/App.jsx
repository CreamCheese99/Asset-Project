// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AddAsset from "./AddAsset";
// import ShowAllAsset from "./ShowAllAsset";
// import ManageAsset from "./ManageAsset";
// import Login from "./Login";
// import Dashboard from "./Dashboard";
// import Layout from "./components/Layout";

// const App = () => {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/manage-asset" element={<ManageAsset />} />
//           <Route path="/add-asset" element={<AddAsset />} />
//           <Route path="/show-asset" element={<ShowAllAsset />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// };


// export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ManageAssets from './pages/ManageAssets'
import ManagePermissions from './pages/ManagePermissions'
import AssetList from './pages/AssetList'
import AddAsset from './pages/AddAsset' 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="manage-assets" element={<ManageAssets />} />
          <Route path="manage-permissions" element={<ManagePermissions />} />
          <Route path="asset-list" element={<AssetList />} />
          <Route path="add-asset" element={<AddAsset />} /> 
        </Route>
      </Routes>
    </Router>
  )
}

export default App
