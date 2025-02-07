import Breadcrumb3 from "../components/Breadcrumb3";
import SearchFormAllAsset from "../components/SearchFormAllAsset";
import ActionButtons from "../components/ActionButtons";
import AllAsset from "../components/AllAsset";
import DataTable from "../components/DataTable";

const AssetList = () => {
    return (
      <div style={{ backgroundColor: '#f1f8e9' }} className=" min-h-screen font-sans">
      <Breadcrumb3 />
      <div className="container mx-auto p-4">
        <h1 className="text-lg font-bold mb-4">ข้อมูลสรุปรายการพัสดุ</h1>
        <SearchFormAllAsset />
        <AllAsset />
      </div>
    </div>
    )
  }
  
  export default AssetList