import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Main from "./layouts/Main.jsx";
import Home from "./page/HomePage/Home.jsx";
import Login from "./page/Login.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import Register from "./page/Register.jsx";
import RoomDetails from "./page/RoomDetails.jsx";
import Privateroute from "./routes/Privateroute.jsx";
import Dashboard from "./layouts/Dashboard.jsx";
import AddRoom from "./page/Dashboard/AddRoom.jsx";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { getRooms } from "./api/rooms.js";
import MyBookings from "./page/Dashboard/MyBookings.jsx";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/room/:id",
        element: (
          <Privateroute>
            <RoomDetails></RoomDetails>
          </Privateroute>
        ),
        loader: ({params})=>getRooms(params.id)
      },
    ],
  },
  ,
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    element: <Privateroute> <Dashboard></Dashboard></Privateroute>,
    children: [
      {
        path: "/dashboard/addroom",
        element: <AddRoom></AddRoom>,
      },
      {
        path: "/dashboard/my-bookings",
        element: <MyBookings></MyBookings>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
