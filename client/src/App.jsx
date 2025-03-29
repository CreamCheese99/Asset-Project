import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ManageAssets from './pages/ManageAssets'
import ManagePermissions from './pages/ManagePermissions'
import AssetList from './pages/AssetList'
import AddAsset from './pages/AddAsset' 
import ManagePerInfo from './pages/ManagePerInfo'
import Login from './pages/Login'
import ShowInfo from './pages/ShowInfo'
import EditInfo from './pages/EditInfo'
import GuideBook from './pages/GuideBook'

import { useEffect, useState } from 'react';

  

function App() {

  const [roleId, setRoleId] = useState(localStorage.getItem('roleId')); // ดึง roleId จาก localStorage
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="manage-assets" element={<ManageAssets />} />
          <Route path="manage-permissions" element={<ManagePermissions />} />
          <Route path="asset-list" element={<AssetList />} />
          {/* <Route path="add-asset" element={<AddAsset />} />  */}

          {/* เส้นทางที่ป้องกันการเข้าถึงสำหรับ AddAsset */}
        <Route 
          path="/add-asset" 
          element={
            (roleId === '2' || roleId === '3') ? (
              <AddAsset />
            ) : (
              <div>คุณไม่มีสิทธ์ในการเข้าถึงหน้านี้ เนื่องจากเป็นส่วนเพิ่มข้อมูลครุภัณฑ์ ของเจ้าหนเาที่ภาควิชาเท่านั้น</div> // แสดงข้อความการเข้าถึงถูกปฏิเสธหรือเปลี่ยนเส้นทาง
            )
          } 
        />


          <Route path="manage-personal-info" element={<ManagePerInfo/>} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/show-info/:id" element={<ShowInfo/>}/>
          <Route path="/edit-info/:id" element={<EditInfo/>}/>
          <Route path="/guidebook" element={<GuideBook/>}/>
          
        </Route>
      </Routes>
    </Router>
  )
}
export default App

