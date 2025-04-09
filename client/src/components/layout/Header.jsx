import { Link, useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import logo from '../../image/logo.svg';
import { useState } from 'react';

const Header = () => {
  // ดึง roleId และ user_name จาก localStorage
  const roleId = localStorage.getItem('roleId');  // ตรวจสอบว่า key ชื่อถูกต้อง
  const userName = localStorage.getItem('user_name'); // ดึงชื่อผู้ใช้
  const [isMenuOpen, setMenuOpen] = useState(false); // สถานะเพื่อเปิด/ปิดเมนู dropdown
  const navigate = useNavigate(); // ใช้ navigate hook เพื่อเปลี่ยนเส้นทางหลังออกจากระบบ

  const handleLogout = () => {
    // ลบข้อมูลใน localStorage และเปลี่ยนเส้นทางไปที่หน้า login
    localStorage.removeItem('roleId');
    localStorage.removeItem('user_name');
    localStorage.removeItem('token');
    navigate('/'); // เปลี่ยนเส้นทางไปยังหน้า login
  };

  return (
    <header style={{ backgroundColor: '#8bc34a' }} className="text-green-900 shadow-md">
      {/* ส่วนของ Header ด้านบน */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="logo" className="h-10 w-auto" />
          <div>
            <span className="text-xl font-bold block">ระบบจัดการครุภัณฑ์</span>
            <p className="text-sm">คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี</p>
          </div>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setMenuOpen(!isMenuOpen)} 
            className="flex items-center space-x-2 hover:text-gray-200"
          >
            <UserCircle size={24} />
            <span>{userName ? userName : 'โปรไฟล์'}</span>
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
              >
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </div>
      

      {/* เมนูนำทาง */}
      <nav style={{ backgroundColor: '#aed581' }} className="rounded-b-md shadow-lg py-4">
        <div className="container mx-auto flex justify-center space-x-8">
          {(roleId === '1'  || roleId === '3' || roleId === '4'|| roleId === '5') && (
            <Link to="/home" className="hover:text-gray-200 transition duration-300">หน้าหลัก</Link>
          )}

          {/* เมนูที่เข้าถึงได้ตามบทบาท */}
          {(roleId  === '3' || roleId === '4'|| roleId === '5') && (
            <>
              <Link to="/manage-assets" className="hover:text-gray-200 transition duration-300">จัดการพัสดุ</Link>
              {/* <Link to="/asset-list" className="hover:text-gray-200 transition duration-300">รายการพัสดุ</Link> */}
            </>
          )}

          {(roleId === '2' || roleId === '3') && ( // สำหรับ Admin
            <>
              <Link to="/manage-permissions" className="hover:text-gray-200 transition duration-300">จัดการสิทธิ์</Link>
              <Link to="/manage-personal-info" className="hover:text-gray-200 transition duration-300">ข้อมูลทั่วไป</Link>
            </>
          )}

          {(roleId === '1' || roleId === '2' || roleId === '3' || roleId === '4' || roleId === '5') && (
            <Link to="/guidebook" className="hover:text-gray-200 transition duration-300">คู่มือการใช้งานระบบ</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

