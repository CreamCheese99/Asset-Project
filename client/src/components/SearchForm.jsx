import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchForm = () => {
  const [assetType, setAssetType] = useState([]);
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    const fetchAssetType = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/asset_type');
        if (Array.isArray(response.data)) {
          setAssetType(response.data);
        } else {
          console.error("The response data is not an array:", response.data);
        }
      } catch (err) {
        console.error('Error fetching Asset_Type:', err);
      }
    };

    fetchAssetType();
  }, []);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/department');
        if (Array.isArray(response.data)) {
          setDepartment(response.data);
        } else {
          console.error("The response data is not an array:", response.data);
        }
      } catch (err) {
        console.error('Error fetching department:', err);
      }
    };

    fetchDepartment();
  }, []);

  return (
    <div className="bg-white mt-4 p-4 rounded-xl shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-700 text-sm mb-2">ภาควิชา</label>
          <select className="w-full border-2 border-blue-100 rounded-xl p-2">
            <option value="">-- กรุณาเลือก --</option>
            {department.map((dept) => (
              <option key={dept.department_id} value={dept.department_id}>
                {dept.department_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-2">ประเภทสินทรัพย์</label>
          <select className="w-full border-2 border-blue-100 rounded-xl p-2">
            <option value="">-- กรุณาเลือก --</option>
            {assetType.map((asset) => (
              <option key={asset.asset_type_id} value={asset.asset_type_id}>
                {asset.asset_type_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-2">ประเภทเงิน</label>
          <select className="w-full border-2 border-blue-100 rounded-xl p-2">
            <option>-- กรุณาเลือก --</option>
            <option>เงินรายได้</option>
            <option>เงินงบประมาณ</option>
            <option>เงินสะสมคลัง</option>
            <option>เงินกันเหลือบปี</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-2">สภาพการครุภัณฑ์</label>
          <select className="w-full border-2 border-blue-100 rounded-xl p-2">
            <option>-- กรุณาเลือก --</option>
            <option>ใช้งาน</option>
            <option>ซ่อม</option>
            <option>ชำรุด</option>
            <option>บริจาค/โอน</option>
            <option>รับโอน</option>
            <option>จำหน่าย</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-gray-700 text-sm mb-2">รหัสทรัพย์สิน</label>
          <input type="text" className="w-full border-2 border-blue-100 rounded-xl p-2" />
        </div>

        <div className="col-span-1 sm:col-span-2 md:col-span-4 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
            ค้นหา
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
