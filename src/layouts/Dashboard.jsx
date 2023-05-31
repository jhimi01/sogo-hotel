import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../component/Dashboard/SideBar';
import Guest from '../component/Dashboard/Guest';

const Dashboard = () => {
    return (
        <div className='relative min-h-screen md:flex'>
      <SideBar />
      {/* <Guest></Guest> */}
      <div className='flex-1  md:ml-64'>
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
    );
};

export default Dashboard;