import React, { useEffect, useState } from 'react';
import Singleroom from './Singleroom';
import { RiseLoader } from 'react-spinners';

const Rooms = () => {

    const [rooms, setRooms] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(()=>{
        fetch('rooms.json')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setRooms(data)
            setLoader(false)
        })
    },[])

    if (loader) {
        return <div className='flex items-center justify-center h-[40vh]'>
            <RiseLoader color="#000"  size='40' speedMultiplier='1' />
        </div>
    }

    return (
        <div className='grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-5 mb-10'>
            {rooms.map((room, index) => <Singleroom room={room} key={index}></Singleroom>)}
        </div>
    );
};

export default Rooms;