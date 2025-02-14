import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
//ไม่แน่ใจ database ปรับตาม database
const  Dashboardpage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(''); 
  const [selectedFund, setSelectedFund] = useState('');
  const [selectedYear, setSelectedYear] = useState('');


  const departments = [
    "ครุศาสตร์วิศวกรรม",
    "ครุศาสตร์เกษตร",
    "ครุศาสตร์สถาปัตยกรรม",
    "ครุศาสตร์การออกแบบ",
    "ครุศาสตร์การออกแบบสภาพแวดล้อมภายใน",
  ];

  const fundTypes = [
    "เงินงบประมาณ",
    "เงินรายได้",      
    "เงินสะสม",
    "เงินกันเหลือมปี",
  ];

  const years = ["2568", "2567", "2566", "2565"]; // ปี พ.ศ.

  const overviewData = {
    labels: departments,
    datasets: [
      {
        label: 'จำนวนพัสดุทั้งหมด',
        data: [200, 150, 100, 120, 80],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const departmentDetails = {
    "ครุศาสตร์วิศวกรรม": {
      "เงินงบประมาณ": { "2568": [50, 30, 70, 50], "2567": [60, 20, 40, 50] },
      "เงินรายได้": { "2568": [40, 30, 60, 30], "2567": [50, 20, 50, 40] },
      "งบเงินสะสม": { "2568": [30, 40, 50, 40], "2567": [35, 50, 45, 35] },
      "งบเหลื่อมปี": { "2568": [70, 60, 50, 30], "2567": [60, 50, 55, 40] },
      "งบรายจ่ายอื่น": { "2568": [60, 40, 40, 20], "2567": [50, 30, 50, 30] },
    },
    "ครุศาสตร์เกษตร": {
      "เงินงบประมาณ": { "2568": [50, 20, 50, 60], "2567": [80, 30, 40, 10] },
      "เงินรายได้": { "2568": [50, 20, 50, 60], "2567": [90, 0, 50, 40] },
      "เงินสะสม": { "2568": [50, 20, 50, 60], "2567": [35, 50, 45, 35] },
      "เงินเหลื่อมปี": { "2568": [70, 60, 50, 30], "2567": [60, 50, 55, 40] },
      "งบรายจ่ายอื่น": { "2568": [60, 40, 40, 20], "2567": [50, 30, 50, 30] },
    },
    "ครุศาสตร์สถาปัตยกรรม": {
      "เงินรายได้": { "2568": [50, 30, 70, 50], "2567": [60, 20, 40, 50] },
      "งบดำเนินงาน": { "2568": [40, 30, 60, 30], "2567": [50, 20, 50, 40] },
      "เงินสะสม": { "2568": [30, 40, 50, 40], "2567": [35, 50, 45, 35] },
      "เงินเหลื่อมปี": { "2568": [70, 60, 50, 30], "2567": [60, 50, 55, 40] },
      "งบรายจ่ายอื่น": { "2568": [60, 40, 40, 20], "2567": [50, 30, 50, 30] },
    },
    // เพิ่มข้อมูลสำหรับภาควิชาอื่น ๆ ที่เหลือ
  };

  const getColorByYear = (year) => {
    const colors = {
      "2565": 'rgba(255, 99, 132, 0.6)',
      "2566": 'rgba(54, 162, 235, 0.6)',
      "2567": 'rgba(75, 192, 192, 0.6)',
      "2568": 'rgba(153, 102, 255, 0.6)',
    };
    return colors[year] || 'rgba(0, 0, 0, 0.6)';
  };

  const calculateTotal = (department, fundType, year) => {
    const departmentData = departmentDetails[department]?.[fundType]?.[year] || [0, 0, 0, 0];
    return departmentData.reduce((total, num) => total + num, 0);
  };

  const calculateOverallTotal = () => {
    let total = 0;
    for (let dept in departmentDetails) {
      for (let fund in departmentDetails[dept]) {
        for (let year in departmentDetails[dept][fund]) {
          total += departmentDetails[dept][fund][year].reduce((sum, num) => sum + num, 0);
        }
      }
    }
    return total;
  };

  // กราฟ Bar
  const barChartData = selectedDepartment && selectedFund
    ? {
        labels: years,
        datasets: [
          {
            
            label: `${selectedDepartment} - ${selectedFund} (${selectedYear})`,
            data: departmentDetails[selectedDepartment][selectedFund][selectedYear] || [0, 0, 0, 0],
            backgroundColor: years.map(year => getColorByYear(year)), // เปลี่ยนสีตามปี
            borderColor: years.map(year => getColorByYear(year).replace('0.6', '1')), // เพิ่มความทึบของสี
            borderWidth: 1,
          },
        ],
      }
    : overviewData;  // ถ้าไม่ได้เลือกฟิลเตอร์ใด ๆ จะแสดงข้อมูลรวมทั้งหมด

  // กราฟ Pie
  const pieChartData = selectedDepartment
    ? {
        labels: ['ใช้งาน', 'ส่งซ่อม', 'ชำรุด', 'บริจาค/โอน', 'รับโอน', 'จำหน่าย'],
        datasets: [
          {
            data: selectedFund && selectedYear
              ? departmentDetails[selectedDepartment][selectedFund][selectedYear]
              : departmentDetails[selectedDepartment]["เงินรายได้"][selectedYear],
            backgroundColor: years.map(year => getColorByYear(year)), // เปลี่ยนสีตามปี
            borderColor: years.map(year => getColorByYear(year).replace('0.6', '1')), // เพิ่มความทึบของสี
            borderWidth: 1,
          },
        ],
      }
    : {
      labels: ['ใช้งาน', 'ส่งซ่อม', 'ชำรุด', 'บริจาค/โอน', 'รับโอน', 'จำหน่าย'],
        datasets: [
          {
            data: [
              Object.values(departmentDetails).reduce((sum, dept) => sum + dept["เงินรายได้"]["2568"][0], 0),
              Object.values(departmentDetails).reduce((sum, dept) => sum + dept["เงินรายได้"]["2568"][1], 0),
              Object.values(departmentDetails).reduce((sum, dept) => sum + dept["เงินรายได้"]["2568"][2], 0),
              Object.values(departmentDetails).reduce((sum, dept) => sum + dept["เงินรายได้"]["2568"][3], 0),
            ],
            backgroundColor: years.map(year => getColorByYear(year)),
            borderColor: years.map(year => getColorByYear(year).replace('0.6', '1')),
            borderWidth: 1,
          },
        ],
      };

  // คำนวณผลรวมของพัสดุในกราฟ Bar และ Pie
  const calculateBarTotal = () => {
    return barChartData.datasets[0]?.data?.reduce((total, num) => total + num, 0) || 0;
  };

  const calculatePieTotal = () => {
    return pieChartData.datasets[0]?.data?.reduce((total, num) => total + num, 0) || 0;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '1.25rem', color: '#333333', fontWeight: 'normal', marginBottom: '20px' }}>แดชบอร์ดระบบพัสดุ</h1>

      {/* ฟิลเตอร์ที่มองเห็นชัด */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '2px solid #ddd', paddingBottom: '20px' }}>
        {/* ฟิลเตอร์ภาควิชา */}
        <div style={{ width: '30%' }}>
          <label htmlFor="department-selector" style={{ fontSize: '0.9rem', color: '#555' }}>เลือกภาควิชา: </label>
          <select
            id="department-selector"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            style={{
              padding: '8px', fontSize: '0.9rem', borderRadius: '8px', border: '1px solid #ddd', width: '100%'
            }}
          >
            <option value="">-- ภาพรวม --</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>


        {/* ฟิลเตอร์ประเภทเงิน */}
        <div style={{ width: '30%' }}>
          <label htmlFor="fund-selector" style={{ fontSize: '0.9rem', color: '#555' }}>เลือกประเภทเงิน: </label>
          <select
            id="fund-selector"
            value={selectedFund}
            onChange={(e) => setSelectedFund(e.target.value)}
            style={{
              padding: '8px', fontSize: '0.9rem', borderRadius: '8px', border: '1px solid #ddd', width: '100%'
            }}
          >
            <option value="">-- ทุกประเภท --</option>
            {fundTypes.map((fund) => (
              <option key={fund} value={fund}>
                {fund}
              </option>
            ))}
          </select>
        </div>

        {/* ฟิลเตอร์ปีงบประมาณ */}
        <div style={{ width: '30%' }}>
          <label htmlFor="year-selector" style={{ fontSize: '0.9rem', color: '#555' }}>เลือกปีงบประมาณ: </label>
          <select
            id="year-selector"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{
              padding: '8px', fontSize: '0.9rem', borderRadius: '8px', border: '1px solid #ddd', width: '100%'
            }}
          >
            <option value="">-- ทุกปี --</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year} 
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* กราฟ Bar และ Pie */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ width: '48%', border: '2px solid #ddd', borderRadius: '10px', padding: '10px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.2rem', color: '#333' }}>
            {selectedDepartment ? `ข้อมูลภาควิชา: ${selectedDepartment}` : "ภาพรวมทุกภาควิชา"}
          </h2>
          <div style={{ height: '250px' }}>
            <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
          </div>
          {/* แสดงผลรวมของกราฟ Bar */}
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '1rem' }}>
            ผลรวมของพัสดุ: {calculateBarTotal()}
          </div>
        </div>

        <div style={{ width: '48%', border: '2px solid #ddd', borderRadius: '10px', padding: '10px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.2rem', color: '#333' }}>
            {selectedDepartment ? `ข้อมูลพัสดุภาควิชา: ${selectedDepartment}` : "ภาพรวมพัสดุทั้งหมด"}
          </h2>
          <div style={{ height: '250px' }}>
            <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
          </div>
          {/* แสดงผลรวมของกราฟ Pie */}
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '1rem' }}>
            ผลรวมของพัสดุ: {calculatePieTotal()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardpage;
