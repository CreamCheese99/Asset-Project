import { Link } from 'react-router-dom'
import { UserCircle } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-green-500 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              ระบบพัสดุ
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-green-200">หน้าหลัก</Link>
            <Link to="/manage-assets" className="hover:text-green-200">จัดการพัสดุ</Link>
            <Link to="/manage-permissions" className="hover:text-green-200">จัดการสิทธิ์</Link>
            <Link to="/asset-list" className="hover:text-green-200">รายการพัสดุ</Link>
          </nav>

          <div className="flex items-center">
            <button className="flex items-center space-x-2 hover:text-green-200">
              <UserCircle size={24} />
              <span>โปรไฟล์</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header