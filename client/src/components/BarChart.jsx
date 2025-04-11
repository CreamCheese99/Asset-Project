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

// ลงทะเบียนประเภทกราฟ
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// eslint-disable-next-line react/prop-types
const BarChart = ({ graphs = [] }) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log('📊 Graphs ที่ได้รับ:', graphs);
    const hasInvalidData = graphs.some(
      (g) => !g.data || !g.data.labels || !g.data.datasets || g.data.labels.length === 0
    );
    if (hasInvalidData) {
      setErrorMessage("ไม่สามารถดึงข้อมูลจากเซิร์ฟเวอร์หรือไม่มีข้อมูลที่ตรงกับตัวกรอง");
    } else {
      setErrorMessage("");
    }
  }, [graphs]);

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div className="space-y-6">
      {graphs.map((graph, index) => (
        <div
          key={index}
          style={{
            background: "#fff",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          {graph.title && (
            <h3
              style={{
                textAlign: "center",
                marginBottom: "10px",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              {graph.title}
            </h3>
          )}
          <Bar
            data={graph.data}
            options={{
              indexAxis: graph.options?.indexAxis || "x",
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: !!graph.options?.title,
                  text: graph.options?.title || "",
                },
              },
              responsive: true,
              scales: {
                x: {
                  title: {
                    display: !!graph.options?.xTitle,
                    text: graph.options?.xTitle || "",
                    font: {
                      size: 14,
                      weight: "bold",
                    },
                  },
                },
                y: {
                  title: {
                    display: !!graph.options?.yTitle,
                    text: graph.options?.yTitle || "",
                    font: {
                      size: 14,
                      weight: "bold",
                    },
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default BarChart;
