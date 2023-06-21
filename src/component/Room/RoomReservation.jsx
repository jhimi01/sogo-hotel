import React, { useContext, useState } from 'react';
import Calender from './Calender';
import { AuthContext } from '../../providers/AuthProvider';
import BookingModal from '../Modal/BookingModal';
import { formatDistance } from 'date-fns';
import { bookingRoom, updateStatus } from '../../api/booking';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RoomReservation = ({roomData}) => {
  
  console.log("roomData.to:", roomData.to);
  console.log("roomData.from:", roomData.from);

const totalPrice = parseFloat(formatDistance(new Date(roomData.to) , new Date(roomData.from)).split(' ')[0]) * roomData.price;
    const {user, role} = useContext(AuthContext)
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const closeModal = ()=>{
      setIsOpen(false)
    }


    const [value, setValue] = useState( {
        startDate: new Date(roomData?.to),
        endDate: new Date(roomData?.from),
        key: 'selection'
      })


    // booking state
    const [bookingInfo, setBookingInfo] = useState({
        guest: {name: user.displayName,
           email: user.email,
           image: user.photoUrl
          },
        host: roomData.host.email,
        location: roomData.location,
        price: totalPrice,
        to: value.endDate,
        from: value.startDate,
        title: roomData.title,
        roomId: roomData._id,
        image: roomData.image
    })

    const handleSelect=(ranges)=>{
      setValue({...value})
    }

    // const modalHandler =()=>{
    //   bookingRoom(bookingInfo)
    //   .then(data => {
    //     updateStatus(roomData._id, true)
    //     .then(data => {
    //       toast.success('Booking Successfull!')
    //       navigate('/dashboard/add-room')
    //     closeModal()
    //     console.log(data)
    //     })
    //   }).catch(err => {
    //     closeModal()
    //     console.log(err)
    //   });
    //   // console.log(bookingInfo)
    // }

    return (
        <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden w-full'>
            <div className="flex flex-col  items-center p-4">
                <div className="text-2xl font-semibold">&{roomData.price} night</div>
                 {/* calender */}
               <Calender value={value} handleSelect={handleSelect}></Calender>
               <hr />
               <button onClick={()=> setIsOpen(true)} disabled={roomData.host.name === user.name || roomData.booked} className='btn w-full'>Reserve</button>
               <hr />
            <div className='flex w-full justify-between items-center font-semibold text-lg p-4'>
               <h2>Total</h2>
               <h2>$ {totalPrice}</h2>
            </div>
            </div>
            <BookingModal closeModal={closeModal} 
            // modalHandler={modalHandler}
             isOpen={isOpen} bookingInfo={bookingInfo} ></BookingModal>
        </div>
    );
};

export default RoomReservation;