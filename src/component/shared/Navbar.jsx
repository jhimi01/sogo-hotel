import React, { useContext } from 'react';
import { FaSistrix } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import MenuDropdown from './MenuDropDown';

const Navbar = () => {

  const { user, logOut, role } = useContext(AuthContext)
  const navigate = useNavigate()
  console.log(role)

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
          <Link to='/'><a className="btn btn-ghost normal-case text-lg hidden md:block pt-2">airbnb</a></Link>
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
        <div className="md:flex items-center">
        <MenuDropdown></MenuDropdown>
          
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
              <Link to='/' className='md:hidden text-xl font-semibold'><li><p>Home</p></li></Link>
             {user &&  <Link to='/dashboard'  className='text-xl font-semibold'><li><p>Dashboard</p></li></Link>}
              {user? <button onClick={handlelogout} className='btn'>LogOut</button> :  <Link to='/login'><li><p>Login</p></li></Link>}
              
            </ul>
          </div>
        </div>
        </div>
      </div>
    );
};

export default Navbar;