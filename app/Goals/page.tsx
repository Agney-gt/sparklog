import React from 'react';
import HeaderHome from '@/components/HeaderHome'; // Adjust the import path as necessary
import Footer from '@/components/Footer'; // Adjust the import path as necessary
import GrowthObjectives from '@/components/growth-objectives';
import BattleObjectives from '@/components/battle-objectives';

const GoalsPage = () => {
    return (
        <div>
            <HeaderHome />
            <GrowthObjectives/>
            <BattleObjectives/>
            <Footer /> {/* Include the Footer component here */}
        </div>
    );
};

export default GoalsPage; 