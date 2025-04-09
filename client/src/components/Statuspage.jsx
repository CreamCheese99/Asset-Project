import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Statuspage() {
  const navigate = useNavigate();
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ฟังก์ชันในการดึงข้อมูลจาก API
    const fetchDepartmentData = async () => {
      try {
        // ใช้ URL ของ API ที่รันที่พอร์ต 5000
        const response = await fetch('http://localhost:5000/api/getData');
        const data = await response.json();

        // หาก API ตอบกลับข้อมูลที่เป็น array ของพัสดุ (ตัวอย่างข้อมูลต้องปรับตามจริง)
        if (Array.isArray(data)) {
          // จัดกลุ่มข้อมูลตามภาควิชาและสถานะพัสดุ
          const groupedData = groupAssetsByDepartmentAndStatus(data);
          setDepartmentData(groupedData);
        } else {
          console.error('ข้อมูลที่ได้รับไม่ตรงตามรูปแบบที่คาดหวัง');
        }
      } catch (error) {
        console.error('Error fetching department data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentData();
  }, []);

  // ฟังก์ชันการจัดกลุ่มพัสดุตามภาควิชาและสถานะ
  const groupAssetsByDepartmentAndStatus = (data) => {
    const grouped = {};

    data.forEach(item => {
      const { department, assetStatus } = item;
      
      if (!grouped[department]) {
        grouped[department] = {};
      }

      if (!grouped[department][assetStatus]) {
        grouped[department][assetStatus] = 0;
      }

      grouped[department][assetStatus]++;
    });

    return grouped;
  };

  return (
    <div>
      <h1>สถานะพัสดุตามภาควิชา</h1>
      
      {loading ? (
        <p>กำลังโหลดข้อมูล...</p>
      ) : (
        Object.keys(departmentData).map(department => (
          <div key={department}>
            <h2>{department}</h2>
            <table>
              <thead>
                <tr>
                  <th>สถานะพัสดุ</th>
                  <th>จำนวน</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(departmentData[department]).map(status => (
                  <tr key={status}>
                    <td>{status}</td>
                    <td>{departmentData[department][status]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}

export default Statuspage;
