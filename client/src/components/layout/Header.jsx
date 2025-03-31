// import { Link } from 'react-router-dom';
// import { UserCircle } from 'lucide-react';
// import logo from '../../image/logo.svg';

// const Header = () => {
//   return (
//     <header style={{ backgroundColor: '#8bc34a' }} className="text-white shadow-md">
//       {/* Top Header Section */}
//       <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4">
//         <div className="flex items-center space-x-4">
//           <img src={logo} alt="logo" className="h-10 w-auto" />
//           <div>
//             <span className=" text-xl font-bold block">ระบบพัสดุ</span>
//             <p className="text-sm">คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี</p>
//           </div>
//         </div>
//         <button className="flex items-center space-x-2 hover:text-gray-200">
//           <UserCircle size={24} />
//           <Link to="/login" className="hover:text-gray-300">โปรไฟล์</Link>
//         </button>
//       </div>
      
//       {/* Navigation Menu */}
//       <nav style={{ backgroundColor: '#aed581' }} className="rounded-b-md shadow-lg py-2">
//         <div className="container mx-auto flex justify-center space-x-6">
//           <Link to="/" className="hover:text-gray-300">หน้าหลัก</Link>
//           <Link to="/manage-assets" className="hover:text-gray-300">จัดการพัสดุ</Link>
//           <Link to="/asset-list" className="hover:text-gray-300">รายการพัสดุ</Link>
//           <Link to="/manage-personal-info" className="hover:text-gray-300">ข้อมูลทั่วไป</Link>
//           <Link to="/manage-permissions" className="hover:text-gray-300">จัดการสิทธิ์</Link>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;






import { useState } from "react";
import { Link } from "react-router-dom";
import { UserCircle, LogOut } from "lucide-react";
import logo from "../../image/logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); //  สร้าง state ควบคุมเมนู
  const user = JSON.parse(localStorage.getItem("user")); //  ดึงข้อมูลผู้ใช้จาก localStorage

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); //  สลับสถานะเมนู เปิด-ปิด
  };

  const logout = () => {
    localStorage.removeItem("user"); //  ลบข้อมูลผู้ใช้
    window.location.href = "/login"; //  รีเฟรชไปหน้า login
  };

  return (
    <header style={{ backgroundColor: "#8bc34a" }} className="text-white shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4">
        {/* โลโก้ */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="logo" className="h-10 w-auto" />
          <div>
            <span className=" text-xl font-bold block">ระบบพัสดุ</span>
            <p className="text-sm">คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี</p>
          </div>
        </div>

        {/* ปุ่มโปรไฟล์ */}
        <div className="relative">
          <button onClick={toggleMenu} className="flex items-center space-x-2 hover:text-gray-200">
            <UserCircle size={24} />
            {user && <span>{user.cn}</span>}
          </button>

          {/* เมนู Dropdown (แสดงเมื่อ isMenuOpen เป็น true) */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg p-2">
              {user && <p className="p-2 text-gray-700">{user.mail}</p>}
              <button onClick={logout} className="flex items-center text-red-500 hover:bg-gray-100 p-2 w-full">
                <LogOut size={18} className="mr-2" /> ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav style={{ backgroundColor: "#aed581" }} className="rounded-b-md shadow-lg py-2">
        <div className="container mx-auto flex justify-center space-x-6">
          <Link to="/" className="hover:text-gray-300">หน้าหลัก</Link>
          <Link to="/manage-assets" className="hover:text-gray-300">จัดการพัสดุ</Link>
          <Link to="/asset-list" className="hover:text-gray-300">รายการพัสดุ</Link>
          <Link to="/manage-personal-info" className="hover:text-gray-300">ข้อมูลทั่วไป</Link>
          <Link to="/manage-permissions" className="hover:text-gray-300">จัดการสิทธิ์</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
