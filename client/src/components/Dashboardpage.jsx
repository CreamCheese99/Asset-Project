import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState('ทั้งหมด');
  const [selectedDepartment, setSelectedDepartment] = useState('ทั้งหมด');
  const [selectedBudgetType, setSelectedBudgetType] = useState('ทั้งหมด');

  const years = ['ทั้งหมด', '2564', '2565', '2566', '2567'];
  const departments = ['ครุศาสตร์วิศวกรรม', 'ครุศาสตร์เกษตร', 'ครุศาสตร์สถาปัตยกรรม', 'ครุศาสตร์การออกแบบ', 'ครุศาสตร์การออกแบบสภาพแวดล้อมภายใน'];
  const budgetTypes = ['ทั้งหมด', 'งบประมาณแผ่นดิน', 'เงินรายได้', 'เงินบริจาค'];

  const rawData = [
    { year: '2564', department: 'ครุศาสตร์วิศวกรรม', budgetType: 'งบประมาณแผ่นดิน', value: 100 },
    { year: '2564', department: 'ครุศาสตร์เกษตร', budgetType: 'งบประมาณแผ่นดิน', value: 80 },
    { year: '2564', department: 'ครุศาสตร์สถาปัตยกรรม', budgetType: 'เงินรายได้', value: 60 },
    { year: '2565', department: 'ครุศาสตร์วิศวกรรม', budgetType: 'เงินบริจาค', value: 120 },
    { year: '2565', department: 'ครุศาสตร์การออกแบบ', budgetType: 'งบประมาณแผ่นดิน', value: 140 },
    { year: '2566', department: 'ครุศาสตร์การออกแบบสภาพแวดล้อมภายใน', budgetType: 'เงินรายได้', value: 90 },
    { year: '2567', department: 'ครุศาสตร์เกษตร', budgetType: 'เงินบริจาค', value: 70 },
  ];

  // กรองข้อมูลตามฟิลเตอร์
  const filteredData = rawData.filter((item) => {
    const yearMatch = selectedYear === 'ทั้งหมด' || item.year === selectedYear;
    const departmentMatch = selectedDepartment === 'ทั้งหมด' || item.department === selectedDepartment;
    const budgetTypeMatch = selectedBudgetType === 'ทั้งหมด' || item.budgetType === selectedBudgetType;
    return yearMatch && departmentMatch && budgetTypeMatch;
  });

  // สร้างโครงสร้างข้อมูลกราฟให้มีภาควิชาครบถ้วน
  const chartLabels = [...new Set(filteredData.map((item) => item.year))]; // ปีงบประมาณที่เลือก
  const allYears = selectedYear === 'ทั้งหมด' ? years.slice(1) : [selectedYear];

  const chartData = {
    labels: allYears, // ปีงบประมาณ
    datasets: departments.map((department, index) => ({
      label: department,
      data: allYears.map((year) => {
        const item = filteredData.find((d) => d.year === year && d.department === department);
        return item ? item.value : 0; // ใส่ค่า 0 หากไม่มีข้อมูล
      }),
      backgroundColor: `hsl(${index * 60}, 70%, 70%)`, // สีของแท่งกราฟ
    })),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw} ชิ้น`,
        },
      },
    },
    scales: {
      x: { title: { display: true, text: 'ปีงบประมาณ' } },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'จำนวนพัสดุ' },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-200 p-8 font-sans">
      <div className="container mx-auto max-w-screen-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-teal-700 mb-2">แดชบอร์ดระบบครุภัณฑ์</h2>
          <p className="text-teal-500">ข้อมูลสรุปการจัดการครุภัณฑ์ในคณะครุศาสตร์</p>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { id: 'yearFilter', label: 'ปีงบประมาณ', options: years, state: selectedYear, setState: setSelectedYear },
            { id: 'departmentFilter', label: 'ภาควิชา', options: ['ทั้งหมด', ...departments], state: selectedDepartment, setState: setSelectedDepartment },
            { id: 'budgetTypeFilter', label: 'ประเภทเงิน', options: budgetTypes, state: selectedBudgetType, setState: setSelectedBudgetType },
          ].map(({ id, label, options, state, setState }) => (
            <div key={id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-200 border border-gray-200">
              <label htmlFor={id} className="block text-lg font-semibold text-teal-600 mb-2">
                {label}
              </label>
              <select
                id={id}
                className="w-full p-3 bg-teal-50 rounded-md border border-gray-300 focus:ring-teal-500 focus:border-teal-500 text-gray-700"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-teal-700 mb-4">กราฟจำนวนพัสดุ</h3>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
