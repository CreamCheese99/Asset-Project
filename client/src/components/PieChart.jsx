import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ลงทะเบียนประเภทกราฟที่ต้องการ
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ apiEndpoint }) => {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // ฟังก์ชันดึงข้อมูลจาก API
  const fetchData = async () => {
    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error("ไม่สามารถดึงข้อมูลจากเซิร์ฟเวอร์");
      }
      const result = await response.json();

      // เตรียมข้อมูลในรูปแบบที่ PieChart ใช้งานได้
      const chartData = {
        labels: result.labels,  // ชื่อของสถานะต่างๆ เช่น 'ส่งซ่อม', 'ชำรุด'
        datasets: [
          {
            label: result.label, // ข้อความแสดงในกราฟ
            data: result.data,    // ข้อมูลที่จะใช้ในกราฟ
            backgroundColor: result.backgroundColor || ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],  // สีของแต่ละส่วนในกราฟ
            hoverOffset: 4,  // ความชัดเจนเมื่อเลื่อนเมาส์
          },
        ],
      };

      setData(chartData);  // ตั้งค่าข้อมูลกราฟ
    } catch (error) {
      setErrorMessage("เกิดข้อผิดพลาดในการดึงข้อมูล");
      console.error("Error fetching data:", error);
    }
  };

  // ใช้ useEffect เพื่อดึงข้อมูลเมื่อคอมโพเนนต์โหลด
  useEffect(() => {
    fetchData();
  }, [apiEndpoint]);  // เพิ่ม apiEndpoint ใน dependency array

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div style={{ width: "300px", margin: "0 auto" }}>
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px", // กำหนดความสูงของคอนเทนเนอร์ของกราฟ
        }}
      >
        {data ? <Pie data={data} /> : <p>กำลังโหลดข้อมูล...</p>}
      </div>
    </div>
  );
};

export default PieChart;
