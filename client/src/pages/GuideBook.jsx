import React from 'react';
import GuideBookProfessor from '../components/Guidebook-professor.jsx';
import GuideBookPageAdmin from '../components/Guidebook-admin.jsx';
import GuideBookPageDepartmentStaff from '../components/Guidebook-DepartmentStaff.jsx';
import GuideBookPageManager from '../components/Guidebook-manager.jsx';
import GuideBookTeacher from '../components/Guidebook-teacher.jsx';

function GuideBook() {
  const roleId = parseInt(localStorage.getItem('roleId'), 10); // ดึง roleId จาก localStorage แล้วแปลงเป็นตัวเลข

  return (
    <div style={{ backgroundColor: '#f1f8e9' }} className="min-h-screen font-sans">
      {/* แสดงเฉพาะตาม Role ที่ได้รับสิทธิ์ */}
      {roleId === 4  && <GuideBookProfessor />}
      {roleId === 5 && <GuideBookTeacher />}
      {roleId === 2 && <GuideBookPageAdmin />}
      {roleId === 3 && <GuideBookPageDepartmentStaff />}
      {roleId === 1 && <GuideBookPageManager />}
    </div>
  );
}

export default GuideBook;
