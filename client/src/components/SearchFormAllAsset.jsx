import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from 'axios'; // Import axios

const SearchFormAllAsset = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    assetCode: "",
    department: "", // เลือกภาควิชาจากดรอปดาวน์
    status: "ใช้งาน",
    assetType: "ครุภัณฑ์สำนักงาน",
    budgetYear: "2566",
  });

  // State to store asset types and departments
  const [assetType, setAssetType] = useState([]); // Asset types state
  const [departments, setDepartments] = useState([]); // Departments state

  // Fetch asset type data from the API using axios
  useEffect(() => {
    const fetchAssetType = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/asset_type');
        if (Array.isArray(response.data)) {
          setAssetType(response.data); // Set the asset types
        } else {
          console.error("The response data is not an array:", response.data);
        }
      } catch (err) {
        console.error('Error fetching Asset_Type:', err);
      }
    };

    fetchAssetType();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Fetch department data from the API using axios
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/department');
        if (Array.isArray(response.data)) {
          setDepartments(response.data); // Set the departments
        } else {
          console.error("The response data is not an array:", response.data);
        }
      } catch (err) {
        console.error('Error fetching department:', err);
      }
    };

    fetchDepartment();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilter(updatedFilters); // Send updated filters to the parent component
  };

  // Generate the options for the budget year (current year +/- 10 years)
  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i + 543); // Convert to Thai Buddhist year
    }
    return years;
  };

  return (
    <div className="bg-white mt-4 p-6 rounded-lg shadow-lg max-w-full mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        <FaSearch className="inline-block text-teal-500 mr-2" />
        ค้นหาข้อมูลครุภัณฑ์
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            รหัสทรัพย์สิน
          </label>
          <input
            type="text"
            name="assetCode"
            value={filters.assetCode}
            onChange={handleChange}
            placeholder="สมอ.xxx-xxx-xxxx/61"
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">ประเภทสินทรัพย์</label>
          <select
            name="assetType"
            value={filters.assetType}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">-- กรุณาเลือก --</option>
            {Array.isArray(assetType) &&
              assetType.map((asset) => (
                <option key={asset.asset_type_id} value={asset.asset_type_name}>
                  {asset.asset_type_name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-2">ภาควิชา</label>
          <select
            name="department"
            value={filters.department}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">-- กรุณาเลือก --</option>
            {Array.isArray(departments) &&
              departments.map((dept) => (
                <option key={dept.department_id} value={dept.department_id}>
                  {dept.department_name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            ประจำปีงบประมาณ
          </label>
          <select
              name="budgetYear"
              value={filters.budgetYear} // If filters.budgetYear is empty, the placeholder will be shown
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">-- กรุณาเลือก --</option> {/* Placeholder option */}
              {getYearOptions().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            สภาพการครุภัณฑ์
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">-- กรุณาเลือก --</option> {/* Placeholder option */}
            <option value="ใช้งาน">ใช้งาน</option>
            <option value="ซ่อม">ซ่อม</option>
            <option value="ชำรุด">ชำรุด</option>
            <option value="บริจาค/โอน">บริจาค/โอน</option>
            <option value="รับโอน">รับโอน</option>
            <option value="จำหน่าย">จำหน่าย</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default SearchFormAllAsset;
