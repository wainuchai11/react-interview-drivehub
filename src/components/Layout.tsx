// src/components/Layout.tsx
import React from 'react';
import Navbar from './Navbar';
import Content from './Content';
import Footer from './Footer';


function Layout() {
    return (
        <div>
            <Navbar />
            <Content />
            <Footer />
        </div>
    );
}

export default Layout;
