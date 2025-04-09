import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import { 
  summaryDepartmentDetails, 
  summaryDepartmentAssets, 
  summaryFilterDepartmentAssets, 
  summaryFilterDepartmentDetails 
} from "./dataUtils";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedAssetStatus, setSelectedAssetStatus] = useState("");
  const [selectedFund, setSelectedFund] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [totalAssets, setTotalAssets] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch data from API
  const fetchData = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch("http://localhost:5000/api/getData"); // API URL
      if (!response.ok) {
        throw new Error("ไม่สามารถดึงข้อมูลจากเซิร์ฟเวอร์");
      }

      const data = await response.json();
      console.log("Data received from API:", data);

      // Calculate chart data based on filters
      if (selectedDepartment || selectedAssetStatus || selectedFund || selectedYear) {
        setBarData(
          summaryFilterDepartmentDetails(data, selectedDepartment, selectedFund, selectedYear)
        );
        setPieData(
          summaryFilterDepartmentAssets(data, selectedDepartment, selectedAssetStatus, selectedYear)
        );
      } else {
        setBarData(summaryDepartmentDetails(data));
        setPieData(summaryDepartmentAssets(data)); 
      }

      // Calculate total assets
      const totalAssets = Object.values(data.departmentAssets).reduce((sum, department) => {
        return sum + Object.values(department).reduce((subSum, assetStatus) => {
          return subSum + Object.values(assetStatus).reduce((finalSum, yearData) => {
            return finalSum + yearData.reduce((acc, val) => acc + val, 0);
          }, 0);
        }, 0);
      }, 0);

      setTotalAssets(totalAssets);

    } catch (error) {
      setErrorMessage("ไม่สามารถดึงข้อมูลได้จากเซิร์ฟเวอร์");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Use effect hook to fetch data when filters change
  useEffect(() => {
    fetchData();
  }, [selectedDepartment, selectedAssetStatus, selectedFund, selectedYear]);

  // Handle year change
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Navigate to the status page with filter parameters
  const handleStatusPage = () => {
    navigate("/status", {
      state: {
        selectedDepartment,
        selectedAssetStatus,
        selectedFund,
        selectedYear
      }
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      {/* Filters Section */}
      <div style={{ marginBottom: "20px" }}>
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
      </div>

      {/* Total Assets Display */}
      <div style={{ textAlign: "center", marginTop: "20px", backgroundColor: "#f1f1f1", padding: "10px", borderRadius: "8px" }}>
        <h3 style={{ margin: "0", fontSize: "24px" }}>จำนวนครุภัณฑ์ทั้งหมดในระบบ: {totalAssets}</h3>
      </div>

      {/* Main Content (Charts & Data) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
        {loading ? (
          <p style={{ textAlign: "center" }}>กำลังโหลดข้อมูล...</p>
        ) : errorMessage ? (
          <p style={{ textAlign: "center", color: "red" }}>{errorMessage}</p>
        ) : (
          <>
            {/* Bar Chart Section */}
            <div>
              <h3 style={{ textAlign: "center", fontSize: "22px" }}>กราฟแท่งเปรียบเทียบ</h3>
              {barData && barData.datasets && barData.datasets.length > 0 ? (
                <>
                  <h4 style={{ fontSize: "18px", textAlign: "center" }}>งบประมาณ/แหล่งเงินในแต่ละปี</h4>
                  <BarChart data={barData} />
                  <h4 style={{ fontSize: "18px", textAlign: "center" }}>ครุภัณฑ์ตามหมวดหมู่ในแต่ละปีของแต่ละภาควิชา</h4>
                  <BarChart data={barData} />
                </>
              ) : (
                <p style={{ textAlign: "center" }}>ไม่มีข้อมูลกราฟแท่งที่ตรงกับตัวกรอง</p>
              )}
            </div>

            {/* Pie Chart Section */}
            <div>
              <h3 style={{ textAlign: "center", fontSize: "22px" }}>กราฟวงกลม</h3>
              {pieData && pieData.datasets && pieData.datasets.length > 0 ? (
                <PieChart data={pieData} />
              ) : (
                <p style={{ textAlign: "center" }}>ไม่มีข้อมูลกราฟวงกลมที่ตรงกับตัวกรอง</p>
              )}
            </div>

            {/* Button to check asset status below Pie chart */}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                onClick={handleStatusPage}
                style={{
                  backgroundColor: "#00aaff",
                  color: "white",
                  padding: "15px 25px",
                  fontSize: "18px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  border: "none",
                  whiteSpace: "nowrap"
                }}
              >
                ตรวจสอบสภาพครุภัณฑ์ <br /> คลิก
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
