import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import {
  summaryDepartmentDetails,
  // summaryDepartmentAssets,
  summaryFilterDepartmentDetails,
  summaryFilterDepartmentAssets,
  summaryDepartmentAssetsPerYear,
  summaryFilterDepartmentAssetsByStatus 
} from "./dataUtils";

const DashboardPage = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    department: "",
    assetStatus: "",
    fund: "",
    year: ""
  });

  const [barGraphs, setBarGraphs] = useState([]);
  const [pieData, setPieData] = useState(null);
  const [totalAssets, setTotalAssets] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const renderLoadingState = () => {
    return <p style={{ textAlign: "center" }}>กำลังโหลดข้อมูล...</p>;
  };

  const renderErrorState = () => {
    return <p style={{ textAlign: "center", color: "red" }}>{errorMessage}</p>;
  };

  const processBarGraphData = (data) => {
    const { fund, year } = filters;
  
    const barData1 = fund || year
      ? summaryFilterDepartmentDetails(data, fund, year)
      : summaryDepartmentDetails(data);
  
    const barData2 = summaryDepartmentAssetsPerYear(data); // แก้ตรงนี้
  
    setBarGraphs([ 
      {
        title: "งบประมาณ/แหล่งเงินในแต่ละปี",
        data: barData1,
        options: {
          scales: {
            x: { title: { display: true, text: "ปีงบประมาณ" } },
            y: { title: { display: true, text: "จำนวนงบประมาณ" } }
          }
        }
      },
      {
        title: "จำนวนครุภัณฑ์ของแต่ละภาควิชาในแต่ละปี",
        data: barData2,
        options: {
          scales: {
            x: { title: { display: true, text: "ปี" } },
            y: { title: { display: true, text: "จำนวนครุภัณฑ์" } }
          }
        }
      }
    ]);
  };

  const processTotalAssets = (data) => {
    const total = Object.values(data.statusSummaryByDepartment).flatMap(dep =>
      Object.values(dep).flatMap(status =>
        Object.values(status).flatMap(yearData => yearData || []))
    ).reduce((sum, val) => sum + val, 0);
    setTotalAssets(total);
  };

  const fetchData = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/getData");
      if (!res.ok) throw new Error("ไม่สามารถดึงข้อมูลจากเซิร์ฟเวอร์");

      const data = await res.json();
      console.log(data);  // เพิ่ม log เพื่อตรวจสอบข้อมูลที่ได้จาก API

      if (!data || !data.departmentAssets) {
        setErrorMessage("ข้อมูลไม่พร้อมใช้งาน");
        return;
      }

      processBarGraphData(data);
      processTotalAssets(data);

      if (data.statusSummaryByDepartment) {
        setPieData({
          labels: Object.keys(data.statusSummaryByDepartment),
          datasets: [
            {
              label: "ครุภัณฑ์ตามสถานะ",
              data: Object.values(data.statusSummaryByDepartment).map(dep =>
                Object.values(dep).reduce((sum, status) =>
                  sum + Object.values(status).reduce((s, yearData) => s + (yearData || 0), 0), 0)
              ),
              backgroundColor: ["#FF9999", "#66B3FF", "#99FF99", "#FFCC99"]
            }
          ]
        });
      }

    } catch (err) {
      setErrorMessage("ไม่สามารถดึงข้อมูลได้จากเซิร์ฟเวอร์");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (
      filters.department ||
      filters.assetStatus ||
      filters.fund ||
      filters.year
    ) {
      fetchData();
    }
  }, [filters]);
  
  
  const handleNavigateStatus = () => {
    navigate("/status", {
      state: {
        selectedDepartment: filters.department,
        selectedAssetStatus: filters.assetStatus,
        selectedFund: filters.fund,
        selectedYear: filters.year
      }
    });
  };

  const renderContent = () => {
    if (loading) return renderLoadingState();
    if (errorMessage) return renderErrorState();
    console.log(barGraphs);
    return (
      <>
        {/* กราฟแท่ง */}
        <div>
          <h3 style={styles.chartTitle}>กราฟแท่งเปรียบเทียบ</h3>
          {barGraphs?.length ? (
            <BarChart graphs={barGraphs} />
          ) : (
            <p style={{ textAlign: "center" }}>ไม่มีข้อมูลกราฟแท่งที่ตรงกับตัวกรอง</p>
          )}
        </div>

        {/* กราฟวงกลม */}
        <div>
          <h3 style={styles.chartTitle}>กราฟวงกลม</h3>
          {pieData?.datasets?.length ? (
            <PieChart data={pieData} />
          ) : (
            <p style={{ textAlign: "center" }}>ไม่มีข้อมูลกราฟวงกลมที่ตรงกับตัวกรอง</p>
          )}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button onClick={handleNavigateStatus} style={styles.statusButton}>
              ตรวจสอบสภาพครุภัณฑ์ <br /> คลิก
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div style={styles.container}>
      {/* ตัวกรอง */}
      <div style={styles.filterSection}>
        <Filters
          selectedDepartment={filters.department}
          setSelectedDepartment={(val) => handleFilterChange("department", val)}
          selectedAssetStatus={filters.assetStatus}
          setSelectedAssetStatus={(val) => handleFilterChange("assetStatus", val)}
          selectedFund={filters.fund}
          setSelectedFund={(val) => handleFilterChange("fund", val)}
          selectedYear={filters.year}
          handleYearChange={(e) => handleFilterChange("year", e.target.value)}
          errorMessage={errorMessage}
        />
      </div>

      {/* สรุปจำนวนครุภัณฑ์ */}
      <div style={styles.totalAssetsBox}>
        <h3 style={styles.totalAssetsText}>จำนวนครุภัณฑ์ทั้งหมดในระบบ: {totalAssets}</h3>
      </div>

      {/* ส่วนแสดงกราฟ */}
      <div style={styles.chartGrid}>
        {renderContent()}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1280px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#2c3e50"
  },
  filterSection: {
    marginBottom: "30px",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },
  totalAssetsBox: {
    textAlign: "center",
    marginTop: "20px",
    backgroundColor: "#dff0ff",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },
  totalAssetsText: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "bold",
    color: "#1f618d"
  },
  chartGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "16px",
    marginTop: "30px"
  },
  chartTitle: {
    textAlign: "center",
    fontSize: "20px",
    color: "#2c3e50",
    fontWeight: "bold",
    marginBottom: "8px"
  },
  statusButton: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "10px 18px",
    fontSize: "14px",
    fontWeight: "bold",
    borderRadius: "10px",
    cursor: "pointer",
    border: "none",
    marginTop: "20px",
    transition: "background-color 0.3s ease"
  }
};

export default DashboardPage;
// import React, { useState, useEffect } from "react";
// import Filters from "./Filters"; // ไฟล์ Filters
// import BarChart from "./BarChart"; // ไฟล์ BarChart
// import PieChart from "./PieChart"; // ไฟล์ PieChart

// const Dashboard = () => {
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [selectedAssetStatus, setSelectedAssetStatus] = useState("");
//   const [selectedFund, setSelectedFund] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");

//   const [graphData, setGraphData] = useState([]);

//   // ดึงข้อมูลจาก API เพื่อแสดงกราฟ
//   useEffect(() => {
//     const fetchGraphData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/getGraphData", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             selectedDepartment,
//             selectedAssetStatus,
//             selectedFund,
//             selectedYear,
//           }),
//         });

//         if (!response.ok) {
//           throw new Error("ไม่สามารถดึงข้อมูลกราฟ");
//         }

//         const data = await response.json();
//         setGraphData(data); // ค่าที่ได้รับจาก API จะถูกใช้ในการสร้างกราฟ
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchGraphData();
//   }, [selectedDepartment, selectedAssetStatus, selectedFund, selectedYear]);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Dashboard</h1>

//       {/* Filters Component */}
//       <Filters
//         selectedDepartment={selectedDepartment}
//         setSelectedDepartment={setSelectedDepartment}
//         selectedAssetStatus={selectedAssetStatus}
//         setSelectedAssetStatus={setSelectedAssetStatus}
//         selectedFund={selectedFund}
//         setSelectedFund={setSelectedFund}
//         selectedYear={selectedYear}
//         handleYearChange={(e) => setSelectedYear(e.target.value)}
//       />

//       {/* Bar Chart */}
//       <BarChart
//         graphs={[
//           {
//             title: "ยอดรวมแหล่งเงินแยกตามปี",
//             data: {
//               labels: graphData.years || [],
//               datasets: [
//                 {
//                   label: "แหล่งเงิน",
//                   data: graphData.fundData || [],
//                   backgroundColor: "rgba(75, 192, 192, 0.6)",
//                 },
//               ],
//             },
//             options: {
//               title: "กราฟยอดรวมแหล่งเงินแยกตามปี",
//               xTitle: "ปี",
//               yTitle: "ยอดรวม",
//             },
//           },
//         ]}
//       />

//       {/* Pie Chart */}
//       <PieChart
//         data={{
//           labels: graphData.assetStatusLabels || [],
//           datasets: [
//             {
//               data: graphData.assetStatusData || [],
//               backgroundColor: [
//                 "#FF6384",
//                 "#36A2EB",
//                 "#FFCE56",
//                 "#4BC0C0",
//               ],
//             },
//           ],
//         }}
//       />
//     </div>
//   );
// };

// export default Dashboard;
