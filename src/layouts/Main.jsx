import React from 'react';
import Navbar from '../component/shared/Navbar';

const Main = () => {
    return (

       <>
         <div className='w-full md:w-5/6 mx-auto'>
        <Navbar></Navbar>
        <button className='btn btn-active'>button</button>
        </div>
       </>
    );
};

export default Main;