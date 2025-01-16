import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Link } from 'react-router-dom';  // นำเข้า Link จาก react-router-dom

const Dashboardpage = () => {
  const lineChartData = {
    labels: ['ครุศาสตร์วิศวกรรม', 'ครุศาสตร์เกษตร', 'ครุศาสตร์สถาปัตยกรรม', 'ครุศาสตร์การออกแบบ', 'ครุศาสตร์การออกแบบสภาพแวดล้อมภายใน'],
    datasets: [
      {
        label: 'ภาควิชา',
        data: [150, 180, 210, 190, 220],
        fill: false,
        borderColor: '#00BFAE', // สีฟ้าเขียวสด
        tension: 0.4,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  const handleCardClick = (id) => {
    const elements = document.querySelectorAll('.modern-card, .sidebar-item');
    elements.forEach((el) => el.classList.remove('selected'));
    document.getElementById(id).classList.add('selected');
  };

  return (
    <div className="dashboard-container min-h-screen bg-gray-50 font-sans py-6 px-4">
      <div className="container mx-auto max-w-screen-lg">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="header-title text-3xl font-bold text-teal-600">ยินดีต้อนรับสู่แดชบอร์ดระบบครุภัณฑ์คณะครุศาสตร์ สจล</h2>
          <p className="text-gray-500 mt-2 text-sm">ข้อมูลสรุปเกี่ยวกับการจัดการครุภัณฑ์และการใช้งานระบบ</p>
        </div>

        {/* Card Section */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div
            className="modern-card bg-gradient-to-r from-teal-300 to-teal-600 p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-all duration-300"
            id="card1"
            onClick={() => handleCardClick('card1')}
          >
            <div className="modern-card-icon">
              <i className="fas fa-box-open text-2xl text-white"></i>
            </div>
            <div className="modern-card-text text-base text-white">จำนวนพัสดุทั้งหมด</div>
            <div className="modern-card-value text-xl font-bold text-white">1,220</div>
          </div>

          <div
            className="modern-card bg-gradient-to-r from-blue-300 to-blue-600 p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-all duration-300"
            id="card2"
            onClick={() => handleCardClick('card2')}
          >
            <div className="modern-card-icon">
              <i className="fas fa-box text-2xl text-white"></i>
            </div>
            <div className="modern-card-text text-base text-white">จำนวนพัสดุที่เหลือใช้งาน</div>
            <div className="modern-card-value text-xl font-bold text-white">800</div>
          </div>

          <div
            className="modern-card bg-gradient-to-r from-orange-300 to-orange-600 p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-all duration-300"
            id="card3"
            onClick={() => handleCardClick('card3')}
          >
            <div className="modern-card-icon">
              <i className="fas fa-exclamation-triangle text-2xl text-white"></i>
            </div>
            <div className="modern-card-text text-base text-white">จำนวนพัสดุที่กำลังจะหมดอายุ</div>
            <div className="modern-card-value text-xl font-bold text-white">120</div>
          </div>
        </div>

        {/* Card "จัดการข้อมูลพัสดุ" */}
        <div className="flex justify-center mb-6">
          <Link to="/manage-asset"> {/* ลิงก์ไปยังหน้า /manage-asset */}
            <div
              className="modern-card bg-gradient-to-r from-purple-300 to-purple-600 p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 text-center"
              id="card4"
            >
              <div className="modern-card-icon">
                <i className="fas fa-cogs text-2xl text-white"></i>
              </div>
              <div className="modern-card-text text-base text-white">จัดการข้อมูลพัสดุ</div>
              <div className="modern-card-value text-sm text-white">สำหรับ เจ้าหน้าที่ภาควิชา, อาจารย์ประจำภาควิชา, เจ้าหน้าที่พัสดุประจำคณะ</div>
            </div>
          </Link>
        </div>

        {/* Graph and Sidebar Section */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-4 h-72">
            <h3 className="text-lg font-semibold mb-4 text-teal-600">กราฟจำนวนพัสดุทั้งหมด</h3>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>

          <div className="bg-white shadow-lg rounded-lg p-4">
            <div className="sidebar-title text-lg font-semibold mb-4 text-teal-600">ข้อมูลของภาควิชา</div>
            <div className="grid grid-cols-2 gap-3">
              {[ 
                'ครุศาสตร์วิศวกรรม', 
                'ครุศาสตร์เกษตร', 
                'ครุศาสตร์สถาปัตยกรรม', 
                'ครุศาสตร์การออกแบบ', 
                'ครุศาสตร์การออกแบบสภาพแวดล้อมภายใน', 
                'ข้อมูลรวมทุกภาควิชา' 
              ].map((department, index) => (
                <div
                  key={index}
                  className="sidebar-item bg-teal-100 p-3 rounded-lg shadow-lg cursor-pointer hover:bg-teal-200 transition-all duration-300 text-sm"
                  id={`department${index + 1}`}
                  onClick={() => handleCardClick(`department${index + 1}`)}
                >
                  {department}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardpage;
