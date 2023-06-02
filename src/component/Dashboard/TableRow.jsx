import { format } from 'date-fns'
import DeleteModal from '../Modal/DeleteModal'
import { useState } from 'react'
import { deleteBooking, updateStatus } from '../../api/booking'
import { toast } from 'react-hot-toast'

const TableRow = ({ booking, fetchBookings }) => {
    let [isOpen, setIsOpen] = useState(false)
    function closeModal() {
        setIsOpen(false)
    }
    const modalHandler = (id) => {
        deleteBooking(id)
          .then(data => {
            updateStatus(booking.roomId, false)
              .then(data => {
                console.log(data)
                toast.success('booking cancelled')
                fetchBookings() // Changed from fetchBookings to fetchBooking
              })
          })
        closeModal()
      }
      
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={booking?.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
          <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>{booking?.title}</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{booking?.location}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>${booking?.price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {format(new Date(booking?.from), 'P')}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {format(new Date(booking?.to), 'P')}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span onClick={() => setIsOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Cancel</span>
        </span>
      </td>
      <DeleteModal modalHandler={modalHandler} closeModal={closeModal} isOpen={isOpen} id={booking._id}></DeleteModal>
    </tr>
  )
}

export default TableRow
