// ฟังก์ชันสำหรับแยกช่วงปีที่เลือก
const parseYearRange = (yearInput) => {
  if (!yearInput) return { start: null, end: null };
  
  // ตรวจสอบว่าเป็นช่วงปีหรือไม่
  if (yearInput.includes('-')) {
    const [start, end] = yearInput.split('-').map(y => y.trim());
    return { start, end };
  }
  
  // กรณีปีเดียว
  return { start: yearInput.trim(), end: yearInput.trim() };
};

// ฟังก์ชันตรวจสอบว่าปีที่กำลังตรวจสอบอยู่ในช่วงที่เลือกหรือไม่
const isYearInRange = (year, yearRange) => {
  if (!yearRange.start) return true; // ไม่ได้เลือกปี แสดงผลทั้งหมด
  
  // แปลงเป็นตัวเลขเพื่อเปรียบเทียบ
  const yearNum = parseInt(year);
  const startNum = parseInt(yearRange.start);
  const endNum = parseInt(yearRange.end);
  
  return yearNum >= startNum && yearNum <= endNum;
};

// ฟังก์ชันสุ่มสี
const getRandomColor = () =>
  `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
    Math.random() * 255
  )},${Math.floor(Math.random() * 255)},0.6)`;

// ฟังก์ชันนี้ใช้เพื่อกำหนดสีตามค่า total ของข้อมูล
export const getColorByTotal = (total) => {
  if (total > 1000) {
    return 'rgba(75, 192, 192, 0.6)'; // ค่า total มากกว่า 1000 ให้สีเขียว
  } else if (total > 500) {
    return 'rgba(255, 159, 64, 0.6)'; // ค่า total มากกว่า 500 ให้สีส้ม
  } else {
    return 'rgba(255, 99, 132, 0.6)'; // ค่า total น้อยกว่าหรือเท่ากับ 500 ให้สีแดง
  }
};

// สรุปข้อมูลภาควิชารายปีในรูปแบบกราฟแท่ง
export const summaryDepartmentDetails = (data, selectedYear = "", selectedFund = "") => {
  try {
    if (!data || !data.departmentDetails) {
      console.error("ไม่มีข้อมูล departmentDetails");
      return { labels: [], datasets: [] };
    }

    const departments = Object.keys(data.departmentDetails);
    const allYears = new Set();
    
    // แยกช่วงปีที่เลือก
    const yearRange = parseYearRange(selectedYear);
    
    // กรองแหล่งเงินตามที่เลือก
    const fundTypes = selectedFund ? selectedFund.split(",") : [];
    
    // รวบรวมปีทั้งหมดที่มีในข้อมูล
    departments.forEach(department => {
      Object.keys(data.departmentDetails[department]).forEach(fundType => {
        // ถ้าเลือกแหล่งเงินและไม่ตรงกับแหล่งเงินนี้ ให้ข้าม
        if (fundTypes.length > 0 && !fundTypes.includes(fundType)) return;
        
        Object.keys(data.departmentDetails[department][fundType]).forEach(year => {
          // ตรวจสอบว่าปีอยู่ในช่วงที่เลือกหรือไม่
          if (isYearInRange(year, yearRange)) {
            allYears.add(year);
          }
        });
      });
    });
    
    if (allYears.size === 0) {
      return { labels: [], datasets: [] };
    }

    const yearsSorted = Array.from(allYears).sort();
    
    // สร้างข้อมูลสำหรับแต่ละภาควิชา
    const departmentDataByYear = {};
    
    departments.forEach(department => {
      departmentDataByYear[department] = {};
      
      // เริ่มต้นค่า 0 สำหรับทุกปี
      yearsSorted.forEach(year => {
        departmentDataByYear[department][year] = 0;
      });
      
      // รวมค่าจากทุกแหล่งเงินตามฟิลเตอร์
      Object.keys(data.departmentDetails[department]).forEach(fundType => {
        // ถ้าเลือกแหล่งเงินและไม่ตรงกับแหล่งเงินนี้ ให้ข้าม
        if (fundTypes.length > 0 && !fundTypes.includes(fundType)) return;
        
        Object.keys(data.departmentDetails[department][fundType]).forEach(year => {
          // ตรวจสอบว่าปีอยู่ในช่วงที่เลือกหรือไม่
          if (isYearInRange(year, yearRange)) {
            const yearData = data.departmentDetails[department][fundType][year];
            if (Array.isArray(yearData)) {
              departmentDataByYear[department][year] += yearData.reduce((sum, val) => sum + val, 0);
            }
          }
        });
      });
    });
    
    // สร้าง datasets
    const datasets = [];
    const colors = [
      "rgba(44, 62, 80, 0.6)",    // สีเข้ม (ครุศาสตร์วิศวกรรม)
      "rgba(231, 76, 60, 0.6)",   // สีแดง (ครุศาสตร์การออกแบบ)
      "rgba(39, 174, 96, 0.6)",   // สีเขียว (ครุศาสตร์การออกแบบสภาพแวดล้อมภายใน)
      "rgba(52, 152, 219, 0.6)",  // สีฟ้า (ครุศาสตร์วิศวกรรม)
      "rgba(155, 89, 182, 0.6)",  // สีม่วง (ครุศาสตร์เกษตร)
      "rgba(243, 156, 18, 0.6)"   // สีเหลือง (สำรอง)
    ];
    
    departments.forEach((department, index) => {
      // ตรวจสอบว่ามีข้อมูลสำหรับภาควิชานี้หรือไม่
      const hasData = yearsSorted.some(year => departmentDataByYear[department][year] > 0);
      
      if (hasData) {
        datasets.push({
          label: department,
          data: yearsSorted.map(year => departmentDataByYear[department][year]),
          backgroundColor: colors[index % colors.length],
          borderColor: colors[index % colors.length].replace("0.6", "1"),
          borderWidth: 1
        });
      }
    });

    return {
      labels: yearsSorted,
      datasets: datasets
    };
    
  } catch (error) {
    console.error("Error in summaryDepartmentDetails:", error);
    return { labels: [], datasets: [] };
  }
};

// สรุปข้อมูลภาควิชาตามปีที่เลือก
export const summaryFilterDepartmentDetails = (data, selectedYear = "", selectedFund = "") => {
  // ตอนนี้ใช้ฟังก์ชัน summaryDepartmentDetails แทน
  return summaryDepartmentDetails(data, selectedYear, selectedFund);
};

// สรุปแหล่งเงินตามปี
export const summaryFundPerYear = (data, selectedYear = "", selectedFund = "") => {
  try {
    if (!data || !data.departmentDetails) {
      console.error("ไม่มีข้อมูล departmentDetails");
      return { labels: [], datasets: [] };
    }

    // แยกช่วงปีที่เลือก
    const yearRange = parseYearRange(selectedYear);
    const fundTypes = selectedFund ? selectedFund.split(",") : [];
    const allYears = new Set();

    // รวบรวมปีทั้งหมดที่มีในข้อมูลและอยู่ในช่วงที่เลือก
    Object.keys(data.departmentDetails).forEach(department => {
      Object.keys(data.departmentDetails[department]).forEach(fundType => {
        Object.keys(data.departmentDetails[department][fundType]).forEach(year => {
          if (isYearInRange(year, yearRange)) {
            allYears.add(year);
          }
        });
      });
    });

    if (allYears.size === 0) {
      return { labels: [], datasets: [] };
    }

    const yearsSorted = Array.from(allYears).sort();
    const datasets = [];

    // กรองแหล่งเงินที่ต้องการแสดง
    const fundsToShow = fundTypes.length > 0 ? 
      fundTypes : 
      (data.fundTypes ? data.fundTypes : Object.keys(data.departmentDetails[Object.keys(data.departmentDetails)[0]] || {}));

    // สีสำหรับแต่ละแหล่งเงิน
    const colors = [
      "rgba(75, 192, 192, 0.6)", 
      "rgba(255, 159, 64, 0.6)",
      "rgba(54, 162, 235, 0.6)", 
      "rgba(255, 99, 132, 0.6)"
    ];

    // สร้างข้อมูลสำหรับแต่ละแหล่งเงิน
    fundsToShow.forEach((fundType, index) => {
      const fundYearlyData = {};
      
      // เริ่มต้นค่า 0 สำหรับทุกปี
      yearsSorted.forEach(year => {
        fundYearlyData[year] = 0;
      });

      // รวมค่าจากทุกภาควิชา
      Object.keys(data.departmentDetails).forEach(department => {
        const deptData = data.departmentDetails[department];
        if (deptData && deptData[fundType]) {
          Object.keys(deptData[fundType]).forEach(year => {
            if (isYearInRange(year, yearRange)) {
              const yearData = deptData[fundType][year];
              if (Array.isArray(yearData)) {
                fundYearlyData[year] += yearData.reduce((sum, val) => sum + val, 0);
              }
            }
          });
        }
      });

      // ตรวจสอบว่ามีข้อมูลสำหรับแหล่งเงินนี้หรือไม่
      const hasData = yearsSorted.some(year => fundYearlyData[year] > 0);
      
      if (hasData) {
        datasets.push({
          label: fundType,
          data: yearsSorted.map(year => fundYearlyData[year]),
          backgroundColor: colors[index % colors.length],
          borderColor: colors[index % colors.length].replace("0.6", "1"),
          borderWidth: 1
        });
      }
    });

    return {
      labels: yearsSorted,
      datasets: datasets
    };
  } catch (error) {
    console.error("Error in summaryFundPerYear:", error);
    return { labels: [], datasets: [] };
  }
};

// สรุปครุภัณฑ์ของแต่ละภาควิชารายปี
export const summaryDepartmentAssetsPerYear = (data, selectedYear = "", selectedDepartment = "") => {
  try {
    if (!data || !data.departmentDetails) {
      console.error("ไม่มีข้อมูลdepartmentDetails");
      return { labels: [], datasets: [] };
    }

    // แยกช่วงปีที่เลือก
    const yearRange = parseYearRange(selectedYear);
    const departments = selectedDepartment ? selectedDepartment.split(",") : Object.keys(data.departmentDetails);
    const allYears = new Set();
    
    // รวบรวมปีทั้งหมดจากข้อมูล
    Object.keys(data.departmentDetails).forEach(department => {
      // ถ้าเลือกภาควิชาและไม่ตรงกับภาควิชานี้ ให้ข้าม
      if (selectedDepartment && !departments.includes(department)) return;
      
      const statusData = data.departmentDetails[department];
      if (typeof statusData === 'object') {
        Object.keys(statusData).forEach(status => {
          const yearData = statusData[status];
          if (typeof yearData === 'object') {
            Object.keys(yearData).forEach(year => {
              if (isYearInRange(year, yearRange)) {
                allYears.add(year);
              }
            });
          }
        });
      }
    });
    
    if (allYears.size === 0) {
      return { labels: [], datasets: [] };
    }

    const yearsSorted = Array.from(allYears).sort();
    const datasets = [];
    
    // สร้าง datasets สำหรับแต่ละภาควิชา
    departments.forEach((department, index) => {
      if (!data.departmentDetails[department]) return;
      
      const statusData = data.departmentDetails[department];
      const departmentYearlyData = {};
      
      // เริ่มต้นค่า 0 สำหรับทุกปี
      yearsSorted.forEach(year => {
        departmentYearlyData[year] = 0;
      });
      
      if (typeof statusData === 'object') {
        // รวมข้อมูลของทุกสถานะในแต่ละปี
        Object.keys(statusData).forEach(status => {
          const yearData = statusData[status];
          if (typeof yearData === 'object') {
            Object.keys(yearData).forEach(year => {
              if (isYearInRange(year, yearRange)) {
                const assetData = yearData[year];
                if (!departmentYearlyData[year]) {
                  departmentYearlyData[year] = 0;
                }
                departmentYearlyData[year] += Array.isArray(assetData) ? 
                  assetData.reduce((sum, val) => sum + val, 0) : 0;
              }
            });
          }
        });
        
        // ตรวจสอบว่ามีข้อมูลสำหรับภาควิชานี้หรือไม่
        const hasData = yearsSorted.some(year => departmentYearlyData[year] > 0);
        
        if (hasData) {
          // สร้าง dataset
          const color = getRandomColor();
          
          datasets.push({
            label: department,
            data: yearsSorted.map(year => departmentYearlyData[year]),
            backgroundColor: color,
            borderColor: color.replace("0.6", "1"),
            borderWidth: 1
          });
        }
      }
    });

    return {
      labels: yearsSorted,
      datasets: datasets
    };
    
  } catch (error) {
    console.error("Error in summaryDepartmentAssetsPerYear:", error);
    return { labels: [], datasets: [] };
  }
};

// สรุปจำนวนครุภัณฑ์ตามสถานะและภาควิชา
export const summaryFilterDepartmentAssetsByStatus = (data, selectedDepartment = "", selectedAssetStatus = "", selectedYear = "") => {
  try {
    if (!data || !data.statusSummaryByDepartment) {
      console.error("ไม่มีข้อมูล statusSummaryByDepartment");
      return { label: "No data", total: 0, color: "#CCCCCC" };
    }

    // แยกช่วงปีที่เลือก
    const yearRange = parseYearRange(selectedYear);

    // ถ้าไม่ได้เลือกสถานะ ให้ใช้สถานะแรกในข้อมูล
    const status = selectedAssetStatus || Object.keys(data.statusSummaryByDepartment)[0];
    
    // ถ้าไม่มีข้อมูลของสถานะที่เลือก
    if (!data.statusSummaryByDepartment[status]) {
      return { label: `${status}`, total: 0, color: "#CCCCCC" };
    }

    // ถ้าเลือกภาควิชา ให้แสดงเฉพาะภาควิชานั้น
    if (selectedDepartment) {
      const departments = selectedDepartment.split(",");
      
      // ถ้าเลือกหลายภาควิชา ให้รวมยอด
      if (departments.length > 1) {
        let totalValue = 0;
        departments.forEach(dept => {
          if (data.statusSummaryByDepartment[status][dept]) {
            totalValue += data.statusSummaryByDepartment[status][dept];
          }
        });
        
        return {
          label: `${departments.join(", ")} - ${status}`,
          total: totalValue,
          color: getColorByTotal(totalValue)
        };
      }
      
      // กรณีเลือกภาควิชาเดียว
      const department = departments[0];
      const departmentValue = data.statusSummaryByDepartment[status][department] || 0;
      return {
        label: `${department} - ${status}`,
        total: departmentValue,
        color: getColorByTotal(departmentValue)
      };
    }
    
    // ถ้าไม่ได้เลือกภาควิชา ให้แสดงทุกภาควิชา
    const departmentTotals = Object.entries(data.statusSummaryByDepartment[status]).map(([dept, value]) => ({
      label: `${dept} - ${status}`,
      total: value,
      color: getColorByTotal(value)
    }));

    return departmentTotals.length ? departmentTotals[0] : { label: `${status}`, total: 0, color: "#CCCCCC" };
    
  } catch (error) {
    console.error("Error in summaryFilterDepartmentAssetsByStatus:", error);
    return { label: "Error", total: 0, color: "#FF0000" };
  }
};

// สร้างกราฟวงกลมแยกตามสถานะครุภัณฑ์ แสดงสัดส่วนของแต่ละภาควิชาในแต่ละสถานะ
export const createAssetStatusPieCharts = (data, selectedDepartment = "", selectedYear = "") => {
  try {
    if (!data || !data.statusSummaryByDepartment || !data.departments) {
      console.error("Invalid data for asset status charts");
      return [];
    }

    // แยกช่วงปีที่เลือก
    const yearRange = parseYearRange(selectedYear);
    
    // เลือกภาควิชาที่ต้องการแสดง
    const departments = selectedDepartment ? 
      selectedDepartment.split(",") : data.departments;
    
    const assetStatuses = Object.keys(data.statusSummaryByDepartment);
    const pieCharts = [];

    // กำหนดสีสำหรับแต่ละภาควิชา
    const departmentColors = {
      "ครุศาสตร์วิศวกรรม": {
        backgroundColor: "#2c3e50",
        borderColor: "#1c2e40"
      },
      "ครุศาสตร์เกษตร": {
        backgroundColor: "#e67e22",
        borderColor: "#d35400"
      },
      "ครุศาสตร์สถาปัตยกรรม": {
        backgroundColor: "#27ae60",
        borderColor: "#219d50"
      },
      "ครุศาสตร์การออกแบบ": {
        backgroundColor: "#3498db",
        borderColor: "#2980b9"
      },
      "ครุศาสตร์การออกแบบสภาพแวดล้อมภายใน": {
        backgroundColor: "#9b59b6",
        borderColor: "#8e44ad"
      }
    };

    // สร้างกราฟวงกลมสำหรับแต่ละสถานะ
    for (const status of assetStatuses) {
      // ข้อมูลภาควิชาสำหรับสถานะนี้
      const departmentValues = {};
      let totalForStatus = 0;

      // รวมค่าสำหรับแต่ละภาควิชาในสถานะนี้
      for (const dept of departments) {
        // ถ้าไม่มีข้อมูลของภาควิชานี้ ให้ข้าม
        if (!data.statusSummaryByDepartment[status][dept]) continue;
        
        let value = 0;
        
        // ถ้ามีการกรองตามปี
        if (yearRange.start && data.departmentDetails) {
          // ตรวจสอบว่ามีข้อมูลที่ต้องการหรือไม่
          if (data.departmentDetails[dept] && data.departmentDetails[dept][status]) {
            // รวมค่าเฉพาะปีที่อยู่ในช่วง
            Object.keys(data.departmentDetails[dept][status]).forEach(year => {
              if (isYearInRange(year, yearRange)) {
                const yearData = data.departmentDetails[dept][status][year];
                if (Array.isArray(yearData)) {
                  value += yearData.reduce((sum, val) => sum + val, 0);
                } else if (typeof yearData === "number") {
                  value += yearData;
                }
              }
            });
          }
        } else {
          // ถ้าไม่มีการกรองตามปี ใช้ค่ารวมทั้งหมด
          value = data.statusSummaryByDepartment[status][dept] || 0;
        }
        
        if (value > 0) {
          departmentValues[dept] = value;
          totalForStatus += value;
        }
      }

      // ถ้าไม่มีข้อมูลสำหรับสถานะนี้ ให้ข้าม
      if (totalForStatus === 0) continue;

      // คำนวณเปอร์เซ็นต์และสร้างข้อมูลสำหรับกราฟ
      const labels = [];
      const dataValues = [];
      const backgroundColors = [];
      const borderColors = [];
      
      for (const dept in departmentValues) {
        labels.push(dept);
        dataValues.push(departmentValues[dept]);
        backgroundColors.push(departmentColors[dept]?.backgroundColor || getRandomColor());
        borderColors.push(departmentColors[dept]?.borderColor || getRandomColor().replace("0.6", "1"));
      }

      // สร้างชุดข้อมูลสำหรับกราฟวงกลม
      if (dataValues.length > 0) {
        pieCharts.push({
          title: status,
          data: {
            labels: labels,
            datasets: [{
              data: dataValues,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1
            }]
          },
          totalValue: totalForStatus
        });
      }
    }

    return pieCharts;
  } catch (error) {
    console.error("Error in createAssetStatusPieCharts:", error);
    return [];
  }
};

// ดึงข้อมูลจาก API
export const fetchDataFromAPI = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/getData"); 
    if (!response.ok) {
      throw new Error("Cannot fetch data from API");
    }
    
    const result = await response.json();
    
    // ตรวจสอบและ log โครงสร้างข้อมูลที่ได้รับ
    console.log("Data structure received:", Object.keys(result));
    
    return result;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
};