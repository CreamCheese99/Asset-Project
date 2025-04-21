
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const SearchFormAllAsset = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    main_asset_id: "",
    department_id: "",  // ใช้ department_id แทน department_name
    usage: "",
    asset_type: ""
    
  });

  const [assetType, setAssetType] = useState([]);
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    const fetchAssetType = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/asset_type");
        if (Array.isArray(response.data)) {
          setAssetType(response.data);
        }
      } catch (err) {
        console.error("Error fetching Asset_Type:", err);
      }
    };
    fetchAssetType();
  }, []);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/department");
        if (Array.isArray(response.data)) {
          setDepartment(response.data);
        }
      } catch (err) {
        console.error("Error fetching department:", err);
      }
    };
    fetchDepartment();
  }, []);

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 21 }, (_, i) => currentYear - 10 + i + 543);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const formattedFilters = {
      main_asset_id: filters.main_asset_id.trim() || null,  // ถ้าไม่มีค่าใช้ null
      department_id: filters.department_id || null,  // ถ้าไม่มีค่าใช้ null
      usage: filters.usage || null,  // ถ้าไม่มีค่าใช้ null
      asset_type: filters.asset_type || null  // ถ้าไม่มีค่าใช้ null 
    };

    console.log("Filters ส่งออก:", formattedFilters);
    onFilter(formattedFilters);  // ส่งค่าที่ถูกต้องไปยัง ManageAssets
  };

  return (
    <div className="bg-white mt-4 p-4 rounded-xl shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-2">รหัสทรัพย์สิน</label>
          <input
            type="text"
            name="main_asset_id"
            value={filters.main_asset_id}
            onChange={handleChange}
            placeholder="สมอ.xxx-xxx-xxxx/61"
            className="w-full border-2 border-blue-100 rounded-xl p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-2">ภาควิชา</label>
          <select
            name="department_id"
            value={filters.department_id}
            onChange={handleChange}
            className="w-full border-2 border-blue-100 rounded-xl p-2"
          >
            <option value="">-- กรุณาเลือก --</option>
            {department.map((dept) => (
              <option key={dept.department_id} value={dept.department_id}>{dept.department_name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-2">ประเภทสินทรัพย์</label>
          <select
            name="asset_type"
            value={filters.asset_type}
            onChange={handleChange}
            className="w-full border-2 border-blue-100 rounded-xl p-2"
          >
            <option value="">-- กรุณาเลือก --</option>
            {assetType.map((asset) => (
              <option key={asset.asset_type_id} value={asset.asset_type_id}>{asset.asset_type_name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-2">สภาพการครุภัณฑ์</label>
          <select
            name="usage"
            value={filters.usage}
            onChange={handleChange}
            className="w-full border-2 border-blue-100 rounded-xl p-2"
          >
            <option value="">-- กรุณาเลือก --</option>
            <option value="ใช้งาน">ใช้งาน</option>
            <option value="ซ่อม">ซ่อม</option>
            <option value="ชำรุด">ชำรุด</option>
            <option value="บริจาค/โอน">บริจาค/โอน</option>
            <option value="รับโอน">รับโอน</option>
            <option value="จำหน่าย">จำหน่าย</option>
          </select>
        </div>


        <div className="col-span-1 sm:col-span-2 md:col-span-4 flex justify-end">
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center"
          >
            <FaSearch className="mr-2" /> ค้นหา
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFormAllAsset;
