// import React from 'react';
// import Header from './Header'; // ตรวจสอบว่า Header มีอยู่จริง
// import NavBar from './NavBar'; // ตรวจสอบว่า NavBar มีอยู่จริง

// const Layout = ({ children }) => {
//   return (
//     <div style={{ backgroundColor: '#f1f8e9' }} className="min-h-screen font-sans">
//       <Header />
//       <NavBar />
//       <main>{children}</main>
//     </div>
//   );
// };

// export default Layout;


import { Outlet } from 'react-router-dom'; // add new
import React from 'react';
//import Sidebar from './Sidebar';
import Header from './Header';
//import Footer from './Footer';
const Layout = ({ children }) => {
    return (
        <div classname ="layout">
            <Header />
         
            <main>{children}</main>
        </div>
    );
};

export default Layout;

