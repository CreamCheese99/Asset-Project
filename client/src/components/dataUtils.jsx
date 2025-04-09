// dataUtils.js

export function summaryDepartmentDetails(data) {
  const summary = {};
  let years = [];

  for (const department of Object.keys(data.departmentDetails)) {
    summary[department] = {};
    for (const fundType of Object.keys(data.departmentDetails[department])) {
      summary[department][fundType] = [];
      for (const year of Object.keys(data.departmentDetails[department][fundType])) {
        const total = data.departmentDetails[department][fundType][year].reduce((acc, val) => acc + val, 0);
        summary[department][fundType].push({ year, total });
        // สร้าง labels จากปี
        if (!years.includes(year)) {
          years.push(year);
        }
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
    labels: years.sort(),
    datasets: datasets
  };

  return chartData;
}

export function summaryDepartmentAssets(data) {
  const summary = {};
  let years = [];

  for (const department of Object.keys(data.departmentAssets)) {
    summary[department] = {};
    for (const assetStatus of Object.keys(data.departmentAssets[department])) {
      summary[department][assetStatus] = [];
      for (const year of Object.keys(data.departmentAssets[department][assetStatus])) {
        const total = data.departmentAssets[department][assetStatus][year].reduce((acc, val) => acc + val, 0);
        summary[department][assetStatus].push({ year, total });
        // สร้าง labels จากปี
        if (!years.includes(year)) {
          years.push(year);
        }
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
    labels: years.sort(),
    datasets: datasets
  };
  
  return chartData;
}


export function summaryFilterDepartmentDetails(data, department = "", fundType = "", yearRange = "") {
  // กำหนดสีสำหรับ datasets
  const colors = [
    "rgba(75, 192, 192, 0.2)", "rgba(255, 159, 64, 0.2)",
    "rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)",
    "rgba(153, 102, 255, 0.2)", "rgba(255, 205, 86, 0.2)"
  ];
  const borderColors = [
    "rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)",
    "rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)",
    "rgba(153, 102, 255, 1)", "rgba(255, 205, 86, 1)"
  ];
  
  let colorIndex = 0;
  const summary = {};
  let years = [];
  let datasets = [];

  try {
    // กำหนดภาควิชาที่ต้องการแสดงข้อมูล
    let departmentsToShow = [];
    
    if (department) {
      // ถ้าเลือกภาควิชา แยกอาร์เรย์จากสตริงที่คั่นด้วย comma
      departmentsToShow = department.split(",");
    } else {
      // ถ้าไม่ได้เลือกภาควิชา ใช้ทุกภาควิชา
      departmentsToShow = Object.keys(data.departmentDetails);
    }

    // แปลง fundType จากสตริงที่คั่นด้วย comma เป็นอาร์เรย์
    let selectedFundTypes = [];
    if (fundType) {
      selectedFundTypes = fundType.split(",");
    }

    // วนลูปผ่านทุกภาควิชาที่ต้องการแสดง
    for (const dept of departmentsToShow) {
      // ตรวจสอบว่าภาควิชามีอยู่ในข้อมูลหรือไม่
      if (!data.departmentDetails[dept]) continue;
      
      summary[dept] = {};

      // ถ้าไม่ได้เลือกแหล่งเงิน ใช้ทุกแหล่งเงินที่มี
      const deptFundTypes = selectedFundTypes.length > 0 
        ? selectedFundTypes.filter(type => data.departmentDetails[dept][type]) 
        : Object.keys(data.departmentDetails[dept]);

      // วนลูปผ่านแต่ละแหล่งเงินที่เลือก
      for (const type of deptFundTypes) {
        // ตรวจสอบว่าแหล่งเงินที่เลือกมีข้อมูลหรือไม่
        if (!data.departmentDetails[dept][type]) continue;

        summary[dept][type] = [];

        // หาปีที่มีข้อมูล
        const availableYears = Object.keys(data.departmentDetails[dept][type]);
        let selectedYears = availableYears;

        // กรองข้อมูลตามปีที่เลือก
        if (yearRange) {
          const [start, end] = yearRange.split("-").map(y => y.trim());
          selectedYears = availableYears.filter(yr => yr >= start && (!end || yr <= end));
        }

        // รวมข้อมูลสำหรับแต่ละปี
        for (const yr of selectedYears) {
          const total = data.departmentDetails[dept][type][yr].reduce((acc, val) => acc + val, 0);
          summary[dept][type].push({ year: yr, total });

          // เก็บปีที่ไม่ซ้ำกัน
          if (!years.includes(yr)) years.push(yr);
        }
      }
    }

    // วนลูปผ่านแต่ละภาควิชาและแหล่งเงินที่เลือก
    for (const dept of Object.keys(summary)) {
      for (const type of Object.keys(summary[dept])) {
        // สร้าง years_data เป็น key-value pair ของปีและข้อมูล
        const years_data = {};
        summary[dept][type].forEach(item => {
          years_data[item.year] = item.total;
        });
        
        // สร้าง dataset
        const dataset = {
          label: `${dept} - ${type}`,
          data: years.sort().map(year => years_data[year] || 0), // ใช้ 0 สำหรับปีที่ไม่มีข้อมูล
          backgroundColor: colors[colorIndex % colors.length],
          borderColor: borderColors[colorIndex % borderColors.length],
          borderWidth: 1,
        };
        
        colorIndex++;
        datasets.push(dataset);
      }
    }
  } catch (error) {
    console.error("Error in summaryFilterDepartmentDetails:", error);
    // กรณีเกิด error ให้ส่งกลับกราฟเปล่า
    return { labels: [], datasets: [] };
  }

  return {
    labels: years.sort(),
    datasets: datasets.length ? datasets : []
  };
}

export function summaryFilterDepartmentAssets(data, department = "", assetStatus = "", yearRange = "") {
  // กำหนดสีสำหรับ datasets
  const colors = [
    "rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)",
    "rgba(75, 192, 192, 0.2)", "rgba(255, 159, 64, 0.2)",
    "rgba(153, 102, 255, 0.2)", "rgba(255, 205, 86, 0.2)"
  ];
  const borderColors = [
    "rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)",
    "rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)",
    "rgba(153, 102, 255, 1)", "rgba(255, 205, 86, 1)"
  ];
  
  let colorIndex = 0;
  const summary = {};
  let years = [];
  let datasets = [];

  try {
    // กำหนดภาควิชาที่ต้องการแสดงข้อมูล
    let departmentsToShow = [];
    
    if (department) {
      // ถ้าเลือกภาควิชา แยกอาร์เรย์จากสตริงที่คั่นด้วย comma
      departmentsToShow = department.split(",");
    } else {
      // ถ้าไม่ได้เลือกภาควิชา ใช้ทุกภาควิชา
      departmentsToShow = Object.keys(data.departmentAssets);
    }

    // วนลูปผ่านทุกภาควิชาที่ต้องการแสดง
    for (const dept of departmentsToShow) {
      // ตรวจสอบว่าภาควิชามีอยู่ในข้อมูลหรือไม่
      if (!data.departmentAssets[dept]) continue;
      
      summary[dept] = {};

      // ถ้าไม่ได้เลือกสถานะสินทรัพย์ ใช้ทุกสถานะที่มี
      const selectedAssetStatuses = assetStatus 
        ? assetStatus.split(",") 
        : Object.keys(data.departmentAssets[dept]);

      // วนลูปผ่านแต่ละสถานะที่เลือก
      for (const status of selectedAssetStatuses) {
        // ตรวจสอบว่าสถานะที่เลือกมีข้อมูลหรือไม่
        if (!data.departmentAssets[dept][status]) continue;

        summary[dept][status] = [];

        // หาปีที่มีข้อมูล
        const availableYears = Object.keys(data.departmentAssets[dept][status]);
        let selectedYears = availableYears;

        // กรองข้อมูลตามปีที่เลือก
        if (yearRange) {
          const [start, end] = yearRange.split("-").map(y => y.trim());
          selectedYears = availableYears.filter(yr => yr >= start && (!end || yr <= end));
        }

        // รวมข้อมูลสำหรับแต่ละปี
        for (const yr of selectedYears) {
          const total = data.departmentAssets[dept][status][yr].reduce((acc, val) => acc + val, 0);
          summary[dept][status].push({ year: yr, total });

          // เก็บปีที่ไม่ซ้ำกัน
          if (!years.includes(yr)) years.push(yr);
        }
      }
    }

    // วนลูปผ่านแต่ละภาควิชาและสถานะที่เลือก
    for (const dept of Object.keys(summary)) {
      for (const status of Object.keys(summary[dept])) {
        // สร้าง years_data เป็น key-value pair ของปีและข้อมูล
        const years_data = {};
        summary[dept][status].forEach(item => {
          years_data[item.year] = item.total;
        });
        
        // สร้าง dataset
        const dataset = {
          label: `${dept} - ${status}`,
          data: years.sort().map(year => years_data[year] || 0), // ใช้ 0 สำหรับปีที่ไม่มีข้อมูล
          backgroundColor: colors[colorIndex % colors.length],
          borderColor: borderColors[colorIndex % borderColors.length],
          borderWidth: 1,
        };
        
        colorIndex++;
        datasets.push(dataset);
      }
    }
  } catch (error) {
    console.error("Error in summaryFilterDepartmentAssets:", error);
    // กรณีเกิด error ให้ส่งกลับกราฟเปล่า
    return { labels: [], datasets: [] };
  }

  return {
    labels: years.sort(),
    datasets: datasets.length ? datasets : []
  };
}
// dataUtils.jsx

export const summaryFilterDepartmentAssetsByStatus = (data, selectedDepartment, selectedAssetStatus, selectedYear) => {
  // Logic for filtering the data based on department, status, and year
  const filteredData = data.departmentAssets.filter(department => {
    if (selectedDepartment && department.name !== selectedDepartment) return false;
    if (selectedAssetStatus && department.status !== selectedAssetStatus) return false;
    if (selectedYear && department.year !== selectedYear) return false;
    return true;
  });

  const result = filteredData.map(department => {
    return {
      label: department.name,
      data: department.statuses.map(status => {
        return {
          label: status.name,
          data: status.values // Or however the data is structured for statuses
        };
      })
    };
  });

  return {
    datasets: result
  };
};
