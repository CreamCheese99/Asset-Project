import { useState, useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// ลงทะเบียนประเภทกราฟที่ต้องการ
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ data, title, isStatusSummary = false }) => {
  const [chartData, setChartData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && data.labels && data.datasets) {
      try {
        const processedData = {
          ...data,
          labels: data.labels, // ใช้ label ดั้งเดิม
          originalLabels: [...data.labels],
        };
        setChartData(processedData);
        setErrorMessage("");
      } catch (error) {
        console.error("Error processing chart data:", error);
        setErrorMessage("เกิดข้อผิดพลาดในการประมวลผลข้อมูลกราฟ");
      }
    } else {
      setErrorMessage("ไม่สามารถดึงข้อมูลจากเซิร์ฟเวอร์");
    }
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isStatusSummary ? 'right' : 'right',
        labels: {
          padding: 8,
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 10,
          boxHeight: 10,
          font: {
            size: isStatusSummary ? 10 : 9,
            weight: 'normal'
          },
          generateLabels: function(chart) {
            const data = chart.data;
            if (data.labels && data.datasets && data.datasets.length) {
              const labels = data.originalLabels || data.labels;
              return labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                if (!meta || !meta.controller) return null;
                const style = meta.controller.getStyle(i);
                const value = data.datasets[0].data[i];

                let displayLabel = label;
                if (!isStatusSummary && displayLabel.length > 15) {
                  displayLabel = displayLabel.substring(0, 15) + '...';
                }

                // เปลี่ยนเป็น: จำนวน:ชื่อสถานะ
                displayLabel = `${value}: ${displayLabel}`;

                return {
                  text: displayLabel,
                  fillStyle: style.backgroundColor,
                  strokeStyle: style.borderColor,
                  lineWidth: style.borderWidth,
                  hidden: !chart.getDataVisibility(i),
                  index: i
                };
              }).filter(item => item !== null);
            }
            return [];
          }
        },
        maxHeight: isStatusSummary ? 500 : 200,
        maxWidth: isStatusSummary ? 800 : 120
      },
      title: {
        display: !!title,
        text: title || '',
        font: {
          size: isStatusSummary ? 16 : 14,
          weight: 'bold'
        },
        padding: {
          top: 8,
          bottom: 10
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            if (!chartData || !chartData.originalLabels) return '';
            try {
              const originalLabel = chartData.originalLabels[context.dataIndex];
              const value = context.raw || 0;
              return `${value}: ${originalLabel}`; // เปลี่ยนเป็น จำนวน:ชื่อ
            } catch (error) {
              console.error("Error in tooltip callback:", error);
              return '';
            }
          }
        }
      },
      doughnutLabels: {
        id: 'doughnutLabels',
        afterDraw: function(chart) {
          if (!chart || !chart.data || !chart.data.labels) return;

          try {
            const width = chart.width;
            const height = chart.height;
            const ctx = chart.ctx;

            ctx.save();

            const labelSize = Math.min(width, height) * 0.05;
            ctx.font = `${labelSize}px Arial`;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';

            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) / 2.5;

            chart.data.labels.forEach((label, i) => {
              const meta = chart.getDatasetMeta(0);
              if (!meta || !meta.data || !meta.data[i]) return;

              const arc = meta.data[i];

              const angle = Math.PI / 2 - arc.startAngle - (arc.endAngle - arc.startAngle) / 2;
              const x = centerX + radius * 0.7 * Math.cos(angle);
              const y = centerY - radius * 0.7 * Math.sin(angle);

              const arcAngle = arc.endAngle - arc.startAngle;
              if (arcAngle > 0.2) {
                ctx.fillStyle = 'white';
                // ไม่แสดง label ตรงกลาง
                // ctx.fillText(label, x, y);
              }
            });

            ctx.restore();
          } catch (error) {
            console.error("Error in doughnutLabels plugin:", error);
          }
        }
      }
    }
  };

  const registerPlugin = () => {
    try {
      if (chartRef.current) {
        const currentChart = chartRef.current;
        if (currentChart?.config?.options?.plugins?.doughnutLabels) {
          return;
        }
      }

      const existingPlugin = ChartJS.registry.plugins.get('doughnutLabels');
      if (!existingPlugin) {
        const doughnutLabelsPlugin = {
          id: 'doughnutLabels',
          afterDraw: options.plugins.doughnutLabels.afterDraw
        };
        ChartJS.register(doughnutLabelsPlugin);
      }
    } catch (error) {
      console.error("Error registering plugin:", error);
    }
  };

  useEffect(() => {
    registerPlugin();

    return () => {
      try {
        const existingPlugin = ChartJS.registry.plugins.get('doughnutLabels');
        if (existingPlugin) {
          ChartJS.unregister(existingPlugin);
        }
      } catch (error) {
        console.error("Error unregistering plugin:", error);
      }
    };
  }, []);

  if (errorMessage) {
    return <p style={{ textAlign: "center", color: "red" }}>{errorMessage}</p>;
  }

  return (
    <div style={{
      margin: "0 auto",
      maxWidth: isStatusSummary ? "500px" : "320px",
      width: "100%"
    }}>
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: isStatusSummary ? "15px" : "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: isStatusSummary ? "350px" : "260px",
        }}
      >
        {chartData ? (
          <Pie
            ref={chartRef}
            data={chartData}
            options={options}
          />
        ) : (
          <p>กำลังโหลดข้อมูล...</p>
        )}
      </div>
    </div>
  );
};

export default PieChart;
