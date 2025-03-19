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
          <Route path="manage-personal-info" element={<ManagePerInfo/>} />
          <Route path="login" element={<Login/>}/>
          <Route path="/show-info/:id" element={<ShowInfo/>}/>
          <Route path="/edit-info/:id" element={<EditInfo/>}/>
          
        </Route>
      </Routes>
    </Router>
  )
}
export default App

