import Breadcrumb4 from "../components/Breadcrumb4";
import Permissions from "../components/Permissions";

const ManagePermissions = () => {
    return (
<div style={{ backgroundColor: '#f1f8e9' }} className="min-h-screen font-sans">
        <Breadcrumb4 />
        <div className="container mx-auto p-4">
            <Permissions />
        </div>
    </div>
    )
  }
  
  export default ManagePermissions