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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useState, useEffect } from "react";

// ลงทะเบียนประเภทกราฟและ plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const BarChart = ({ graphs = [] }) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log('Graphs ที่ได้รับ:', graphs);  // ตรวจสอบข้อมูลที่ส่งเข้ามา
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
    return <p style={{ textAlign: "center", color: "red" }}>{errorMessage}</p>;
  }

  return (
    <div className="space-y-6">
      {graphs.map((graph, index) => (
        <div
          key={index}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginBottom: "24px",
          }}
        >
          {graph.title && (
            <h3
              style={{
                textAlign: "center",
                marginBottom: "16px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#2c3e50"
              }}
            >
              {graph.title}
            </h3>
          )}
          <div style={{ height: "400px", position: "relative" }}>
            <Bar
              data={graph.data}
              options={{
                indexAxis: graph.options?.indexAxis || "x",
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  datalabels: {
                    anchor: 'end',
                    align: 'top',
                    formatter: (value) => value,
                    font: {
                      weight: 'bold',
                      size: 12
                    },
                    color: '#000'
                  },
                  legend: {
                    position: "top",
                    labels: {
                      padding: 15,
                      usePointStyle: true,
                      pointStyle: 'rect',
                      font: {
                        size: 12
                      }
                    }
                  },
                  title: {
                    display: !!graph.options?.title,
                    text: graph.options?.title || "",
                    font: {
                      size: 16,
                      weight: 'bold'
                    },
                    padding: {
                      top: 10,
                      bottom: 20
                    }
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        const label = context.dataset.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value}`;
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    title: {
                      display: !!graph.options?.xTitle,
                      text: graph.options?.xTitle || "",
                      font: {
                        size: 14,
                        weight: "bold",
                      },
                      padding: { top: 10, bottom: 0 }
                    },
                    ticks: {
                      maxRotation: 45,
                      minRotation: 45
                    }
                  },
                  y: {
                    title: {
                      display: !!graph.options?.yTitle,
                      text: graph.options?.yTitle || "",
                      font: {
                        size: 14,
                        weight: "bold",
                      },
                      padding: { top: 0, bottom: 0 }
                    },
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
