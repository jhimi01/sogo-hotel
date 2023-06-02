import React from 'react';
import Calender from './Calender';

const RoomReservation = () => {
    return (
        <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden w-full'>
            <div className="flex flex-col  items-center p-4">
                <div className="text-2xl font-semibold">&200 night</div>
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
    );
};

export default RoomReservation;