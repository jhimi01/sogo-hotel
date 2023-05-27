import React from 'react';
import Navbar from '../component/shared/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../component/shared/Footer';

const Main = () => {
    return (

       <>
         <div className='w-full md:w-[90%] mx-auto'>
        <Navbar></Navbar>
        <div>
        <Outlet></Outlet>
        </div>
       {/* <Footer></Footer> */}
        </div>

    

       </>
    );
};

export default Main;