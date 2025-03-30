const client = require('./db'); // นำเข้า client ที่เชื่อมต่อฐานข้อมูล

// ฟังก์ชันดึงข้อมูลแผนก
async function getDepartments() {
  const result = await client.query('SELECT * FROM public.department');
  return result.rows;
}

// ฟังก์ชันดึงข้อมูลสินทรัพย์หลัก (main asset)
async function getMainAssets() {
  const result = await client.query('SELECT * FROM public.mainasset');
  return result.rows;
}

// ฟังก์ชันสรุปข้อมูลแผนก
async function summaryDepartmentDetails() {
  const departments = await getDepartments();
  const mainAssets = await getMainAssets();

  const summary = {};

  // สรุปข้อมูลแผนก
  departments.forEach(department => {
    summary[department.department_name] = [];

    // ค้นหาสินทรัพย์หลักที่เกี่ยวข้องกับแผนก
    mainAssets.forEach(asset => {
      if (asset.department_id === department.department_id) {
        summary[department.department_name].push({
          main_asset_name: asset.main_asset_name,
          fiscal_year: asset.fiscal_year,
          budget_type: asset.budget_type,
          location_use: asset.location_use,
          budget_limit: asset.budget_limit,
        });
      }
    });
  });

  return summary;
}

// API ที่ให้บริการสรุปข้อมูลแผนก
async function getDepartmentSummary(req, res) {
  try {
    const summary = await summaryDepartmentDetails();
    res.json({ departmentDetails: summary });
  } catch (error) {
    res.status(500).json({ message: "Error fetching department details", error });
  }
}

module.exports = {
  getDepartmentSummary,
};
