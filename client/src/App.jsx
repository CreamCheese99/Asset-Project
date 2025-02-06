import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ManageAssets from './pages/ManageAssets'
import ManagePermissions from './pages/ManagePermissions'
import AssetList from './pages/AssetList'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="manage-assets" element={<ManageAssets />} />
          <Route path="manage-permissions" element={<ManagePermissions />} />
          <Route path="asset-list" element={<AssetList />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App