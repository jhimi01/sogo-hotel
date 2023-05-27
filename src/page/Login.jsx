import { Link } from 'react-router-dom'

import { FcGoogle } from 'react-icons/fc'
import { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { Toaster, toast } from 'react-hot-toast'
import { ImSpinner3 } from "react-icons/im";

const Login = () => {

    const { signIn, signInWithGoogle,  loading, setLoading, } = useContext(AuthContext)

    const handlegoogle =()=>{
        signInWithGoogle()
        .then(result => {
            console.log(result.user)
        })
        .catch(err => {
            console.log(err.message)
            toast.error(err.message)
            setLoading(false)
            
        });
    }


    const handlelogin =(e)=>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        //   console.log(email, password)

          signIn(email, password)
          .then(result =>{
            console.log(result.user)
          })
          .catch(error => {
            console.log(error.message)
            toast.error(err.message)
            setLoading(false)
          })

    }





  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
        </div>
        <form
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
          onSubmit={handlelogin}
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
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

          <div>
            <button
              type='submit'
              className='btn w-full hover:bg-gray-950'
            >
            {loading ? <ImSpinner3 className='animate-spin text-xl'/> :  'Continue'}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button className='text-xs hover:underline hover:text-gray-800 text-gray-400'>
            Forgot password?
          </button>
        </div>
       
          <div className="divider">OR</div>
          
        <div onClick={handlegoogle} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Don't have an account yet?{' '}
          <Link
            to='/signup'
            className='hover:underline hover:text-gray-500 text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  )
}

export default Login