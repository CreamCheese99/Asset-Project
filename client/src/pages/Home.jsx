import { useState, useEffect } from "react";
import Filters from "../components/Filters";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import { 
  summaryDepartmentDetails, 
  summaryDepartmentAssets,
  summaryFilterDepartmentAssets,
  summaryFilterDepartmentDetails
} from "../components/dataUtils";

const Home = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedAssetStatus, setSelectedAssetStatus] = useState("");
  const [selectedFund, setSelectedFund] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ฟังก์ชันเพื่อดึงข้อมูลจาก API
  const fetchData = async () => {
    setLoading(true); // ตั้งค่าระหว่างการโหลด
    setErrorMessage(""); // ล้างข้อความ error ก่อนการโหลดใหม่
    try {
      // ทำการร้องขอข้อมูลจากเซิร์ฟเวอร์
      const response = await fetch("http://localhost:5000/api/getData"); // URL ของ API
      if (!response.ok) {
        throw new Error("ไม่สามารถดึงข้อมูลจากเซิร์ฟเวอร์");
      }

      // แปลงข้อมูลที่ได้รับเป็น JSON
      const data = await response.json();
      console.log("Data received from API:", data);

      // คำนวณข้อมูลกราฟจากข้อมูลที่ได้รับ
      // ถ้ามีการเลือกตัวกรองอย่างน้อยหนึ่งตัว ให้ใช้ฟังก์ชันกรอง
      if (selectedDepartment || selectedAssetStatus || selectedFund || selectedYear) {
        // แสดง log ข้อมูลที่ส่งไปยังฟังก์ชันกรอง
        console.log("Filter parameters:", {
          selectedDepartment,
          selectedFund,
          selectedYear
        });
        
        setBarData(
          summaryFilterDepartmentDetails(data, selectedDepartment, selectedFund, selectedYear)
        );
        setPieData(
          summaryFilterDepartmentAssets(
            data,
            selectedDepartment,
            selectedAssetStatus,
            selectedYear
          )
        );
      } else {
        // ถ้าไม่มีการเลือกตัวกรอง ให้แสดงข้อมูลทั้งหมด
        setBarData(summaryDepartmentDetails(data));
        setPieData(summaryDepartmentAssets(data));
      }
    } catch (error) {
      // แสดงข้อความ error หากเกิดข้อผิดพลาด
      setErrorMessage("ไม่สามารถดึงข้อมูลได้จากเซิร์ฟเวอร์");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // หยุดการโหลด
    }
  };

  // เรียกใช้ fetchData เมื่อมีการเปลี่ยนแปลงตัวกรอง
  useEffect(() => {
    fetchData();
  }, [selectedDepartment, selectedAssetStatus, selectedFund, selectedYear]);

  // ฟังก์ชันจัดการการเปลี่ยนปี
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1100px", margin: "0 auto" }}>
      <Filters
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        selectedAssetStatus={selectedAssetStatus}
        setSelectedAssetStatus={setSelectedAssetStatus}
        selectedFund={selectedFund}
        setSelectedFund={setSelectedFund}
        selectedYear={selectedYear}
        handleYearChange={handleYearChange}
        errorMessage={errorMessage}
      />

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 0.5fr", gap: "20px" }}
      >
        {loading ? (
          <p>กำลังโหลดข้อมูล...</p> // แสดงข้อความขณะโหลด
        ) : errorMessage ? (
          <p>{errorMessage}</p> // แสดงข้อความ error ถ้ามี
        ) : (
          <>
            {barData && barData.datasets && barData.datasets.length > 0 ? (
              <BarChart data={barData} />
            ) : (
              <p>ไม่มีข้อมูลกราฟแท่งที่ตรงกับตัวกรอง</p>
            )}
            {pieData && pieData.datasets && pieData.datasets.length > 0 ? (
              <PieChart data={pieData} />
            ) : (
              <p>ไม่มีข้อมูลกราฟวงกลมที่ตรงกับตัวกรอง</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;