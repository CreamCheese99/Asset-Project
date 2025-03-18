import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

const AssetForm = ({ value, onChange }) => {
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    // Fetch department data from the API using axios
    const fetchDepartment = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/department');
        // Ensure that response.data is an array
        if (Array.isArray(response.data)) {
          setDepartment(response.data); // Set the department to state
        } else {
          console.error("The response data is not an array:", response.data);
        }
      } catch (err) {
        console.error('Error fetching department:', err);
      }
    };

    fetchDepartment();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="bg-white mt-4 p-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold text-gray-700 mb-4">ข้อมูลครุภัณฑ์</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm mb-2">รหัสทรัพย์สิน</label>
          <input
            type="text"
            className="w-full border-2 border-blue-100 rounded-xl p-2 p-2"
            placeholder="สมอ.xxx-xxx-xxxx/61"
            value={value.main_asset_id || ''} 
            onChange={(e) => onChange('main_asset_id', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-2">ภาควิชา</label>
          <select
            className="w-full border-2 border-blue-100 rounded-xl p-2 p-2"
            value={value.department_id || ''} 
            onChange={(e) => onChange('department_id', e.target.value)} 
          >
            <option value="">-- กรุณาเลือก --</option>
            {Array.isArray(department) && department.map((dept) => (
              <option key={dept.department_id} value={dept.department_id}>
                {dept.department_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-2">สภาพการครุภัณฑ์</label>
          <select
            className="w-full border-2 border-blue-100 rounded-xl p-2 p-2"
            value={value.status || ''} 
            onChange={(e) => onChange('status', e.target.value)}
          >
            <option value="">-- กรุณาเลือก --</option> 
            <option>ใช้งาน</option>
            <option>ส่งซ่อม</option>
            <option>ชำรุด</option>
            <option>บริจาค/โอน</option>
            <option>รับโอน</option>
            <option>จำหน่าย</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AssetForm;
