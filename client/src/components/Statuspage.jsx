import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PieChart from "./PieChart";
import { 
  summaryFilterDepartmentAssetsByStatus 
} from "./dataUtils";

const StatusPage = () => {
  const location = useLocation();
  const { selectedDepartment, selectedAssetStatus, selectedFund, selectedYear } = location.state;

  const [pieData, setPieData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch the filtered data based on the selected parameters
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

      // Filter data for the selected department, status, and other filters
      if (selectedDepartment || selectedAssetStatus || selectedFund || selectedYear) {
        setPieData(
          summaryFilterDepartmentAssetsByStatus(data, selectedDepartment, selectedAssetStatus, selectedYear)
        );
      } else {
        setPieData(summaryFilterDepartmentAssetsByStatus(data)); // Adjust the function as per requirement
      }
    } catch (error) {
      setErrorMessage("ไม่สามารถดึงข้อมูลได้จากเซิร์ฟเวอร์");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDepartment, selectedAssetStatus, selectedFund, selectedYear]);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", fontSize: "30px" }}>สถานะครุภัณฑ์</h1>
      
      {/* Display Error Message */}
      {errorMessage && <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>}

      {/* Display loading message */}
      {loading ? (
        <p style={{ textAlign: "center" }}>กำลังโหลดข้อมูล...</p>
      ) : (
        <div>
          <h2 style={{ textAlign: "center" }}>สถานะของครุภัณฑ์แต่ละภาควิชา</h2>
          
          {/* Display Pie chart for each department status */}
          {pieData && pieData.datasets && pieData.datasets.length > 0 ? (
            pieData.datasets.map((dataset, index) => (
              <div key={index} style={{ marginBottom: "30px" }}>
                <h3 style={{ textAlign: "center" }}>
                  สถานะครุภัณฑ์: {dataset.label}
                </h3>
                <PieChart data={dataset} />
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>ไม่มีข้อมูลสถานะครุภัณฑ์ที่ตรงกับตัวกรอง</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StatusPage;