import React, { ReactNode } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
