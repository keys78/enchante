import React, { ReactNode } from 'react';
import Footer from './shared/Footer';
import Navbar from './shared/Navbar';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;
