import React from 'react';
import { categories } from './catagoris';
import CatagorBox from './CatagorBox';

const Catagories = () => {
    return (
        <div className='flex flex-row items-center overflow-x-auto gap-5 justify-between py-9'>
            {categories.map(category => <CatagorBox label={category.label} icon={category.icon}></CatagorBox>)}
        </div>
    );
};

export default Catagories;