import React from 'react';
import Navbar from '../component/shared/Navbar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (

       <>
         <div className='w-full md:w-[90%] mx-auto'>
        <Navbar></Navbar>
        <Outlet></Outlet>
        </div>

       </>
    );
};

export default Main;