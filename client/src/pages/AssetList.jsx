


// import { useState } from 'react';
// import SearchFormAllAsset from "../components/SearchFormAllAsset";
// import AllAsset from "../components/AllAsset";
// import Breadcrumb3 from "../components/Breadcrumb3";

// const AssetList = () => {
//   const [filters, setFilters] = useState({});

//   const handleFilter = (newFilters) => {
//     setFilters(newFilters); // อัปเดตฟิลเตอร์ที่กรอกจาก SearchForm
//   };

//   return (
//     <div style={{ backgroundColor: '#f1f8e9' }} className="min-h-screen font-sans">
//       <Breadcrumb3 />
//       <div className="container mx-auto p-4">
//         <h1 className="text-lg font-bold mb-4">ข้อมูลสรุปรายการพัสดุ</h1>
//         <SearchFormAllAsset onFilter={handleFilter} /> {/* ส่งฟังก์ชัน onFilter ไปยัง SearchFormAllAsset */}
//         <AllAsset filters={filters} /> {/* ส่งฟิลเตอร์ไปยัง AllAsset */}
//       </div>
//     </div>
//   );
// }

// export default AssetList;
