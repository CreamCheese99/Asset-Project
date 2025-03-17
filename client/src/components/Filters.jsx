import React, { useState, useEffect } from 'react';

const Filters = ({ selectedDepartment, setSelectedDepartment, selectedFund, setSelectedFund, selectedYear, handleYearChange, errorMessage }) => {
  const [departments, setDepartments] = useState([]);
  const [fundTypes, setFundTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  // ดึงข้อมูลภาควิชาและแหล่งทุนจาก API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // ดึงข้อมูลจาก API ของเซิร์ฟเวอร์
        const response = await fetch('/api/getData'); // เปลี่ยน URL เป็น '/api/getData'
        if (!response.ok) throw new Error('ไม่สามารถดึงข้อมูลได้');
        
        const data = await response.json(); // ดึงข้อมูล JSON

        // ตั้งค่าข้อมูลภาควิชาและแหล่งทุน
        setDepartments(data.departments);
        setFundTypes(data.fundTypes);

        setLoading(false); // เปลี่ยนสถานะการโหลด
      } catch (error) {
        setApiError('เกิดข้อผิดพลาดในการดึงข้อมูล');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '10px', marginBottom: '20px', display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr 1fr' }}>
      {apiError && <div style={{ color: 'red', gridColumn: 'span 3' }}>{apiError}</div>}
      
      <div>
        <label>ภาควิชา:</label>
        <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} style={{ width: '100%', padding: '5px' }}>
          <option value="">-- ทุกภาควิชา --</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      <div>
        <label>แหล่งเงิน:</label>
        <select value={selectedFund} onChange={(e) => setSelectedFund(e.target.value)} style={{ width: '100%', padding: '5px' }}>
          <option value="">-- ทุกแหล่งทุน --</option>
          {fundTypes.map((fund) => (
            <option key={fund} value={fund}>{fund}</option>
          ))}
        </select>
      </div>

      <div>
        <label>ปี:</label>
        <input
          type="text"
          value={selectedYear}
          onChange={handleYearChange}
          placeholder="2565 หรือ 2565-2568"
          style={{ width: '100%', padding: '5px' }}
        />
        {errorMessage && <div style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Filters;
