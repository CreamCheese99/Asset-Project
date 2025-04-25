import React, { useState, useEffect } from "react";
import { FaTable } from "react-icons/fa";
import axios from "axios";

const SearchForm = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    main_asset_id: "",
    department_id: "",
    usage: "",
    asset_type: "",
    fiscal_year: "",
    budget_type: "",
    // responsible_person:"",
  });


  //เก็บข้อมูลประเภทสินทรัพย์และภาควิชา (จาก API)
  const [assetType, setAssetType] = useState([]);
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    const fetchAssetType = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/asset_type");
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
        const response = await axios.get("http://localhost:5001/api/department");
        if (Array.isArray(response.data)) {
          setDepartment(response.data);
        }
      } catch (err) {
        console.error("Error fetching department:", err);
      }
    };
    fetchDepartment();
  }, []);


  // const getYearOptions = () => {
  //   const currentYear = new Date().getFullYear();
  //   return Array.from({ length: 21 }, (_, i) => currentYear - 10 + i + 543);
  // };
  const [fiscalYears, setFiscalYears] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5001/api/fiscal-years') // ระบุ URL ให้ตรงกับ backend
      .then((response) => {
        setFiscalYears(response.data);
      })
      .catch((error) => {
        console.error('Error fetching fiscal years:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };


  const handleSearch = () => {
    const formattedFilters = {
      main_asset_id: filters.main_asset_id.trim(),
      department_id: filters.department_id, 
      usage: filters.usage,
      asset_type: filters.asset_type,
      fiscal_year: filters.fiscal_year,
      budget_type: filters.budget_type,
  
    };

    console.log("Filters ส่งออก:", formattedFilters);
    onFilter(formattedFilters); // ส่งข้อมูลฟิลเตอร์ไปยัง Parent Component
  };




  return (
    <div className="bg-white mt-6 p-6 rounded-2xl shadow-lg">
      {/* ฟอร์มกรองข้อมูล */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
           {/* ปีงบประมาณ */}
             <div>
               <label className="block text-sm font-semibold text-gray-700 mb-2">ประจำปีงบประมาณ</label>
               <select
                name="fiscal_year"
                value={filters.fiscal_year}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- กรุณาเลือก --</option>
                {fiscalYears.map((item) => (
                  <option key={item.fiscal_year} value={item.fiscal_year}>
                    {item.fiscal_year}
                  </option>
                ))}
              </select>
            </div>
    
            {/* ภาควิชา */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ภาควิชา</label>
              <select
                name="department_id"
                value={filters.department_id}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- กรุณาเลือก --</option>
                {department.map((dept) => (
                  <option key={dept.department_id} value={dept.department_id}>{dept.department_name}</option>
                ))}
              </select>
            </div>
    
            {/* ประเภทสินทรัพย์ */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ประเภทสินทรัพย์</label>
              <select
                name="asset_type"
                value={filters.asset_type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- กรุณาเลือก --</option>
                {assetType.map((asset) => (
                  <option key={asset.asset_type_name} value={asset.asset_type_name}>{asset.asset_type_name}</option>
                ))}
              </select>
            </div>

             {/* สภาพการครุภัณฑ์ */}
             <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">สภาพการครุภัณฑ์</label>
              <select
                name="usage"
                value={filters.usage}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
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
    
            {/* ประเภทเงิน */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ประเภทเงิน</label>
              <select
                name="budget_type"
                value={filters.budget_type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- กรุณาเลือก --</option>
                <option value="เงินรายได้">เงินรายได้</option>
                <option value="เงินงบประมาณ">เงินงบประมาณ</option>
                <option value="เงินสะสมคลัง">เงินสะสมคลัง</option>
                <option value="เงินกันเหลือบปี">เงินกันเหลือบปี</option>
              </select>
            </div>
      </div>

      <div className="mb-6 mt-6 p-4 bg-gray-50 rounded-lg">
        <label className="block text-sm font-semibold text-gray-700 mb-2">รหัสทรัพย์สิน</label>
        <input
          type="text"
          name="main_asset_id"
          value={filters.main_asset_id}
          onChange={handleChange}
          placeholder="สมอ.xxx-xxx-xxxx/61"
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSearch}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          <FaTable /> แสดงข้อมูล
        </button>
      </div>
    </div>
  );
};

export default SearchForm;

