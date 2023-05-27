import React from 'react';

const CatagorBox = ({label, icon: Icon}) => {
    return (
        <div className='flex flex-col gap-2 items-center justify-center hover:text-gray-600 text-gray-800 cursor-pointer'>
            <Icon size={26} />
            <div className='font-semibold'>{label}</div>
        </div>
    );
};

export default CatagorBox;