import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { ImSpinner3 } from 'react-icons/im';
import { Navigate, useLocation } from 'react-router-dom';

const Privateroute = ({children}) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation()

    if (loading) {
      return  <ImSpinner3 className='animate-spin text-5xl mt-10 text-center'/>
    }
    if ( user ) { 
        console.log(user)
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />
};

export default Privateroute;