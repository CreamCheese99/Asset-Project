import Breadcrumb6 from "../components/Breadcrumb6";
import ManageInfo from "../components/ManageInfo";
import ManageAssetTypes from "../components/ManageInfoAssetType";
const ManagePerInfo = () => {
    return (
    <div style={{ backgroundColor: '#f1f8e9' }} className="min-h-screen font-sans">
        <Breadcrumb6 />
        <div className="container mx-auto p-4">
            <ManageInfo />
            <ManageAssetTypes />
        </div>
    </div>
    )
  }
  
  export default ManagePerInfo