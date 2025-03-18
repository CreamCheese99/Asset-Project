import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ลงทะเบียนประเภทกราฟที่ต้องการ
ChartJS.register(ArcElement, Tooltip, Legend);

// eslint-disable-next-line react/prop-types
const PieChart = ({ data }) => {
  const [chartData, setChartData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (data && data.labels && data.datasets) {
      setChartData(data);
    } else {
      setErrorMessage("ไม่สามารถดึงข้อมูลจากเซิร์ฟเวอร์");
    }
  }, [data]);

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div style={{ width: "320px", margin: "0 auto" }}>
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "320px", // กำหนดความสูงของคอนเทนเนอร์ของกราฟ
        }}
      >
        {chartData ? <Pie data={chartData} options={{ responsive: true }} /> : <p>กำลังโหลดข้อมูล...</p>}
      </div>
    </div>
  );
};

export default PieChart;
