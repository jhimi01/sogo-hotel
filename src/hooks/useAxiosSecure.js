import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = useContext(AuthContext)
    useEffect(()=>{

        // 1. intercept request
        axiosSecure.interceptors.request.use(config=>{
            const token = `Bearer ${localStorage.getItem('access_token')}`
            if (token) {
                config.headers.Authorization = token    
            }
            return config
        })

        // 2. intercept response
        axiosSecure.interceptors.response.use(response => response, async error => {
            if (error.response && error.response.status === 403 || error.response.status === 401) {
                await logOut()
                navigate('/login')
            }
            return Promise.reject(error)
        })
    },[logOut, navigate, axiosSecure])
    
    
    
    
    
    
    
    return [axiosSecure]

}


export default useAxiosSecure;