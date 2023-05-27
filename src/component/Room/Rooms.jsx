import React, { useEffect, useState } from 'react';
import Singleroom from './Singleroom';
import { RiseLoader } from 'react-spinners';
import { useSearchParams } from 'react-router-dom';

const Rooms = () => {

    const [ params, setParams] = useSearchParams();
    const category = params.get('category');
    console.log(category)

    const [rooms, setRooms] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(()=>{
        fetch('rooms.json')
        .then(res => res.json())
        .then(data => {
            if (category) {
                const filtered = data.filter(room => room.category === category)
                setRooms(filtered)
            }else{
                setRooms(data)
            }
            console.log(data)
            setLoader(false)
        })
    },[category])

    if (loader) {
        return <div className='flex items-center justify-center h-[40vh]'>
            <RiseLoader color="#000"  size='40' speedMultiplier='1' />
        </div>
    }

    return (
      <>
       {rooms.length === 0 && <p className='text-5xl font-bold text-gray-400 text-center my-9'>Hotels not found</p>}
          <div className='grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-5 mb-10'>
            {rooms.map((room, index) => <Singleroom room={room} key={index}></Singleroom>)}
        </div>
      </>
    );
};

export default Rooms;