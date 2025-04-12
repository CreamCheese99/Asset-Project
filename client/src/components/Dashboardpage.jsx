import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import {
  summaryDepartmentDetails,
  summaryFilterDepartmentDetails,
  summaryDepartmentAssetsPerYear,
  summaryFilterDepartmentAssetsByStatus,
  summaryFundPerYear,
  createAssetStatusPieCharts
} from "./dataUtils";

const DashboardPage = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    department: "",
    assetStatus: "",
    fund: "",
    year: ""
  });

  const [activeTab, setActiveTab] = useState("tab1"); // State for active tab
  const [barGraphs, setBarGraphs] = useState([]);
  const [pieData, setPieData] = useState(null);
  const [statusPieCharts, setStatusPieCharts] = useState([]); // สำหรับกราฟวงกลมแยกตามสถานะ
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
    try {
      console.log("กำลังประมวลผลข้อมูลกราฟแท่ง...");
      const { fund, year, department } = filters;
  
      // กราฟแท่งที่ 1: ข้อมูลงบประมาณ/แหล่งเงินในแต่ละปี
      const barData1 = summaryFundPerYear(data, year, fund);
  
      // กราฟแท่งที่ 2: เปรียบเทียบจำนวนแหล่งเงินของแต่ละภาควิชา
      const barData2 = summaryDepartmentDetails(data, year, fund);
  
      // กราฟแท่งที่ 3: ข้อมูลจำนวนครุภัณฑ์ของแต่ละภาควิชาในแต่ละปี
      const barData3 = summaryDepartmentAssetsPerYear(data, year, department);
  
      console.log("Bar Data 1:", barData1);
      console.log("Bar Data 2:", barData2);
      console.log("Bar Data 3:", barData3);
  
      setBarGraphs([
        {
          title: "แหล่งเงิน",
          data: barData1,
          options: {
            xTitle: "ปีงบประมาณ",
            yTitle: "จำนวนงบประมาณ (ล้านบาท)"
          }
        },
        {
          title: "งบประมาณแต่ละภาควิชา",
          data: barData2,
          options: {
            xTitle: "ปี",
            yTitle: "จำนวนงบประมาณ (ล้านบาท)"
          }
        },
        {
          title: "จำนวนครุภัณฑ์ของแต่ละภาควิชาในแต่ละปี",
          data: barData3,
          options: {
            xTitle: "ปี",
            yTitle: "จำนวนครุภัณฑ์"
          }
        }
      ]);
    } catch (error) {
      console.error("Error processing bar graph data:", error);
      setErrorMessage("เกิดข้อผิดพลาดในการประมวลผลข้อมูลกราฟแท่ง");
    }
  };
  
  const processPieChartData = (data) => {
    try {
      console.log("กำลังประมวลผลข้อมูลกราฟวงกลม...");
      const { department, assetStatus, year } = filters;
      
      if (data.statusSummaryByDepartment) {
        const statuses = Object.keys(data.statusSummaryByDepartment);
        
        // ถ้าไม่มีข้อมูลสถานะ ให้แสดงข้อความแจ้งเตือน
        if (statuses.length === 0) {
          console.warn("ไม่มีข้อมูลสถานะสำหรับกราฟวงกลม");
          return;
        }
  
        // สร้างข้อมูลสำหรับกราฟวงกลมสรุปสถานะทั้งหมด
        const pieChartData = {
          labels: statuses,
          datasets: [
            {
              label: "สถานะครุภัณฑ์",
              data: statuses.map(status => {
                // คำนวณยอดรวมของแต่ละสถานะ
                return Object.values(data.statusSummaryByDepartment[status]).reduce((sum, val) => sum + (val || 0), 0);
              }),
              backgroundColor: [
                "#FF9999", "#66B3FF", "#99FF99", "#FFCC99", "#FFFF99", "#FF99FF"
              ],borderColor: [
                "#FF6666", "#3399FF", "#66CC66", "#FFAA66", "#FFFF66", "#FF66FF"
              ],
              borderWidth: 1
            }
          ]
        };
  
        setPieData(pieChartData);
        
        // สร้างข้อมูลสำหรับกราฟวงกลมแยกตามสถานะ
        const pieCharts = createAssetStatusPieCharts(data, department, year);
        setStatusPieCharts(pieCharts);
        console.log("สร้างกราฟวงกลมแยกตามสถานะ:", pieCharts.length, "กราฟ");
      } else {
        console.warn("ไม่มีข้อมูล statusSummaryByDepartment");
      }
    } catch (error) {
      console.error("Error processing pie chart data:", error);
      setErrorMessage("เกิดข้อผิดพลาดในการประมวลผลข้อมูลกราฟวงกลม");
    }
  };



  const processTotalAssets = (data) => {
    try {
      // ตรวจสอบว่ามีข้อมูล statusSummaryByDepartment หรือไม่
      if (!data.statusSummaryByDepartment) {
        console.warn("ไม่มีข้อมูล statusSummaryByDepartment");
        setTotalAssets(0);
        return;
      }

      // คำนวณจำนวนครุภัณฑ์ทั้งหมด
      let total = 0;

      Object.keys(data.statusSummaryByDepartment).forEach(status => {
        Object.values(data.statusSummaryByDepartment[status]).forEach(value => {
          total += value || 0;
        });
      });

      setTotalAssets(total);
    } catch (error) {
      console.error("Error processing total assets:", error);
      setTotalAssets(0);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      console.log("เริ่มการดึงข้อมูล...");
      
      const res = await fetch("http://localhost:5000/api/getData");
      
      if (!res.ok) {
        throw new Error(`ไม่สามารถดึงข้อมูลจากเซิร์ฟเวอร์: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log("ดึงข้อมูลสำเร็จ:", Object.keys(data));

      if (!data) {
        setErrorMessage("ไม่พบข้อมูล");
        return;
      }

      // นำข้อมูล filters มาใช้กรองข้อมูล
      const filteredData = { ...data };
      
      // กรองข้อมูลตาม filter ที่เลือก (อิมพลีเมนต์การกรองตามความเหมาะสม)
      
      processBarGraphData(filteredData);
      processPieChartData(filteredData);
      processTotalAssets(filteredData);

    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
      setErrorMessage(`ไม่สามารถดึงข้อมูลได้จากเซิร์ฟเวอร์: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const renderTab1Content = () => {
    if (loading) return renderLoadingState();
    if (errorMessage) return renderErrorState();
    
    return (
      <div className="tab-content">
        {/* Bar Chart 1 - งบประมาณ/แหล่งเงินในแต่ละปี */}
        {barGraphs?.length > 0 && barGraphs[0]?.data?.datasets?.length ? (
          <div className="chart-container">
            <h3 style={styles.chartTitle}>{barGraphs[0].title}</h3>
            <BarChart graphs={[barGraphs[0]]} />
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>ไม่มีข้อมูลกราฟแท่งที่ตรงกับตัวกรอง</p>
        )}

        {/* Bar Chart 2 - เปรียบเทียบจำนวนแหล่งเงินของแต่ละภาควิชา */}
        {barGraphs?.length > 1 && barGraphs[1]?.data?.datasets?.length ? (
          <div className="chart-container">
            <h3 style={styles.chartTitle}>{barGraphs[1].title}</h3>
            <BarChart graphs={[barGraphs[1]]} />
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>ไม่มีข้อมูลกราฟแท่งเปรียบเทียบแหล่งเงินที่ตรงกับตัวกรอง</p>
        )}

        {/* Pie Chart - สรุปสถานะครุภัณฑ์ */}
        <div className="chart-container">
  <h3 style={styles.chartTitle}>รวมสถานะในระบบ</h3>
  {pieData?.datasets?.length ? (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}> {/* เพิ่มความกว้างให้กับ container ของกราฟสรุปรวม */}
      <PieChart 
        data={pieData} 
        title="สัดส่วนสถานะครุภัณฑ์ทั้งหมด" 
        isStatusSummary={true} /* เพิ่ม prop เพื่อระบุว่าเป็นกราฟสรุปสถานะรวม */
      />
    </div>
  ) : (
    <p style={{ textAlign: "center" }}>ไม่มีข้อมูลกราฟวงกลมที่ตรงกับตัวกรอง</p>
  )}
</div>
      </div>
    );
  };

// ในฟังก์ชัน renderTab2Content
const renderTab2Content = () => {
  if (loading) return renderLoadingState();
  if (errorMessage) return renderErrorState();
  
  return (
    <div className="tab-content">
      <h2 style={styles.tabTitle}>สภาพการครุภัณฑ์</h2>
      
      {/* กลุ่มกราฟวงกลมตามสถานะ */}
      <div style={styles.pieChartGrid}>
        {statusPieCharts.length > 0 ? (
          statusPieCharts.map((chart, index) => (
            <div key={index} style={styles.pieChartContainer}>
              <h3 style={styles.pieChartTitle}>
                {chart.title} ({chart.totalValue} รายการ)
              </h3>
              <PieChart data={chart.data} title={chart.title} />
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>ไม่มีข้อมูลกราฟวงกลมที่ตรงกับตัวกรอง</p>
        )}
      </div>
    </div>
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
          handleYearChange={(val) => handleFilterChange("year", val)}
          errorMessage={errorMessage}
        />
      </div>

      {/* สรุปจำนวนครุภัณฑ์ */}
      <div style={styles.totalAssetsBox}>
        <h3 style={styles.totalAssetsText}>จำนวนครุภัณฑ์ทั้งหมดในระบบ: {totalAssets}</h3>
      </div>

      {/* Tab Navigation */}
      <div style={styles.tabNavigation}>
        <button 
          style={activeTab === "tab1" ? styles.activeTab : styles.inactiveTab}
          onClick={() => setActiveTab("tab1")}
        >
          ภาพรวม
        </button>
        <button 
          style={activeTab === "tab2" ? styles.activeTab : styles.inactiveTab}
          onClick={() => setActiveTab("tab2")}
        >
          สภาพการครุภัณฑ์
        </button>
      </div>

      {/* Tab Content */}
      <div style={styles.chartGrid}>
        {activeTab === "tab1" ? renderTab1Content() : renderTab2Content()}
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
    marginBottom: "20px",
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
  tabNavigation: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px"
  },
  activeTab: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px 8px 0 0",
    border: "none",
    borderBottom: "4px solid #2980b9",
    fontWeight: "bold",
    cursor: "pointer"
  },
  inactiveTab: {
    backgroundColor: "#f1f1f1",
    color: "#555",
    padding: "10px 20px",
    borderRadius: "8px 8px 0 0",
    border: "none",
    borderBottom: "4px solid #ddd",
    cursor: "pointer"
  },
  chartGrid: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },
  chartTitle: {
    textAlign: "center",
    fontSize: "20px",
    color: "#2c3e50",
    fontWeight: "bold",
    marginBottom: "15px"
  },
  tabTitle: {
    textAlign: "center",
    fontSize: "24px",
    color: "#2c3e50",
    fontWeight: "bold",
    margin: "0 0 30px 0",
    padding: "10px",
    backgroundColor: "#e8f5e9",
    borderRadius: "8px"
  },
  pieChartGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  },
  pieChartContainer: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  pieChartTitle: {
    textAlign: "center",
    fontSize: "18px",
    color: "#2c3e50",
    fontWeight: "bold",
    marginBottom: "10px"
  }
};

export default DashboardPage;