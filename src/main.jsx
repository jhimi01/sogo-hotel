import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Main from './layouts/Main.jsx';
import Home from './page/HomePage/Home.jsx';
import Login from './page/Login.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import Register from './page/Register.jsx';
import RoomDetails from './page/RoomDetails.jsx';
import Privateroute from './routes/Privateroute.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/room/:id',
        element: <Privateroute><RoomDetails></RoomDetails></Privateroute>
      },
      ,{
        path: '/login',
        element: <Login></Login>
      },{
        path:'/signup',
        element: <Register></Register>
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProvider>
   <RouterProvider router={router} />
   </AuthProvider>
  </React.StrictMode>,
)
