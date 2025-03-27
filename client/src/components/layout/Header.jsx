import { Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import logo from '../../image/logo.svg';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#8bc34a' }} className="text-white shadow-md">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="logo" className="h-10 w-auto" />
          <div>
            <span className=" text-xl font-bold block">ระบบพัสดุ</span>
            <p className="text-sm">คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 hover:text-gray-200">
          <UserCircle size={24} />
          <Link to="/login" className="hover:text-gray-300">โปรไฟล์</Link>
        </button>
      </div>
      
      {/* Navigation Menu */}
      <nav style={{ backgroundColor: '#aed581' }} className="rounded-b-md shadow-lg py-4">
        <div className="container mx-auto flex justify-center space-x-8">
          <Link to="/" className="hover:text-gray-700 transition duration-300">หน้าหลัก</Link>
          <Link to="/manage-assets" className="hover:text-gray-700 transition duration-300">จัดการพัสดุ</Link>
          <Link to="/asset-list" className="hover:text-gray-700 transition duration-300">รายการพัสดุ</Link>
          <Link to="/manage-personal-info" className="hover:text-gray-700 transition duration-300">ข้อมูลทั่วไป</Link>
          <Link to="/manage-permissions" className="hover:text-gray-700 transition duration-300">จัดการสิทธิ์</Link>
          <Link to="/guidebook"className=" hover:text-gray-700 transition duration-300 " >คู่มือการใช้งานระบบ</Link>
          
          {/* <div className="container mx-auto flex justify-end space-x-6">
            <Link to="/guidebook"className="hover:text-gray-300" >คู่มือการใช้งานระบบ</Link>

          </div> */}
        </div>
       
      </nav>
    </header>
  );
};

export default Header;