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
import { BarChart2 } from "lucide-react";

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
const Barchart2 = ({ data }) => {
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
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        marginBottom: "30px",
      }}
    >
      {chartData && (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'กราฟแสดงครุภัณฑ์ตามหมวดหมู่ในแต่ละปีของแต่ละภาควิชา',
                font: {
                  size: 20,
                  weight: 'bold',
                },
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `จำนวน: ${tooltipItem.raw}`; // แสดงจำนวนที่กราฟแท่ง
                  },
                },
              },
              legend: {
                position: "top",
                labels: {
                  font: {
                    size: 14,
                    weight: 'bold',
                  },
                  color: '#333',
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'ปี',
                  font: {
                    size: 16,
                  },
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'จำนวน',
                  font: {
                    size: 16,
                  },
                },
                beginAtZero: true, // เริ่มที่ศูนย์
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default BarChart2;
