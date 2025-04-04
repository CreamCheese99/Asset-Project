// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import axios
// import "../css/AssetForm.css";  // หากไฟล์ AssetForm.css อยู่ใน src/css


// const AssetForm = ({ value, onChange }) => {
//   const [department, setDepartment] = useState([]);

//   useEffect(() => {
//     // Fetch department data from the API using axios
//     const fetchDepartment = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/api/department');
//         // Ensure that response.data is an array
//         if (Array.isArray(response.data)) {
//           setDepartment(response.data); // Set the department to state
//         } else {
//           console.error("The response data is not an array:", response.data);
//         }
//       } catch (err) {
//         console.error('Error fetching department:', err);
//       }
//     };

//     fetchDepartment();  
//   }, []); // Empty dependency array ensures this runs once on mount



  

//   return (
//     <div className="asset-form-container">
//       <h3 className="asset-form-title">ข้อมูลครุภัณฑ์</h3>
//       <div className="asset-form-grid">
//         <div>
//           <label className="asset-form-label">รหัสทรัพย์สิน</label>
//           <input
//             type="text"
//             className="asset-form-input"
//             placeholder="สมอ.xxx-xxx-xxxx/61"
//             value={value.main_asset_id || ''} 
//             onChange={(e) => onChange('main_asset_id', e.target.value)}
//           />
//         </div>
// {/* 
//         <div>
//           <label className="asset-form-label">ภาควิชา</label>
//           <select
//             className="asset-form-select"
//             value={value.department_id} 
//             onChange={(e) => onChange('department_id', e.target.value)} 
//           >
//             <option value="">-- กรุณาเลือก --</option>
//             {Array.isArray(department) && department.map((dept) => (
//               <option key={dept.department_id} value={dept.department_id}>
//                 {dept.department_name}
//               </option>
//             ))}
//           </select>
//         </div> */}


//     <div>
//       <label className="asset-form-label">ภาควิชา</label>
//       <select
//         className="asset-form-select"
//         value={value.department_id}
//         onChange={(e) => handleDepartmentChange(e.target.value)}
//       >
//         <option value="">-- กรุณาเลือก --</option>
//         {Array.isArray(department) &&
//           department.map((dept) => (
//             <option key={dept.department_id} value={dept.department_id}>
//               {dept.department_name}
//             </option>
//           ))}
//       </select>

//       {curriculum.length > 0 && (
//         <div>
//           <label className="asset-form-label">เลือกหลักสูตร</label>
//           {curriculum.map((course) => (
//             <div key={course.course_id}>
//               <input
//                 type="checkbox"
//                 value={course.course_id}
//                 checked={value.curriculum.includes(course.course_id)}
//                 onChange={() => handleCourseChange(course.course_id)}
//               />
//               {course.course_name}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>


//         <div>
//           <label className="asset-form-label">สภาพการครุภัณฑ์</label>
//           <select
//             className="asset-form-select"
//             value={value.status || ''} 
//             onChange={(e) => onChange('status', e.target.value)}
//           >
//             <option value="">-- กรุณาเลือก --</option> 
//             <option>ใช้งาน</option>
//             <option>ส่งซ่อม</option>
//             <option>ชำรุด</option>
//             <option>บริจาค/โอน</option>
//             <option>รับโอน</option>
//             <option>จำหน่าย</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssetForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/AssetForm.css";  

const AssetForm = ({ value = { curriculum: [] }, onChange }) => {
  const [department, setDepartment] = useState([]);
  const [curriculum, setCurriculum] = useState([]);
  const [loadingCurriculum, setLoadingCurriculum] = useState(false);

  // Fetch department data from the API using axios
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/department');
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
  }, []);

  // ฟังก์ชันจัดการการเลือกภาควิชา
  const handleDepartmentChange = async (departmentId) => {
    onChange('department_id', departmentId); // อัปเดตค่า department_id
    if (departmentId) {
      setLoadingCurriculum(true); // เริ่มโหลด
      try {
        const response = await axios.get(`http://localhost:5001/api/curriculum/${departmentId}`);
        if (Array.isArray(response.data)) {
          setCurriculum(response.data); // ดึงข้อมูลหลักสูตรของภาควิชานั้น
        } else {
          console.error("curriculum data is not an array:", response.data);
        }
      } catch (err) {
        console.error('Error fetching curriculum:', err);
      } finally {
        setLoadingCurriculum(false); // การโหลดเสร็จสมบูรณ์
      }
    } else {
      setCurriculum([]); // ถ้าไม่มีการเลือกภาควิชา ให้ล้างข้อมูลหลักสูตร
    }
  };

  // ฟังก์ชันจัดการการเลือกหลักสูตร
  const handleCurriculumChange = (curriculumId) => {
    // ตรวจสอบว่า value.curriculum เป็นอาเรย์หรือไม่ก่อน
    const updatedCurriculum = Array.isArray(value.curriculum) ? value.curriculum : [];
    const updatedList = updatedCurriculum.includes(curriculumId)
      ? updatedCurriculum.filter((id) => id !== curriculumId)  // เอาออกถ้าติ๊กซ้ำ
      : [...updatedCurriculum, curriculumId]; // เพิ่มใหม่

    onChange('curriculum', updatedList);
  };

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
          <label className="asset-form-label">ภาควิชา/หน่วยงาน</label>
          <select
            className="asset-form-select"
            value={value.department_id}
            onChange={(e) => handleDepartmentChange(e.target.value)}
          >
            <option value="">-- กรุณาเลือก --</option>
            {Array.isArray(department) &&
              department.map((dept) => (
                <option key={dept.department_id} value={dept.department_id}>
                  {dept.department_name}
                </option>
              ))}
          </select>

          {loadingCurriculum ? (
            <div>กำลังโหลดหลักสูตร...</div>
          ) : (
            curriculum.length > 0 && (
              <div>
                <label className="asset-form-label">เลือกหลักสูตร/งาน</label>
                {curriculum.map((curriculum) => (
                  <div key={curriculum.curriculum_id}>
                    <input
                      type="checkbox"
                      value={curriculum.curriculum_id}
                      checked={Array.isArray(value.curriculum) && value.curriculum.includes(curriculum.curriculum_id)}
                      onChange={() => handleCurriculumChange(curriculum.curriculum_id)}
                    />
                    {curriculum.curriculum_name}
                  </div>
                ))}
              </div>
            )
          )}
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
