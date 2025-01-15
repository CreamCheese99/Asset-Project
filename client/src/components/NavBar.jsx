import React from 'react'
import NavBarLink from './NavBarLink'

function NavBar()  {
  return (

    <nav style={{ backgroundColor: '#aed581' }} className="rounded-b-md shadow-lg py-2 ">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="flex h-17 items-center justify-between">
             <div className="flex items-center">
               <div className="shrink-0">
                 {/* <img className="h-8 w-auto" src={logo} alt="logo"  /> */}
                 {/* <h1 className="font-prompt text-xl text-teal-800 font-bold">SIET - ระบบพัสดุ </h1> */}
               </div>

               <div className="hidden md:block">                
                  <div className="font-prompt ml-10 flex items-baseline space-x-4 list-none">
                    <NavBarLink name="หน้าหลัก" to="/dashboard" />
                    <NavBarLink name="จัดการพัสดุ" to="/manage-asset" />
                    <NavBarLink name="จัดการสิทธิ์" to="/manage-role" />
                    <NavBarLink name="รายการพัสดุ" to="/show-asset" />
                  </div>
                </div>


             </div>
             <div className="hidden md:block">
               <div className="ml-4 flex items-center md:ml-6">
                 <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                   <span className="absolute -inset-1.5"></span>
                   <span className="sr-only">View notifications</span>
                   <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                   </svg>
                 </button>
                 <div className="relative ml-3">
                   <div>
                     <button type="button" className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                       <span className="absolute -inset-1.5"></span>
                       <span className="sr-only">Open user menu</span>
                       <img className="size-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                     </button>
                   </div>

                   <div className="list-none absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                     <NavBarLink name="ออกจากระบบ" to="/login"/>
                   </div>
                 </div>
               </div>
             </div>
             <div className="-mr-2 flex md:hidden">
               <button type="button" className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false">
                 <span className="absolute -inset-0.5"></span>
                 <span className="sr-only">Open main menu</span>
                 <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                 </svg>
                 <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                 </svg>
               </button>
             </div>
           </div>
         </div>
       </nav>
  )
}

export default NavBar