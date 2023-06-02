import React from 'react';
import DateReactRange from '../component/DateRange/DateReactRange';
import Header from '../component/Room/Header';
import RoomInfo from '../component/Room/RoomInfo';
import RoomReservation from '../component/Room/RoomReservation';
import Calender from '../component/Room/Calender';
import { useLoaderData, useParams } from 'react-router-dom';


const RoomDetails = () => {
    const roomData = useLoaderData()
    console.log(roomData)
    return (
        <div className='max-w-screen-lg mx-auto'>
            <div className='flex flex-col gap-6'>
                <Header roomData={roomData}></Header>
                <div className='md:flex items-center justify-between gap-6'>
             <div className="w-full md:w-1/2 mx-auto" >
             <RoomInfo roomData={roomData}></RoomInfo>
             </div>
             <div className="mx-auto flex flex-col justify-center items-center md:w-1/2 w-full order-first md:order-last" >
               <RoomReservation roomData={roomData}></RoomReservation>
               {/* calender
               <Calender></Calender> */}
               {/* <hr />
               <button className='btn w-full'>Reserve</button>
               <hr />
            <div className='flex w-full justify-between items-center font-semibold text-lg p-4'>
               <h2>Total</h2>
               <h2>$ 300</h2>
            </div> */}
             </div>
                </div>
            </div>

            <div>
                {/* <DateReactRange></DateReactRange> */}
            </div>
        </div>
    );
};

export default RoomDetails;