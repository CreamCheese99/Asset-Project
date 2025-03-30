import { useState, useEffect } from "react";
import axios from 'axios'; // นำเข้า axios
import Filters from "../components/Filters";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";

const Home = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedAssetStatus, setSelectedAssetStatus] = useState("");
  const [selectedFund, setSelectedFund] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ประกาศ selectedUsage และ selectedBudgetType ก่อนใช้งาน
  const [selectedUsage, setSelectedUsage] = useState("");
  const [selectedBudgetType, setSelectedBudgetType] = useState("");

  // ฟังก์ชันเพื่อดึงข้อมูลจาก API โดยใช้ axios
  const fetchData = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.get("http://localhost:5000/api/mainasset-dash", {
        params: {
          department: selectedDepartment,
          assetStatus: selectedAssetStatus,
          fund: selectedFund,
          year: selectedYear,
          usage: selectedUsage, // ส่งค่า selectedUsage
          budgetType: selectedBudgetType, // ส่งค่า selectedBudgetType
        }
      });
      const result = response.data;

      if (!result || !result.departmentDetails) {
        throw new Error("Missing departmentDetails in the response.");
      }

      const chartData = result.departmentDetails;
      setBarData(chartData);  // แสดงข้อมูลใน BarChart
      setPieData(chartData);  // แสดงข้อมูลใน PieChart
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  // เรียกใช้ fetchData เมื่อมีการเปลี่ยนแปลงตัวกรอง
  useEffect(() => {
    fetchData();
  }, [selectedDepartment, selectedAssetStatus, selectedFund, selectedYear, selectedUsage, selectedBudgetType]);

  // ฟังก์ชันจัดการการเปลี่ยนปี
  const handleFiscalYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1100px", margin: "0 auto" }}>
      <Filters
        selectedUsage={selectedUsage}
        setSelectedUsage={setSelectedUsage}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        selectedBudgetType={selectedBudgetType}
        setSelectedBudgetType={setSelectedBudgetType}
        selectedFiscalYear={selectedYear}
        handleFiscalYearChange={handleFiscalYearChange}
        errorMessage={errorMessage}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 0.5fr", gap: "20px" }}>
        {loading ? (
          <p>กำลังโหลดข้อมูล...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <>
            {barData && barData.length > 0 ? (
              <BarChart data={barData} />
            ) : (
              <p>ไม่มีข้อมูลกราฟแท่งที่ตรงกับตัวกรอง</p>
            )}
            {pieData && pieData.length > 0 ? (
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
