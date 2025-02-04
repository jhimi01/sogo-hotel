import { Link, useLocation, useNavigate } from 'react-router-dom'

import { FcGoogle } from 'react-icons/fc'
import { useContext, useRef } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { ImSpinner3 } from 'react-icons/im'
import { toast } from 'react-hot-toast'
import { saveUser } from '../api/auth'

const Register = () => {

    const emailRef = useRef()
    const { createUser, signInWithGoogle,  loading, setLoading, updateUserProfile} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';


    const handleSubmit =(e)=>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const image = form.image.files[0];
        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`

        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
        .then(data => {
            const imgurl = data.data.display_url
            createUser(email, password)
            .then((result) => {
                updateUserProfile(name, imgurl)
                .then(() => {
                    navigate(from, {replace: true})
                    toast.success('Successfully registerd!')
                })
                .catch(err => {
                    console.log(err.message)
                    toast.error(err.message)
                    setLoading(false)
                    
                });
            })
            .catch(err => {
                toast.error(err.message)
                setLoading(false)
                
            });

        }).catch(err => {
            console.log(err.message)
            toast.error(err.message)
            setLoading(false)
            
        });

      
        
        console.log(formData)
        console.log(url)

    }


    const handlegoogle =()=>{
        signInWithGoogle()
        .then(result => {
            console.log(result.user)
            saveUser(result.user)
            toast.success('Successfully logged in!')
            navigate(from, {replace: true})
        })
        .catch(err => {
            console.log(err.message)
            toast.error(err.message)
            setLoading(false)
            
        });
    }

  return (
    <div className='flex justify-center items-center min-h-screen mt-2'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to Sogo Hotel</p>
        </div>
        <form
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
          onSubmit={handleSubmit}
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-gray-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
            <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
              ref={emailRef}
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-gray-800 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-gray-800 bg-gray-200 text-gray-900'
              />
            </div>
          </div>
          </div>

          <div>
          <button
              type='submit'
              className='btn w-full hover:bg-gray-950'
            >
            {loading ? <ImSpinner3 className='animate-spin text-xl'/> :  'Continue'}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div onClick={handlegoogle} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-gray-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Register

