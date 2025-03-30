// export const departments = ["ครุศาสตร์วิศวกรรม", "ครุศาสตร์เกษตร", "ครุศาสตร์สถาปัตยกรรม", "ครุศาสตร์การออกแบบ", "ครุศาสตร์การออกแบบสภาพแวดล้อมภายใน"];
// export const fundTypes = ["เงินงบประมาณ", "เงินรายได้", "เงินสะสม", "เงินกันเหลือมปี"];
// export const years = ["2565", "2566", "2567", "2568"];

// // Mock Data สำหรับภาควิชาและแหล่งเงิน
// const departmentDetails = {};
// departments.forEach(dept => {
//   departmentDetails[dept] = {};
//   fundTypes.forEach(fund => {
//     departmentDetails[dept][fund] = {};
//     years.forEach(year => {
//       // สุ่มค่าจำนวนเงินที่แต่ละภาควิชามีในแต่ละแหล่งทุน
//       departmentDetails[dept][fund][year] = [
//         Math.floor(Math.random() * 500) + 100, // จำนวนเงินที่สุ่ม (100-599)
//       ];
//     });
//   });
// });

// // กำหนดสีสำหรับปีต่างๆ
// export const yearColors = {
//   "2565": 'rgba(255, 130, 99, 0.6)',
//   "2566": 'rgba(54, 162, 235, 0.6)',
//   "2567": 'rgba(75, 192, 192, 0.6)',
//   "2568": 'rgba(153, 102, 255, 0.6)',
// };
// export const calculateBarDataByYearOnly = () => {
//   const datasets = [{
//     label: "รวมทุกแหล่งเงินทุน",

//     data: years.map(year => {
//       return departments.reduce((sum, dept) => {
//         return sum + fundTypes.reduce((fundSum, fund) => {
//           return fundSum + (departmentDetails[dept]?.[fund]?.[year]?.reduce((a, b) => a + b, 0) || 0);
//         }, 0);
//       }, 0);
//     }),
//     backgroundColor: years.map(year => yearColors[year]),
//     borderColor: years.map(year => yearColors[year].replace('0.6', '1')),
//     borderWidth: 1,
//   }];

//   return {
//     labels: years,
//     datasets: datasets.length ? datasets : [{ label: 'ไม่มีข้อมูล', data: [0], backgroundColor: 'gray' }]
//   };
// };

// // ฟังก์ชันคำนวณข้อมูลสำหรับ BarChart
// export const calculateBarData = (selectedDepartment, selectedFund, selectedYear) => {
//   const filteredYears = selectedYear ? getYearsInRange(selectedYear) : years;
//   const filteredDepartments = selectedDepartment ? [selectedDepartment] : departments;
//   const filteredFunds = selectedFund ? [selectedFund] : fundTypes;

//   const datasets = filteredYears.map(year => ({
//     label: `ปี ${year}`,
//     data: filteredDepartments.flatMap(dept =>
//       filteredFunds.map(fund => departmentDetails[dept]?.[fund]?.[year]?.reduce((a, b) => a + b, 0) || 0)
//     ),
//     backgroundColor: yearColors[year],
//     borderColor: yearColors[year].replace('0.6', '1'),
//     borderWidth: 1,
//   }));

//   return {
//     labels: filteredDepartments.flatMap(dept => filteredFunds.map(fund => `${dept} - ${fund}`)),
//     datasets: datasets.length ? datasets : [{ label: 'ไม่มีข้อมูล', data: [0], backgroundColor: 'gray' }],
//   };
// };

// // ฟังก์ชันคำนวณข้อมูลสำหรับ PieChart
// export const departmentAssets = {
//   "ครุศาสตร์วิศวกรรม": {
//     "ส่งซ่อม": { "2565": [10, 15], "2566": [8, 18], "2567": [12, 20], "2568": [7, 14] },
//     "ชำรุด": { "2565": [5, 10], "2566": [6, 12], "2567": [7, 15], "2568": [8, 13] },
//     "บริจาค/โอน": { "2565": [3, 6], "2566": [2, 5], "2567": [4, 7], "2568": [3, 8] },
//     "รับโอน": { "2565": [1, 3], "2566": [2, 4], "2567": [3, 5], "2568": [1, 2] },
//     "จำหน่าย": { "2565": [4, 7], "2566": [5, 9], "2567": [6, 10], "2568": [4, 8] }
//   },
//   "ครุศาสตร์เกษตร": {
//     "ส่งซ่อม": { "2565": [12, 20], "2566": [11, 22], "2567": [15, 25], "2568": [10, 18] },
//     "ชำรุด": { "2565": [8, 15], "2566": [7, 14], "2567": [10, 18], "2568": [9, 16] },
//     "บริจาค/โอน": { "2565": [5, 9], "2566": [4, 8], "2567": [6, 11], "2568": [5, 10] },
//     "รับโอน": { "2565": [3, 6], "2566": [2, 5], "2567": [4, 7], "2568": [3, 6] },
//     "จำหน่าย": { "2565": [6, 10], "2566": [7, 13], "2567": [8, 14], "2568": [6, 12] }
//   }
// };

// // ฟังก์ชันคำนวณข้อมูลสำหรับ PieChart
// export const assetStatuses = ["ส่งซ่อม", "ชำรุด", "บริจาค/โอน", "รับโอน", "จำหน่าย"];

// export const calculatePieData = (selectedDepartment, selectedYear) => {
//   const filteredYears = selectedYear ? getYearsInRange(selectedYear) : years;
//   const filteredDepartments = selectedDepartment ? [selectedDepartment] : Object.keys(departmentAssets);

//   const labels = assetStatuses;

//   const data = assetStatuses.map(status =>
//     filteredDepartments.reduce((sum, dept) =>
//       sum + (filteredYears.reduce((acc, year) =>
//         acc + (departmentAssets[dept]?.[status]?.[year]?.reduce((a, b) => a + b, 0) || 0), 0)), 0)
//   );

//   return {
//     labels,
//     datasets: [{
//       label: 'สัดส่วนสภาพครุภัณฑ์',
//       data,
//       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
//       hoverOffset: 4
//     }]
//   };
// };

// // ฟังก์ชันกรองปีตามช่วง
// export const getYearsInRange = (input) => {
//   const range = input.split('-').map(y => y.trim());
//   if (range.length === 2 && years.includes(range[0]) && years.includes(range[1])) {
//     return years.filter(y => y >= range[0] && y <= range[1]);
//   } else if (years.includes(range[0])) {
//     return [range[0]];
//   }
//   return [];
// };
// dataUtils.js

export function summaryDepartmentDetails(data) {
  const summary = {};
  let years = []

  for (const department of Object.keys(data.departmentDetails)) {
    summary[department] = {};
    for (const fundType of Object.keys(data.departmentDetails[department])) {
      summary[department][fundType] = [];
      for (const year of Object.keys(data.departmentDetails[department][fundType])) {
        const total = data.departmentDetails[department][fundType][year].reduce((acc, val) => acc + val, 0);
        summary[department][fundType].push({ year, total });
        // สร้าง labels จากปี
        years = summary[department][fundType].map(item => item.year);
      }
    }
  }
  // สีสำหรับ datasets
  const colors = [
    "rgba(75, 192, 192, 0.2)", "rgba(255, 159, 64, 0.2)",
    "rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"
  ];
  const borderColors = [
    "rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)",
    "rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"
  ];

  let colorIndex = 0;

  // สร้าง datasets อัตโนมัติ
  const datasets = Object.keys(summary).flatMap((faculty) =>
    Object.keys(summary[faculty]).map((type) => {
      const dataset = {
        label: `${faculty} - ${type}`,
        data: summary[faculty][type].map(item => item.total),
        backgroundColor: colors[colorIndex % colors.length],
        borderColor: borderColors[colorIndex % borderColors.length],
        borderWidth: 1
      };
      colorIndex++;
      return dataset;
    })
  );

  const chartData = {
    labels: years,
    datasets: datasets
  };

  return chartData;
}

export function summaryDepartmentAssets(data) {
  const summary = {};
  let years = []

  for (const department of Object.keys(data.departmentAssets)) {
    summary[department] = {};
    for (const assetStatus of Object.keys(data.departmentAssets[department])) {
      summary[department][assetStatus] = [];
      for (const year of Object.keys(data.departmentAssets[department][assetStatus])) {
        const total = data.departmentAssets[department][assetStatus][year].reduce((acc, val) => acc + val, 0);
        summary[department][assetStatus].push({ year, total });
        // สร้าง labels จากปี
        years = summary[department][assetStatus].map(item => item.year);
      }
    }
  }

  // สีสำหรับ datasets
  const colors = [
    "rgba(75, 192, 192, 0.2)", "rgba(255, 159, 64, 0.2)",
    "rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"
  ];
  const borderColors = [
    "rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)",
    "rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"
  ];

  let colorIndex = 0;

  // สร้าง datasets อัตโนมัติ
  const datasets = Object.keys(summary).flatMap((faculty) =>
    Object.keys(summary[faculty]).map((type) => {
      const dataset = {
        label: `${faculty} - ${type}`,
        data: summary[faculty][type].map(item => item.total),
        backgroundColor: colors[colorIndex % colors.length],
        borderColor: borderColors[colorIndex % borderColors.length],
        borderWidth: 1
      };
      colorIndex++;
      return dataset;
    })
  );

  const chartData = {
    labels: years,
    datasets: datasets
  };
  
  return chartData;
}


export function summaryFilterDepartmentDetails(data, department = "", fundType = "", yearRange = "") {
  const summary = {};
  let years = [];

  if (!department) {
    department = Object.keys(data.departmentDetails)[0] || "";
  }

  if (!data.departmentDetails[department]) {
    return { labels: [], datasets: [] };
  }

  summary[department] = {};

  const selectedFundTypes = selectedFunds.length > 0 ? selectedFunds : Object.keys(data.departmentDetails[department]);

  selectedFundTypes.forEach((type) => {
    if (!data.departmentDetails[department][type]) return;

    summary[department][type] = [];

    const availableYears = Object.keys(data.departmentDetails[department][type]);
    let selectedYears = availableYears;

    if (yearRange) {
      const [start, end] = yearRange.split("-").map(y => y.trim());
      selectedYears = availableYears.filter(yr => yr >= start && (!end || yr <= end));
    }

    selectedYears.forEach((yr) => {
      const total = data.departmentDetails[department][type][yr].reduce((acc, val) => acc + val, 0);
      summary[department][type].push({ year: yr, total });

      if (!years.includes(yr)) years.push(yr);
    });
  });

  const colors = ["rgba(75, 192, 192, 0.2)", "rgba(255, 159, 64, 0.2)"];
  const borderColors = ["rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)"];

  let colorIndex = 0;

  const datasets = Object.keys(summary[department]).map((type) => ({
    label: `${department} - ${type}`,
    data: summary[department][type].map((item) => item.total),
    backgroundColor: colors[colorIndex % colors.length],
    borderColor: borderColors[colorIndex % borderColors.length],
    borderWidth: 1,
  }));

  return {
    labels: years.sort(),
    datasets: datasets
  };
}


export function summaryFilterDepartmentAssets(data, department = "", assetStatus = "", yearRange = "") {
  const summary = {};
  let years = [];

  if (!department) {
    department = Object.keys(data.departmentAssets)[0] || "";
  }

  if (!data.departmentAssets[department]) {
    return { labels: [], datasets: [] };
  }

  summary[department] = {};

  const selectedAssetStatuses = assetStatus ? [assetStatus] : Object.keys(data.departmentAssets[department]);

  selectedAssetStatuses.forEach((status) => {
    if (!data.departmentAssets[department][status]) return;

    summary[department][status] = [];

    const availableYears = Object.keys(data.departmentAssets[department][status]);
    let selectedYears = availableYears;

    if (yearRange) {
      const [start, end] = yearRange.split("-").map(y => y.trim());
      selectedYears = availableYears.filter(yr => yr >= start && (!end || yr <= end));
    }

    selectedYears.forEach((yr) => {
      const total = data.departmentAssets[department][status][yr].reduce((acc, val) => acc + val, 0);
      summary[department][status].push({ year: yr, total });

      if (!years.includes(yr)) years.push(yr);
    });
  });

  const colors = ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"];
  const borderColors = ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"];

  let colorIndex = 0;

  const datasets = Object.keys(summary[department]).map((status) => ({
    label: `${department} - ${status}`,
    data: summary[department][status].map((item) => item.total),
    backgroundColor: colors[colorIndex % colors.length],
    borderColor: borderColors[colorIndex % borderColors.length],
    borderWidth: 1,
  }));

  return {
    labels: years.sort(),
    datasets: datasets
  };
}