import React, { useState, useEffect, useRef } from "react";
import Breadcrumb2 from "../components/Breadcrumb2";
import SearchForm from "../components/SearchForm";
import ActionButtons from "../components/ActionButtons";
import DataTable from "../components/DataTable";
import API from "../API";
import ActionButtons4 from "../components/ActionButtons4";



const ManageAssets = () => {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [roleId, setRoleId] = useState(localStorage.getItem("roleId"));


  const [departmentId, setDepartmentId] = useState(localStorage.getItem("departmentId"));
  const [userName, setUserName] = useState(localStorage.getItem("departmentId"));


  // const printRef = useRef(); // ✅ เพิ่ม ref สำหรับพิมพ์



  // ฟังก์ชันกรองข้อมูล
  const handleFilterChange = (newFilters) => {
    console.log("Updated Filters:", newFilters);
    setFilters(newFilters); // อัปเดต filters
    
    const hasActiveFilter = Object.values(newFilters).some((value) => value !== "");
    // ถ้าไม่มีฟิลเตอร์แอคทีฟให้แสดงข้อมูลทั้งหมด
    if (!hasActiveFilter) {
      setFilteredData(data);
      return;
    }
  
    const filtered = data.filter((item) => {
      return Object.entries(newFilters).every(([key, value]) => {
        if (!value) return true; // ถ้าค่าว่างข้ามการกรองนั้น
        let dataValue = item[key]?.toString().toLowerCase() || "";
        let filterValue = value.toString().toLowerCase();
        return dataValue.includes(filterValue); // ค้นหาบางส่วน
      });
    });
  
    setFilteredData(filtered); // อัปเดตข้อมูลที่กรองแล้ว
  };
  
  // ดึงข้อมูลจาก API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/mainasset");
        setData(response.data); // เก็บข้อมูลทั้งหมด
        setFilteredData(response.data); // ตั้งค่าเริ่มต้นให้ข้อมูลที่กรองแล้วเป็นข้อมูลทั้งหมด
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };
  
    fetchData();
  }, []);

  // ฟังก์ชันลบข้อมูล
  const handleDelete = (id) => {
    const encodedId = encodeURIComponent(id); // เข้ารหัส ID ก่อนส่ง
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) {
      API
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
        <SearchForm onFilter={handleFilterChange} /> {/* ส่งฟังก์ชันกรองไปยัง SearchForm */}
        <ActionButtons data={data} roleId={roleId} />
        <DataTable data={filteredData} handleDelete={handleDelete} /> {/* ใช้ข้อมูลที่กรองแล้ว */}
        <ActionButtons4 />
      </div>
    </div>
  );
};


export default ManageAssets;

