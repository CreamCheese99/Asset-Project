
import React from "react";
import logo from '../image/logo.svg';

import { Link } from 'react-router-dom' ;//add new

const Header = () => {
  return (
    // <div style={{ backgroundColor: '#8bc34a' }} className="text-white px-4 py-3 rounded-md">
    //   <div className="flex flex-col md:flex-row items-center gap-4">
    //     <img className="h-6 w-auto " src={logo} alt="logo"  />
    //   </div>
    //   <h1 className="text-xl font-bold">SIET - ระบบพัสดุ </h1>
    //   {/* <img className="h-6 w-auto " src={logo} alt="logo"  /> */}
    //   {/* <h1 className="font-prompt text-xl text-teal-800 font-bold">ระบบพัสดุ</h1> */}
    //   <h1 className="text-sm">คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี</h1>
    // </div>
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



// import React from 'react';
// import logo from '../image/logo.svg';

// function Header() {
//   return (

    
// //       <header className="bg-white shadow">
// //         <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
// //           <h1 className="font-prompt text-3xl font-bold tracking-tight text-gray-900">ข้อมูลรายการพัสดุ</h1>
// //         </div>
// //       </header>

//     <div className="font-prompt bg-gray-100 p-4 flex flex-col md:flex-row md:items-center justify-between">
//       {/* Logo and Title Section */}
//       <div className="flex flex-col md:flex-row items-center gap-4 ">
//         <img src={logo} alt="logo" className="h-12 w-auto" />
//         <div className="text-center md:text-left">
//           <span className="text-pink-600 text-lg md:text-xl font-bold block">ระบบจัดการครุภัณฑ์</span>
//           <p className="text-gray-600 text-xs md:text-sm">คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี</p>
//           <p className="text-gray-600 text-xs md:text-sm">สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</p>
//         </div>
//       </div>

//       {/* User Info Section */}
//       <div className="flex items-center gap-4 mt-4 md:mt-0">
//         <span className="text-pink-600 text-sm md:text-base font-medium">Thanchira</span>
//         <svg xmlns="http://www.w3.org/2000/svg" 
//              fill="none" 
//              viewBox="0 0 24 24" 
//              strokeWidth={1.5} 
//              stroke="currentColor" 
//              className="w-6 h-6 text-pink-600"> 
//           <path strokeLinecap="round" strokeLinejoin="round" 
//                 d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
//         </svg>
//       </div>
//     </div>
//   );
// }

// export default Header;

// import React from 'react'
// import logo from '../image/logo.svg';

// import TableRow from './TableRow';


// export default function Header() {
//   return (
//     <div className="h-screen bg-gray-100 ">
//       <nav className="bg-gray-800">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="flex h-16 items-center justify-between">
//             <div className="flex items-center">
//               <div className="shrink-0">
//                 <img className="h-8 w-auto" src={logo} alt="logo"  />
//               </div>
//               <div className="hidden md:block">
//                 <div className="font-prompt ml-10 flex items-baseline space-x-4">
//                   <a href="#" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Dashboard</a>
//                   <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">จัดการพัสดุ</a>
//                   <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">จัดการสิทธิ์</a>
//                   <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">ดูข้อมูลพัสดุ</a>
//                   <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">รายงาน</a>
//                 </div>
//               </div>
//             </div>
//             <div className="hidden md:block">
//               <div className="ml-4 flex items-center md:ml-6">
//                 <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                   <span className="absolute -inset-1.5"></span>
//                   <span className="sr-only">View notifications</span>
//                   <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
//                   </svg>
//                 </button>
//                 <div className="relative ml-3">
//                   <div>
//                     <button type="button" className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
//                       <span className="absolute -inset-1.5"></span>
//                       <span className="sr-only">Open user menu</span>
//                       <img className="size-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
//                     </button>
//                   </div>

//                   <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
//                     <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a>
//                     <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</a>
//                     <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="-mr-2 flex md:hidden">
//               <button type="button" className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false">
//                 <span className="absolute -inset-0.5"></span>
//                 <span className="sr-only">Open main menu</span>
//                 <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//                 </svg>
//                 <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <header className="bg-white shadow">
//         <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//           <h1 className="font-prompt text-3xl font-bold tracking-tight text-gray-900">ข้อมูลรายการพัสดุ</h1>
//         </div>
//       </header>

  
//     </div>
//   )
// }


