


//**************************************************************ใช้งานได้************************************** */
import React, { useState, useEffect, useRef } from "react";
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
        const response = await axios.get("http://localhost:5000/mainasset");
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
        <SearchForm onFilter={handleFilterChange} /> {/* ส่งฟังก์ชันกรองไปยัง SearchForm */}
        <ActionButtons data={data} roleId={roleId} />
        <DataTable data={filteredData} handleDelete={handleDelete} /> {/* ใช้ข้อมูลที่กรองแล้ว */}
        <ActionButtons4 />
      </div>
    </div>
  );
};


// return (
//   <div style={{ backgroundColor: "#f1f8e9" }} className="min-h-screen font-sans">
//     <Breadcrumb2 />
//     <div className="container mx-auto p-4">
//       <SearchForm onFilter={handleFilterChange} />
//       <ActionButtons data={data} roleId={roleId} printRef={printRef} /> {/* ✅ ส่ง ref ไป */}
      
//       <div ref={printRef}> {/* ✅ ครอบตาราง */}
//         <DataTable data={filteredData} handleDelete={handleDelete} />
//       </div>

//       <ActionButtons4 />
//     </div>
//   </div>
// );
// };
export default ManageAssets;




// //************************************* ตามdepartment แต่ filter ที่ SearchForm.jsx  ไม่ได้********************************************** */
// import React, { useState, useEffect } from "react";
// import Breadcrumb2 from "../components/Breadcrumb2";
// import SearchForm from "../components/SearchForm";
// import ActionButtons from "../components/ActionButtons";
// import DataTable from "../components/DataTable";
// import axios from "axios";
// import ActionButtons4 from "../components/ActionButtons4";

// const ManageAssets = () => {
//   const [filters, setFilters] = useState({});
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [roleId, setRoleId] = useState(localStorage.getItem("roleId"));
//   const [departmentId, setDepartmentId] = useState(localStorage.getItem("departmentId"));

//   // ฟังก์ชันกรองข้อมูล
//   const handleFilterChange = (newFilters) => {
//     console.log("Updated Filters:", newFilters);
//     setFilters(newFilters);

//     const hasActiveFilter = Object.values(newFilters).some((value) => value !== "");

//     if (!hasActiveFilter) {
//       setFilteredData(data);
//       return;
//     }

//     const filtered = data.filter((item) => {
//       // กรองตาม department_id ถ้า role_id ไม่ใช่ 3
//       if (roleId !== "3" && item.department_id !== departmentId) {
//         return false; // ข้ามข้อมูลที่ไม่ตรงกับ department_id
//       }
//       return Object.entries(newFilters).every(([key, value]) => {
//         if (!value) return true; // ถ้าค่าว่างข้ามการกรองนั้น
//         let dataValue = item[key]?.toString().toLowerCase() || "";
//         let filterValue = value.toString().toLowerCase();
//         return dataValue.includes(filterValue); // ค้นหาบางส่วน
//       });
//     });

//     setFilteredData(filtered); // อัปเดตข้อมูลที่กรองแล้ว
//   };

//   // ดึงข้อมูลจาก API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/mainasset");
//         setData(response.data); // เก็บข้อมูลทั้งหมด
//         // ฟิลเตอร์ข้อมูลตาม roleId และ departmentId
//         const filtered = response.data.filter((item) => {
//           if (roleId === "3") {
//             return true; // ถ้า role_id เป็น 3 ให้แสดงข้อมูลทั้งหมด
//           }
//           return item.department_id === departmentId; // ถ้าไม่ใช่ role_id 3 ให้แสดงแค่ department ของตัวเอง
//         });
//         setFilteredData(filtered); // ตั้งค่าเริ่มต้นให้ข้อมูลที่กรองแล้ว
//       } catch (error) {
//         console.error("Error fetching assets:", error);
//       }
//     };

//     fetchData();
//   }, [roleId, departmentId]); // ทำการโหลดใหม่เมื่อ roleId หรือ departmentId เปลี่ยน

//   // ฟังก์ชันลบข้อมูล
//   const handleDelete = (id) => {
//     const encodedId = encodeURIComponent(id); // เข้ารหัส ID ก่อนส่ง
//     if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) {
//       axios
//         .delete(`http://localhost:5000/api/mainasset/${encodedId}`)
//         .then(() => {
//           // ลบข้อมูลจาก data และ filteredData
//           setData((prevData) => prevData.filter((item) => item.main_asset_id !== id));
//           setFilteredData((prevData) =>
//             prevData.filter((item) => item.main_asset_id !== id)
//           );
//           alert("ลบข้อมูลสำเร็จ!");
//         })
//         .catch((error) => {
//           console.error("เกิดข้อผิดพลาดในการลบ:", error);
//           alert("ไม่สามารถลบข้อมูลได้");
//         });
//     }
//   };

//   return (
//     <div style={{ backgroundColor: "#f1f8e9" }} className="min-h-screen font-sans">
//       <Breadcrumb2 />
//       <div className="container mx-auto p-4">
//         <SearchForm onFilter={handleFilterChange} />
//         <ActionButtons data={data} roleId={roleId} />
//         <DataTable data={filteredData} handleDelete={handleDelete} />
//         <ActionButtons4 />
//       </div>
//     </div>
//   );
// };

// export default ManageAssets;






















// import React, { useState, useEffect } from "react";
// import Breadcrumb2 from "../components/Breadcrumb2";
// import SearchForm from "../components/SearchForm";
// import ActionButtons from "../components/ActionButtons";
// import DataTable from "../components/DataTable";
// import axios from "axios";
// import ActionButtons4 from "../components/ActionButtons4";

// const ManageAssets = () => {
//   const [filters, setFilters] = useState({});
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [roleId, setRoleId] = useState(localStorage.getItem("roleId"));
//   const [departmentId, setDepartmentId] = useState(localStorage.getItem("departmentId"));
//   const [userName, setUserName] = useState(localStorage.getItem("departmentId"));

//   // ฟังก์ชันกรองข้อมูล
//   const handleFilterChange = (newFilters) => {
//     console.log("Updated Filters:", newFilters);
//     setFilters(newFilters);

//     const hasActiveFilter = Object.values(newFilters).some((value) => value !== "");

//     if (!hasActiveFilter) {
//       setFilteredData(data);
//       return;
//     }

//   //   const filtered = data.filter((item) => {
//   //     // กรองตาม department_id ถ้า role_id ไม่ใช่ 3
//   //     if (roleId !== "3" && item.department_id !== departmentId) {
//   //       return false; // ข้ามข้อมูลที่ไม่ตรงกับ department_id
//   //     }
//   //     return Object.entries(newFilters).every(([key, value]) => {
//   //       if (!value) return true; // ถ้าค่าว่างข้ามการกรองนั้น
//   //       let dataValue = item[key]?.toString().toLowerCase() || "";
//   //       let filterValue = value.toString().toLowerCase();
//   //       return dataValue.includes(filterValue); // ค้นหาบางส่วน
//   //     });
//   //   });

//   //   console.log(filtered); // ตรวจสอบข้อมูลที่กรองแล้วใน console

//   //   setFilteredData(filtered); // อัปเดตข้อมูลที่กรองแล้ว
//   // };


//   const filtered = data.filter((item) => {
//     // กรองตาม department_id ถ้า role_id ไม่ใช่ 3
//     if (roleId !== "3" && item.department_id !== departmentId) {
//       return false; // ข้ามข้อมูลที่ไม่ตรงกับ department_id
//     }
  
//     // กรองตาม responsible_person สำหรับ roleId เท่ากับ 5
//     if (roleId === "5" && item.responsible_person !== userName) {
//       return false; // ข้ามข้อมูลที่ไม่ตรงกับ responsible_person ของผู้ใช้
//     }
  
//     // กรองข้อมูลจาก newFilters
//     return Object.entries(newFilters).every(([key, value]) => {
//       if (!value) return true; // ถ้าค่าว่างข้ามการกรองนั้น
//       let dataValue = item[key]?.toString().toLowerCase() || "";
//       let filterValue = value.toString().toLowerCase();
//       return dataValue.includes(filterValue); // ค้นหาบางส่วน
//     });
//   });
  
//   console.log(filtered); // ตรวจสอบข้อมูลที่กรองแล้วใน console
  
//   setFilteredData(filtered); // อัปเดตข้อมูลที่กรองแล้ว
  
// };
  
//   // ดึงข้อมูลจาก API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/mainasset");
//         console.log("Fetched data:", response.data);  // ตรวจสอบข้อมูลที่ได้จาก API
//         setData(response.data); // เก็บข้อมูลทั้งหมด
//         // ฟิลเตอร์ข้อมูลตาม roleId และ departmentId
//         const filtered = response.data.filter((item) => {
//           if (roleId === "3") {
//             return true; // ถ้า role_id เป็น 3 ให้แสดงข้อมูลทั้งหมด
//           }
//           return item.department_id === departmentId; // ถ้าไม่ใช่ role_id 3 ให้แสดงแค่ department ของตัวเอง
//         });
//         setFilteredData(filtered); // ตั้งค่าเริ่มต้นให้ข้อมูลที่กรองแล้ว
//       } catch (error) {
//         console.error("Error fetching assets:", error);
//       }
//     };

//     fetchData();
//   }, [roleId, departmentId]); // ทำการโหลดใหม่เมื่อ roleId หรือ departmentId เปลี่ยน


  
//   // ฟังก์ชันลบข้อมูล
//   const handleDelete = (id) => {
//     const encodedId = encodeURIComponent(id); // เข้ารหัส ID ก่อนส่ง
//     if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) {
//       axios
//         .delete(`http://localhost:5000/api/mainasset/${encodedId}`)
//         .then(() => {
//           // ลบข้อมูลจาก data และ filteredData
//           setData((prevData) => prevData.filter((item) => item.main_asset_id !== id));
//           setFilteredData((prevData) =>
//             prevData.filter((item) => item.main_asset_id !== id)
//           );
//           alert("ลบข้อมูลสำเร็จ!");
//         })
//         .catch((error) => {
//           console.error("เกิดข้อผิดพลาดในการลบ:", error);
//           alert("ไม่สามารถลบข้อมูลได้");
//         });
//     }
//   };

//   return (
//     <div style={{ backgroundColor: "#f1f8e9" }} className="min-h-screen font-sans">
//       <Breadcrumb2 />
//       <div className="container mx-auto p-4">
//         <SearchForm onFilter={handleFilterChange} />
//         <ActionButtons data={data} roleId={roleId} />
//         <DataTable data={filteredData} handleDelete={handleDelete} />
//         <ActionButtons4 />
//       </div>
//     </div>
//   );
// };

// export default ManageAssets;
