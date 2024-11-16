import React from 'react';
import Footer from '@/components/Footer'; // Adjust the import path as necessary
import HeaderHome from '@/components/HeaderHome'; // Adjust the import path as necessary

const AboutPage = () => {
    return (
        <div>
            <HeaderHome />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold">About Us</h1>
                <p className="mt-4">This is the about us page content.</p>
            </div>
            <Footer /> {/* Include the Footer component here */}
        </div>
    );
};

export default AboutPage; 