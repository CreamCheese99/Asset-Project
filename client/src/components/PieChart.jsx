import { useState, useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// ลงทะเบียนประเภทกราฟที่ต้องการ
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ data, title, isStatusSummary = false }) => {  // เพิ่ม prop isStatusSummary
  const [chartData, setChartData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && data.labels && data.datasets) {
      try {
        // คำนวณเปอร์เซ็นต์สำหรับแสดงใน labels
        const total = data.datasets[0].data.reduce((sum, value) => sum + value, 0);
        
        const processedData = {
          ...data,
          // แสดงค่า % ใน labels
          labels: data.labels.map((label, index) => {
            const value = data.datasets[0].data[index];
            const percentage = Math.round((value / total) * 100);
            return `${percentage}%`;
          }),
          originalLabels: [...data.labels] // เก็บ labels ดั้งเดิมไว้สำหรับแสดงใน legend
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

  // กำหนดตัวเลือกของกราฟ
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isStatusSummary ? 'right' : 'right',  // เปลี่ยนตำแหน่ง legend สำหรับกราฟสรุปรวม
        labels: {
          padding: 8,
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 10,
          boxHeight: 10,
          font: {
            size: isStatusSummary ? 10 : 9,  // ขนาดตัวอักษรใหญ่ขึ้นสำหรับกราฟสรุปรวม
            weight: 'normal'
          },
          // ปรับการแสดงชื่อใน legend
          generateLabels: function(chart) {
            const data = chart.data;
            if (data.labels && data.labels.length && data.datasets && data.datasets.length) {
              // ตรวจสอบว่ามี originalLabels หรือไม่
              const labels = data.originalLabels || data.labels;
              
              return labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                if (!meta || !meta.controller) return null;
                const style = meta.controller.getStyle(i);
                
                // แสดงชื่อเต็มสำหรับกราฟสรุปรวม
                let displayLabel = label;
                if (!isStatusSummary && displayLabel.length > 15) {
                  displayLabel = displayLabel.substring(0, 15) + '...';
                }
                
                // เพิ่มค่าจำนวนและเปอร์เซ็นต์ในชื่อสำหรับกราฟสรุปรวม
                if (isStatusSummary) {
                  const value = data.datasets[0].data[i];
                  const total = data.datasets[0].data.reduce((sum, val) => sum + val, 0);
                  const percentage = Math.round((value / total) * 100);
                 // displayLabel = `${displayLabel}: ${value} (${percentage}%)`;
                 displayLabel = `${displayLabel}: ${value}`;
                }
                
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
        // ปรับการแสดง legend
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
            // แสดงข้อมูลใน tooltip
            if (!chartData || !chartData.originalLabels) return '';
            
            try {
              const originalLabel = chartData.originalLabels[context.dataIndex];
              const value = context.raw || 0;
              const total = chartData.datasets[0].data.reduce((sum, val) => sum + val, 0);
              const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
              return `${originalLabel}: ${value} (${percentage}%)`;
            } catch (error) {
              console.error("Error in tooltip callback:", error);
              return '';
            }
          }
        }
      },
      // custom plugin ยังคงเดิม
      doughnutLabels: {
        id: 'doughnutLabels',
        afterDraw: function(chart) {
          if (!chart || !chart.data || !chart.data.labels) return;
          
          try {
            const width = chart.width;
            const height = chart.height;
            const ctx = chart.ctx;
            
            ctx.save();
            
            // แสดงค่า % ในแต่ละชิ้น
            const labelSize = Math.min(width, height) * 0.05;
            ctx.font = `${labelSize}px Arial`;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';

            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) / 2.5;

            // วนลูปผ่านแต่ละแถวข้อมูล
            chart.data.labels.forEach((label, i) => {
              const meta = chart.getDatasetMeta(0);
              if (!meta || !meta.data || !meta.data[i]) return;
              
              const arc = meta.data[i];
              
              // คำนวณตำแหน่งของค่า %
              const angle = Math.PI / 2 - arc.startAngle - (arc.endAngle - arc.startAngle) / 2;
              const x = centerX + radius * 0.7 * Math.cos(angle);
              const y = centerY - radius * 0.7 * Math.sin(angle);
              
              // แสดงค่า % เฉพาะชิ้นที่มีพื้นที่มากพอ
              const arcAngle = arc.endAngle - arc.startAngle;
              if (arcAngle > 0.2) { // ถ้าช่องมีขนาดเล็กไป (น้อยกว่า ~12 องศา) ไม่ต้องแสดงข้อความ
                ctx.fillStyle = 'white';
                ctx.fillText(label, x, y);
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

  // ลงทะเบียน custom plugin (ส่วนนี้ยังคงเดิม)
  const registerPlugin = () => {
    try {
      if (chartRef.current) {
        const currentChart = chartRef.current;
        if (currentChart && currentChart.config && 
            currentChart.config.options && 
            currentChart.config.options.plugins &&
            currentChart.config.options.plugins.doughnutLabels) {
          // Plugin is already registered
          return;
        }
      }
      
      // Register the plugin globally
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
    
    // Cleanup function to unregister the plugin when the component unmounts
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
      maxWidth: isStatusSummary ? "500px" : "320px", // ปรับความกว้างสำหรับกราฟสรุปรวม
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
          height: isStatusSummary ? "350px" : "260px", // ปรับความสูงสำหรับกราฟสรุปรวม
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