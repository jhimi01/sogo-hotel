import React from 'react';

const Singleroom = ({room}) => {
  const { dateRange, image, location, price } = room;

  return (
    <div className='bg-base-300 relative my-8 cursor-pointer group'>
      <img className='w-[400px] h-[200px] group-hover:scale-105 transition' src={image} alt="" />
      <div className='flex justify-center'>
        <div className='w-5/6 h-[100px] bg-base-200 absolute z-20 -bottom-14 p-2 group-hover:drop-shadow-xl drop-shadow-lg'>
          <h3 className='font-bold'>{location}</h3>
          <p className='text-gray-600 text-sm font-semibold'>{dateRange}</p>
          <p className='text-gray-900 text-sm font-semibold'>${price} <span className='text-gray-600'>night</span></p>
        </div>
      </div>
    </div>
  );
};

export default Singleroom;
