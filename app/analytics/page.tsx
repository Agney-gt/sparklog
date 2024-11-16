import React from 'react';
import Footer from '@/components/Footer';
import HeaderHome from '@/components/HeaderHome';

const AnalyticsPage = () => {
    return (
        <div>
            <HeaderHome />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold">Analytics</h1>
                <p className="mt-4">This is the analytics page content.</p>
            </div>
            <Footer />
        </div>
    );
};

export default AnalyticsPage; 