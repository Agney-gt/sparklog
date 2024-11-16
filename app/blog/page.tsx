import React from 'react';
import HeaderHome from '@/components/HeaderHome'; // Adjust the import path as necessary
import Footer from '@/components/Footer'; // Adjust the import path as necessary

const BlogPage = () => {
    return (
        <div>
            <HeaderHome />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold">Blog</h1>
                <p className="mt-4">This is the blog page content.</p>
            </div>
            <Footer /> {/* Include the Footer component here */}
        </div>
    );
};

export default BlogPage; 