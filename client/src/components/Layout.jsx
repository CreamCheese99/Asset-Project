import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
//import Footer from './Footer';
const Layout = ({ children }) => {
    return (
        <div classname ="layout">
            <Header />
            <Sidebar />
            <main>{children}</main>
        </div>
    );
};
export default Layout;