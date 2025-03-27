// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Layout from './components/layout/Layout'
// import Home from './pages/Home'
// import ManageAssets from './pages/ManageAssets'
// import ManagePermissions from './pages/ManagePermissions'
// import AssetList from './pages/AssetList'
// import AddAsset from './pages/AddAsset' 
// import ManagePerInfo from './pages/ManagePerInfo'
// import Login from './pages/Login'
// import ShowInfo from './pages/ShowInfo'
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="manage-assets" element={<ManageAssets />} />
//           <Route path="manage-permissions" element={<ManagePermissions />} />
//           <Route path="asset-list" element={<AssetList />} />
//           <Route path="add-asset" element={<AddAsset />} /> 
//           <Route path="manage-personal-info" element={<ManagePerInfo/>} />
//           <Route path="login" element={<Login/>}/>
//           <Route path="show-info" element={<ShowInfo/>}/>
//         </Route>
//       </Routes>
//     </Router>
//   )
// }
// export default App



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext"; //  Import Context
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ManageAssets from "./pages/ManageAssets";
import ManagePermissions from "./pages/ManagePermissions";
import AssetList from "./pages/AssetList";
import AddAsset from "./pages/AddAsset";
import ManagePerInfo from "./pages/ManagePerInfo";
import Login from "./pages/Login";
import ShowInfo from "./pages/ShowInfo";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="manage-assets" element={<ManageAssets />} />
            <Route path="manage-permissions" element={<ManagePermissions />} />
            <Route path="asset-list" element={<AssetList />} />
            <Route path="add-asset" element={<AddAsset />} />
            <Route path="manage-personal-info" element={<ManagePerInfo />} />
            <Route path="login" element={<Login />} />
            <Route path="show-info" element={<ShowInfo />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
