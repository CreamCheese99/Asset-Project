export function summaryDepartmentDetails(data) {
  const summary = {};
  let years = new Set(); // ใช้ Set เพื่อหลีกเลี่ยงการซ้ำ

  for (const department of Object.keys(data.departmentDetails)) {
    summary[department] = {};
    for (const fundType of Object.keys(data.departmentDetails[department])) {
      summary[department][fundType] = [];
      for (const year of Object.keys(data.departmentDetails[department][fundType])) {
        const total = data.departmentDetails[department][fundType][year].reduce((acc, val) => acc + val, 0);
        summary[department][fundType].push({ year, total });
        years.add(year); // ใช้ Set เพื่อเพิ่มปี
      }
    }
  }

  // สร้าง arrays จาก Set ปี
  years = Array.from(years);

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
  let years = new Set();

  for (const department of Object.keys(data.departmentAssets)) {
    summary[department] = {};
    for (const assetStatus of Object.keys(data.departmentAssets[department])) {
      summary[department][assetStatus] = [];
      for (const year of Object.keys(data.departmentAssets[department][assetStatus])) {
        const total = data.departmentAssets[department][assetStatus][year].reduce((acc, val) => acc + val, 0);
        summary[department][assetStatus].push({ year, total });
        years.add(year);
      }
    }
  }

  years = Array.from(years);

  const colors = [
    "rgba(75, 192, 192, 0.2)", "rgba(255, 159, 64, 0.2)",
    "rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"
  ];
  const borderColors = [
    "rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)",
    "rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"
  ];

  let colorIndex = 0;

  const datasets = Object.keys(summary).flatMap((faculty) =>
    Object.keys(summary[faculty]).map((status) => {
      const dataset = {
        label: `${faculty} - ${status}`,
        data: summary[faculty][status].map(item => item.total),
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
  let years = new Set();

  if (!department) {
    department = Object.keys(data.departmentDetails)[0] || "";
  }

  if (!data.departmentDetails[department]) {
    return { labels: [], datasets: [] };
  }

  summary[department] = {};

  const selectedFundTypes = fundType ? [fundType] : Object.keys(data.departmentDetails[department]);

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

      years.add(yr);
    });
  });

  years = Array.from(years);

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
  let years = new Set();

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

      years.add(yr);
    });
  });

  years = Array.from(years);

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
