import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import "../css/AssetForm.css";  // หากไฟล์ AssetForm.css อยู่ใน src/css


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
    <div className="asset-form-container">
      <h3 className="asset-form-title">ข้อมูลครุภัณฑ์</h3>
      <div className="asset-form-grid">
        <div>
          <label className="asset-form-label">รหัสทรัพย์สิน</label>
          <input
            type="text"
            className="asset-form-input"
            placeholder="สมอ.xxx-xxx-xxxx/61"
            value={value.main_asset_id || ''} 
            onChange={(e) => onChange('main_asset_id', e.target.value)}
          />
        </div>

        <div>
          <label className="asset-form-label">ภาควิชา</label>
          <select
            className="asset-form-select"
            value={value.department_id} 
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
          <label className="asset-form-label">สภาพการครุภัณฑ์</label>
          <select
            className="asset-form-select"
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
