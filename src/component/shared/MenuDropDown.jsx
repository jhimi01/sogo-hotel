import { AiOutlineMenu } from 'react-icons/ai'
// import Avatar from './Avatar'
import { useCallback, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../providers/AuthProvider'
import HostModal from '../Modal/HostModal'
import { becomeHost } from '../../api/auth'
import { toast } from 'react-hot-toast'

const MenuDropdown = () => {
  const navigate = useNavigate()
  const { user, logOut, role } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)
  const [modal, setModal] = useState(false)

  //   const toggleOpen = useCallback(() => {
  //     setIsOpen(value => !value)
  //   }, [])
  const modalHandler = email =>{
    becomeHost(email).then(data => {
        console.log(data)
        navigate('/dashboard/add-room')
        toast.success('You are host now, Post Rooms')
        closeModal()
    })
  }

  const closeModal = ()=>{
    setModal(false)
  }
  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        {/* Aircnc btn */}
        {/* <div onClick={()=>setModal(true)} className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'> */}
         {!role &&  <button disabled={!user} onClick={()=>setModal(true)} className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition'>AirCNC your home</button>}
        {/* </div> */}
      </div>
      <HostModal email={user?.email} modalHandler={modalHandler} isOpen={modal} closeModal={closeModal}></HostModal>
    </div>
  )
}

export default MenuDropdown