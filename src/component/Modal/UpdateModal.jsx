import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'
import UpdateRoomForm from '../Forms/UpdateRoomForm'
// import { useNavigate } from 'react-router-dom'
// import { AuthContext } from '../../providers/AuthProvider'
import { toast } from 'react-hot-toast'
import { updateroom } from '../../api/rooms'
import { imgUpload } from '../../api/utils'

const UpdateModal = ({ isOpen, setIsEditModal, refetch, room, id }) => {
    const [loading, setLoading] = useState(false)
    const [dates, setDates] = useState({
      startDate: new Date(room.from),
      endDate: new Date(room.to),
      key: 'selection',
    })
    const [roomData, setRoomData] = useState(room)
  
    const handleImageUpdate = image => {
      setLoading(true)
      imgUpload(image)
        .then(res => {
          setRoomData({ ...roomData, image: res.data.display_url })
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
        })
    }
  
    const handleSubmit = event => {
      event.preventDefault()
      console.log(roomData)
      const updatedData = Object.assign({}, { ...roomData })
      delete updatedData._id
      setLoading(true)
      updateroom(updatedData, id)
        .then(data => {
          console.log(data)
          toast.success('Home info updated')
          setLoading(false)
          refetch()
          setIsEditModal(false)
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
        })
    }
    const handleDates = ranges => {
      setDates(ranges.selection)
      setRoomData({
        ...roomData,
        to: ranges.selection.endDate,
        from: ranges.selection.startDate,
      })
    }
    console.log(roomData)

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={()=>setIsEditModal(false)}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  Update Room Info
                </Dialog.Title>

                <UpdateRoomForm handleSubmit={handleSubmit}
                    roomData={roomData}
                    setRoomData={setRoomData}
                    handleImageUpdate={handleImageUpdate}
                    loading={loading}
                    dates={dates}
                    handleDates={handleDates}></UpdateRoomForm>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default UpdateModal