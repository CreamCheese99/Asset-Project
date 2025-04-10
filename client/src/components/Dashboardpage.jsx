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

  // State สำหรับตัวกรอง
  const [filters, setFilters] = useState({
    department: "",
    assetStatus: "",
    fund: "",
    year: ""
  });

  // State สำหรับข้อมูล
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [totalAssets, setTotalAssets] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const fetchData = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/getData");
      if (!res.ok) throw new Error("ไม่สามารถดึงข้อมูลจากเซิร์ฟเวอร์");

      const data = await res.json();

      const { department, assetStatus, fund, year } = filters;

      // สรุปข้อมูลจาก filter หรือทั้งหมด
      setBarData(
        department || fund || year
          ? summaryFilterDepartmentDetails(data, department, fund, year)
          : summaryDepartmentDetails(data)
      );

      setPieData(
        department || assetStatus || year
          ? summaryFilterDepartmentAssets(data, department, assetStatus, year)
          : summaryDepartmentAssets(data)
      );

      // รวมยอดครุภัณฑ์ทั้งหมด
      const total = Object.values(data.departmentAssets).flatMap(dep =>
        Object.values(dep).flatMap(status =>
          Object.values(status).flatMap(yearData => yearData)
        )
      ).reduce((sum, val) => sum + val, 0);

      setTotalAssets(total);

    } catch (err) {
      setErrorMessage("ไม่สามารถดึงข้อมูลได้จากเซิร์ฟเวอร์");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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

  return (
    <div style={styles.container}>
      {/* ส่วนตัวกรอง */}
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

      {/* สรุปจำนวนทั้งหมด */}
      <div style={styles.totalAssetsBox}>
        <h3 style={styles.totalAssetsText}>จำนวนครุภัณฑ์ทั้งหมดในระบบ: {totalAssets}</h3>
      </div>

      {/* ส่วนกราฟ */}
      <div style={styles.chartGrid}>
        {loading ? (
          <p style={{ textAlign: "center" }}>กำลังโหลดข้อมูล...</p>
        ) : errorMessage ? (
          <p style={{ textAlign: "center", color: "red" }}>{errorMessage}</p>
        ) : (
          <>
            {/* กราฟแท่ง */}
            <div>
              <h3 style={styles.chartTitle}>กราฟแท่งเปรียบเทียบ</h3>
              {barData?.datasets?.length ? (
                <>
                  <h4 style={styles.chartSubtitle}>งบประมาณ/แหล่งเงินในแต่ละปี</h4>
                  <BarChart data={barData} />
                  <h4 style={styles.chartSubtitle}>ครุภัณฑ์ตามหมวดหมู่ในแต่ละปีของแต่ละภาควิชา</h4>
                  <BarChart data={barData} />
                </>
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
        )}
      </div>
    </div>
  );
};

// 💡 แยก Style ออกมาให้อ่านง่ายขึ้น
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
    fontSize: "20px",  // ลดขนาดฟอนต์ให้เล็กลง
    fontWeight: "bold",
    color: "#1f618d"
  },
  chartGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginTop: "30px"
  },
  chartCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease"
  },
  chartCardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 6px 15px rgba(0,0,0,0.15)"
  },
  chartTitle: {
    textAlign: "center",
    fontSize: "22px",
    color: "#2c3e50",
    fontWeight: "bold",
    marginBottom: "12px"
  },
  chartSubtitle: {
    fontSize: "16px",
    textAlign: "center",
    color: "#7f8c8d",
    fontWeight: "500",
    marginBottom: "10px"
  },
  statusButton: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "10px",
    cursor: "pointer",
    border: "none",
    marginTop: "20px",
    transition: "background-color 0.3s ease",
  }
};

export default DashboardPage;
