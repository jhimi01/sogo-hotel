import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

const EmptyState = ({message, address, label}) => {
    return (
        <div className='flex items-center justify-center flex-col h-screen gap-3'>
            <h2 className='text-2xl'>{message}</h2>
            <Link className='btn' to={address}>{label} <FiArrowUpRight className='text-2xl ml-1'/></Link>
        </div>
    );
};

export default EmptyState;