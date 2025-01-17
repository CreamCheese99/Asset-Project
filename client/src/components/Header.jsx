
import React from "react";
import logo from '../image/logo.svg';

const Header = () => {
  return (
    <div style={{ backgroundColor: '#8bc34a' }} className="flex flex-col md:flex-row items-center gap-4 px-4 py-3 shadow-white-md ">
             <img src={logo} alt="logo" className="h-8 w-auto" />
             <div className="text-center md:text-left">
               <span className="font-prompt text-xl text-teal-800 font-bold block md-2">ระบบพัสดุ</span>
               <p className="font-prompt  text-teal-800 text-xs md:text-sm">คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี</p>
              
             </div>
    </div>
  );
};

export default Header;

