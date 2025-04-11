import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import {
  summaryDepartmentDetails,
  summaryDepartmentAssets,
  summaryFilterDepartmentDetails,
  summaryFilterDepartmentAssets
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
    const { fund, year, department } = filters;
    const barData1 = fund || year
      ? summaryFilterDepartmentDetails(data, fund, year)
      : summaryDepartmentDetails(data);

    const barData2 = department || year
      ? summaryFilterDepartmentAssets(data, department, year)
      : summaryDepartmentAssets(data);

    setBarGraphs([
      {
        title: "งบประมาณ/แหล่งเงินในแต่ละปี",
        data: barData1,
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: "ปีงบประมาณ"
              }
            },
            y: {
              title: {
                display: true,
                text: "จำนวนงบประมาณ"
              }
            }
          }
        }
      },
      {
        title: "ครุภัณฑ์ตามสถานะในแต่ละปีของแต่ละภาควิชา",
        data: barData2,
        options: {
          indexAxis: "y",
          scales: {
            x: {
              title: {
                display: true,
                text: "จำนวนครุภัณฑ์"
              }
            },
            y: {
              title: {
                display: true,
                text: "ปีงบประมาณ"
              }
            }
          }
        }
      }
    ]);
  };

  const processTotalAssets = (data) => {
    const total = Object.values(data.departmentAssets).flatMap(dep =>
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
      const { department = "", assetStatus = "", fund = "", year = "" } = filters ? filters : {};

      if (!data.departmentAssets) {
        setErrorMessage("ข้อมูลภาควิชาและสถานะครุภัณฑ์ไม่พร้อมใช้งาน");
        return;
      }

      processBarGraphData(data);
      processTotalAssets(data);

      if (data.departmentAssets) {
        setPieData({
          labels: Object.keys(data.departmentAssets),
          datasets: [
            {
              label: "ครุภัณฑ์ตามสถานะ",
              data: Object.values(data.departmentAssets).map(dep =>
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
    
    if (filters.department || filters.assetStatus || filters.fund || filters.year) {
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
