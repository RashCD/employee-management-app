import React, { ReactNode } from 'react';
import Navbar from '@/app/components/Navbar';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default Layout
