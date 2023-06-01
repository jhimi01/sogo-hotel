import React from 'react';
import DateReactRange from '../component/DateRange/DateReactRange';
import Header from '../component/Room/Header';
import RoomInfo from '../component/Room/RoomInfo';
import RoomReservation from '../component/Room/RoomReservation';
import Calender from '../component/Room/Calender';


const RoomDetails = () => {
    return (
        <div className='max-w-screen-lg mx-auto'>
            <div className='flex flex-col gap-6'>
                {/* <img src="https://a0.muscache.com/im/pictures/4f70b681-a792-4530-8c52-f2a8d262942d.jpg" alt="" /> */}
                <Header></Header>
                <div className='md:flex items-center justify-between gap-6'>
             <div className="w-full md:w-1/2 mx-auto" >
             <RoomInfo></RoomInfo>
             </div>
             <div className="mx-auto flex flex-col justify-center items-center md:w-1/2 w-full order-first md:order-last" >
               <RoomReservation></RoomReservation>
               {/* calender */}
               <Calender></Calender>
               <hr />
               <button className='btn w-full'>Reserve</button>
               <hr />
            <div className='flex w-full justify-between items-center font-semibold text-lg p-4'>
               <h2>Total</h2>
               <h2>$ 300</h2>
            </div>
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