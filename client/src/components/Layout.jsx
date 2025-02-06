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