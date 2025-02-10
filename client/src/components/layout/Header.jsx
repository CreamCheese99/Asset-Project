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
            <span className="font-prompt text-xl font-bold block">ระบบพัสดุ</span>
            <p className="text-sm">คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 hover:text-gray-200">
          <UserCircle size={24} />
          <span>โปรไฟล์</span>
        </button>
      </div>
      
      {/* Navigation Menu */}
      <nav style={{ backgroundColor: '#aed581' }} className="rounded-b-md shadow-lg py-2">
        <div className="container mx-auto flex justify-center space-x-6">
          <Link to="/" className="hover:text-gray-300">หน้าหลัก</Link>
          <Link to="/manage-assets" className="hover:text-gray-300">จัดการพัสดุ</Link>
          <Link to="/manage-permissions" className="hover:text-gray-300">จัดการสิทธิ์</Link>
          <Link to="/asset-list" className="hover:text-gray-300">รายการพัสดุ</Link>
          <Link to="/" className="hover:text-gray-300">ข้อมูลทั่วไป</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;