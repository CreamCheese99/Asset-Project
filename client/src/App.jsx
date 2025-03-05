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





//test
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ManageAssets from './pages/ManageAssets'
import ManagePermissions from './pages/ManagePermissions'
import AssetList from './pages/AssetList'
import AddAsset from './pages/AddAsset' 
import ManagePerInfo from './pages/ManagePerInfo'
import Login from './pages/Login'
import ShowInfo from './pages/ShowInfo'

// ฟังก์ชันเช็คว่าผู้ใช้ล็อกอินหรือยัง
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // มี token หรือไม่
};

// Higher Order Component (HOC) สำหรับป้องกันหน้าที่ต้องล็อกอินก่อน
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* เปลี่ยนหน้าแรกให้เป็น Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* หน้าล็อกอิน (เข้าถึงได้ตลอด) */}
        <Route path="/login" element={<Login />} />

        {/* ส่วนของ Layout และหน้าที่ต้องล็อกอินก่อน */}
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="manage-assets" element={<ProtectedRoute element={<ManageAssets />} />} />
          <Route path="manage-permissions" element={<ProtectedRoute element={<ManagePermissions />} />} />
          <Route path="asset-list" element={<ProtectedRoute element={<AssetList />} />} />
          <Route path="add-asset" element={<ProtectedRoute element={<AddAsset />} />} />
          <Route path="manage-personal-info" element={<ProtectedRoute element={<ManagePerInfo />} />} />
          <Route path="show-info" element={<ProtectedRoute element={<ShowInfo />} />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
