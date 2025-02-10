import Breadcrumb2 from "../components/Breadcrumb2";
import SearchForm from "../components/SearchForm";
import ActionButtons from "../components/ActionButtons";
import DataTable from "../components/DataTable";
const ManageAssets = () => {
    return (
<div style={{ backgroundColor: '#f1f8e9' }} className="min-h-screen font-sans">
        <Breadcrumb2 />
        <div className="container mx-auto p-4">
            <h1 className="text-lg font-bold mb-4">รายการพัสดุ</h1>
            <SearchForm />
            <ActionButtons />
            <DataTable />
        </div>
    </div>
    )
  }
  
  export default ManageAssets