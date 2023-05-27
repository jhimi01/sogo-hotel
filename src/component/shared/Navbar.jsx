import React, { useContext } from 'react';
import { FaSistrix } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Navbar = () => {

  const { user, logOut } = useContext(AuthContext)
  const navigate = useNavigate()

  const handlelogout =()=>{
    logOut()
    .then(()=>{})
    .catch(error => console.log(error.message))
  }

    return (
        <div className="navbar bg-base-200 drop-shadow-lg mt-5">
        <div className="navbar-start">
        <div className=" flex items-center">
        <img src={logo} alt="logo" width='40px' />
          <Link to='/'><a className="btn btn-ghost normal-case text-lg hidden md:block pt-2">Sogo Hotel</a></Link>
        </div>
        </div>
        <div className="navbar-center">
        <div className='border-[1px] w-full md:w-auto py-2 rounded-0 shadow-sm hover:shadow-md transition cursor-pointer'>
      <div className='flex flex-row items-center justify-between'>
        <div className='text-sm font-semibold px-6'>Anywhere</div>
        <div className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
          Any Week
        </div>
        <div className='text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3'>
          <div className='hidden sm:block'>Add Guests</div>
          <div className='p-2 bg-black rounded-full text-white'>
            <FaSistrix size={18} />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="navbar-end">
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </label>
            <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">View cart</button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
              {user?.photoURL ? <img src={user?.photoURL} /> : <img src='https://cdn-icons-png.flaticon.com/256/149/149071.png'/>}
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <p className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </p>
              </li>
              <li><p>Settings</p></li>
              {user? <button onClick={handlelogout} className='btn'>LogOut</button> :  <Link to='/login'><li><p>Login</p></li></Link>}
              
            </ul>
          </div>
        </div>
        </div>
      </div>
    );
};

export default Navbar;