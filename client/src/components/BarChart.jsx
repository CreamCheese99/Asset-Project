import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";

// ลงทะเบียนประเภทกราฟที่ต้องการ
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// eslint-disable-next-line react/prop-types
const BarChart = ({ data }) => {
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
    <div
      style={{
        background: "#fff",
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {/* <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>กราฟแท่ง</h3> */}
      {chartData && (
        <Bar
          data={chartData}
          options={{
            plugins: {
              legend: {
                position: "top",
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default BarChart;
