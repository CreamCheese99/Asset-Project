import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PieChart from "./PieChart";
import { 
  summaryFilterDepartmentAssetsByStatus 
} from "./dataUtils";

const StatusPage = () => {
  const location = useLocation();
  const navigate = useNavigate();  // สำหรับไปยังหน้า Dashboard
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

  // Function to handle going back to the Dashboard page
  const handleNavigateDashboardPage = () => {
    navigate("/"); // ปรับ URL เป็นหน้า Dashboard
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", fontSize: "30px", marginBottom: "20px" }}>สถานะครุภัณฑ์</h1>

      {/* Display Error Message */}
      {errorMessage && <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>}

      {/* Display loading message */}
      {loading ? (
        <p style={{ textAlign: "center" }}>กำลังโหลดข้อมูล...</p>
      ) : (
        <div>
          <h2 style={{ textAlign: "center", marginBottom: "30px" }}>สถานะของครุภัณฑ์แต่ละภาควิชา</h2>

          {/* Display Pie chart for each department status */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
            {pieData && pieData.datasets && pieData.datasets.length > 0 ? (
              pieData.datasets
                .sort((a, b) => {
                  // Sorting to ensure the statuses appear in the desired order
                  const order = [
                    "ใช้งาน", "ส่งซ่อม", "ชำรุด", "บริจาค/โอน", "รับโอน", "จำหน่าย"
                  ];
                  return order.indexOf(a.label) - order.indexOf(b.label);
                })
                .map((dataset, index) => (
                  <div key={index} style={{ marginBottom: "30px", width: "30%" }}>
                    <h3 style={{ textAlign: "center", fontSize: "18px", fontWeight: "600", color: "#333" }}>
                      สถานะครุภัณฑ์: {dataset.label}
                    </h3>
                    <PieChart data={dataset} />
                  </div>
                ))
            ) : (
              <p style={{ textAlign: "center" }}>ไม่มีข้อมูลสถานะครุภัณฑ์ที่ตรงกับตัวกรอง</p>
            )}
          </div>
        </div>
      )}

      {/* Button to go back to the dashboard */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button 
          onClick={handleNavigateDashboardPage} 
          style={{
            padding: "12px 24px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          ย้อนกลับไปยังหน้าหลัก
        </button>
      </div>
    </div>
  );
};

export default StatusPage;
