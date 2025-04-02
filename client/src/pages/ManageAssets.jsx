// import Breadcrumb2 from "../components/Breadcrumb2";
// import SearchForm from "../components/SearchForm";
// import ActionButtons from "../components/ActionButtons";
// import DataTable from "../components/DataTable";
// const ManageAssets = () => {
//     return (
// <div style={{ backgroundColor: '#f1f8e9' }} className="min-h-screen font-sans">
//         <Breadcrumb2 />
//         <div className="container mx-auto p-4">
//             <h1 className="text-lg font-bold mb-4">รายการพัสดุ</h1>
//             <SearchForm />
//             <ActionButtons />
//             <DataTable />
//         </div>
//     </div>
//     )
//   }
  
//   export default ManageAssets

import React, { useState, useEffect } from "react";
import Breadcrumb2 from "../components/Breadcrumb2";
import SearchForm from "../components/SearchForm";
import ActionButtons from "../components/ActionButtons";
import DataTable from "../components/DataTable";
import axios from "axios";
import ActionButtons4 from "../components/ActionButtons4";

const ManageAssets = () => {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);


  const [roleId, setRoleId] = useState(localStorage.getItem("roleId"));

  const handleFilterChange = (newFilters) => {
    console.log("Updated Filters:", newFilters);
    setFilters(newFilters);
  
    const hasActiveFilter = Object.values(newFilters).some((value) => value !== "");
  
    if (!hasActiveFilter) {
      setFilteredData(data);
      return;
    }
  
    const filtered = data.filter((item) => {
      return Object.entries(newFilters).every(([key, value]) => {
        if (!value) return true;
        let dataValue = item[key]?.toString().toLowerCase() || "";
        let filterValue = value.toString().toLowerCase();
        return dataValue.includes(filterValue);
      });
    });
  
    setFilteredData(filtered);
  };
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/mainasset");
        setData(response.data);
        setFilteredData(response.data); // ใช้ข้อมูลทั้งหมดเป็นค่าเริ่มต้น
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    console.log("Filters:", filters);
    console.log("Data:", data);
  
    const hasActiveFilter = Object.values(filters).some((value) => value !== "");
    if (!hasActiveFilter) {
      setFilteredData(data);
      return;
    }
  
    const filtered = data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true; // ✅ ถ้าค่าว่างให้ข้าม
  
        let dataValue = item[key]?.toString().toLowerCase() || "";
        let filterValue = value.toString().toLowerCase();
  
        console.log(`Comparing ${key}: ${dataValue} === ${filterValue}`); 
  
        return dataValue.includes(filterValue); // ✅ ใช้ includes() รองรับการค้นหาบางส่วน
      });
    });
  
    setFilteredData(filtered);
  }, [filters, data]);
  
  

  // ฟังก์ชันลบข้อมูล
  const handleDelete = (id) => {
    const encodedId = encodeURIComponent(id); // เข้ารหัส ID ก่อนส่ง
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) {
      axios
        .delete(`http://localhost:5000/api/mainasset/${encodedId}`)
        .then(() => {
          // ลบข้อมูลจาก data และ filteredData
          setData((prevData) => prevData.filter((item) => item.main_asset_id !== id));
          setFilteredData((prevData) =>
            prevData.filter((item) => item.main_asset_id !== id)
          );
          alert("ลบข้อมูลสำเร็จ!");
        })
        .catch((error) => {
          console.error("เกิดข้อผิดพลาดในการลบ:", error);
          alert("ไม่สามารถลบข้อมูลได้");
        });
    }
  };

  return (
    <div style={{ backgroundColor: "#f1f8e9" }} className="min-h-screen font-sans">
      <Breadcrumb2 />
      <div className="container mx-auto p-4">
        <SearchForm onFilter={handleFilterChange} />
        <ActionButtons data={data} roleId={roleId} />
        <DataTable data={data} filteredData={filteredData} handleDelete={handleDelete} />
        <ActionButtons4 />
      </div>
    </div>
  );
};

export default ManageAssets;
