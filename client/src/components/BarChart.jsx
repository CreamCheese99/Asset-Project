import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ลงทะเบียนประเภทกราฟที่ต้องการ
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  // กำหนดการตั้งค่าเพิ่มเติมสำหรับการปรับสีกราฟแท่ง
  const chartData = {
    labels: data.labels,  // แท็กบนแกน x
    datasets: [
      {
        label: 'ข้อมูลกราฟ',
        data: data.values,  // ค่าของข้อมูลกราฟ
        backgroundColor: 'rgba(75, 192, 192, 0.2)',  // สีของแท่งกราฟ (สามารถเปลี่ยนเป็นสีที่ต้องการ)
        borderColor: 'rgba(75, 192, 192, 1)',  // สีของขอบแท่งกราฟ
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ background: '#fff', padding: '10px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      {/* <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>กราฟแท่ง</h3> */}
      <Bar 
        data={chartData} 
        options={{ 
          plugins: { 
            legend: { 
              position: 'top' 
            },
          },
        }} 
      />
    </div>
  );
};

export default BarChart;
