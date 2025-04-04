import { useState, useEffect } from "react";
import axios from "axios";
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

  // ฟังก์ชันดึงข้อมูลจาก API ด้วย axios
  const fetchData = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.get("http://localhost:5001/api/getData");
      const data = response.data;
      console.log("Data received from API:", data);

      if (selectedDepartment || selectedAssetStatus || selectedFund || selectedYear) {
        console.log("Filter parameters:", { selectedDepartment, selectedFund, selectedYear });

        setBarData(summaryFilterDepartmentDetails(data, selectedDepartment, selectedFund, selectedYear));
        setPieData(summaryFilterDepartmentAssets(data, selectedDepartment, selectedAssetStatus, selectedYear));
      } else {
        setBarData(summaryDepartmentDetails(data));
        setPieData(summaryDepartmentAssets(data));
      }
    } catch (error) {
      setErrorMessage("ไม่สามารถดึงข้อมูลได้จากเซิร์ฟเวอร์");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // เรียก fetchData เมื่อมีการเปลี่ยนแปลงค่าตัวกรอง
  useEffect(() => {
    fetchData();
  }, [selectedDepartment, selectedAssetStatus, selectedFund, selectedYear]);

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
        handleYearChange={(e) => setSelectedYear(e.target.value)}
        errorMessage={errorMessage}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 0.5fr", gap: "20px" }}>
        {loading ? (
          <p>กำลังโหลดข้อมูล...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <>
            {barData?.datasets?.length > 0 ? <BarChart data={barData} /> : <p>ไม่มีข้อมูลกราฟแท่งที่ตรงกับตัวกรอง</p>}
            {pieData?.datasets?.length > 0 ? <PieChart data={pieData} /> : <p>ไม่มีข้อมูลกราฟวงกลมที่ตรงกับตัวกรอง</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
