import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements, useElements, useStripe} from '@stripe/react-stripe-js';
import './CheackoutForm.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../providers/AuthProvider"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { updateStatus } from '../../api/booking';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const CheckoutForm = ({closeModal, modalHandler, bookingInfo}) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext)
    const [cardError, setCardError] = useState('')
    const [clientScreat, setClientScreat] = useState('')
    const [axiosSecure] = useAxiosSecure()
    const [processing, setProcessing] = useState(false)
    const navigate  = useNavigate()

    
    useEffect(()=>{
        // generate client screte and save in state
        if (bookingInfo?.price) {
            axiosSecure.post('/create-payment-intent', {price : bookingInfo?.price}).then(res => {
                // setClientScreat(res.data)
                console.log(res.data.clientScreat)
                setClientScreat(res.data.clientSecret)
            })
        }
    },[bookingInfo, axiosSecure])
  


    const handleSubmit = async (event) => {
      // Block native form submission.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
  
      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const card = elements.getElement(CardElement);
  
      if (card == null) {
        return;
      }
  
      // Use your card Element with other Stripe.js APIs
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        console.log('[error]', error);
        setCardError(error.message);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        setCardError(' ');
      }
         // consfirm the payment method
         const { paymentIntent, error: confirmError} = await 
    stripe
    .confirmCardPayment(clientScreat, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || 'unknown',
          email: user?.email || 'anonymous',
        },
      },
    })
    if (confirmError) {
        console.log('[error]', confirmError);
        setCardError(confirmError.message);
      } else {
        console.log('[paymentIntent]', paymentIntent);
        if (paymentIntent.status === 'succeeded') {
            // save payment info in db
            const paymentInfo = {
                ...bookingInfo, transectionId: paymentIntent.id,
                date: new Date(),
            }
          axiosSecure.post('/bookings', paymentInfo).then(data => {
            console.log(data)
            if (data.data.insertedId) {
                updateStatus(paymentInfo.roomId, true).then(data => {
                    console.log(data)
                    const text = `Booking Successfully! TransactionId: ${paymentIntent.id}`
                    toast.success(text)
                    setProcessing(true)
                    navigate('/dashboard/my-bookings')
                    closeModal()
                })
            }
          }).catch(err => {
            setProcessing(true)
            console.log(err.message)
          })
        
        }
      }
    };


 


  
    return (
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        {/* <button className='btn' type="submit">
          Pay
        </button> */}
        { cardError && <p className='text-red-500'>{cardError}</p>}
        <div className='flex mt-5 justify-around'>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                   disabled={!stripe || !clientScreat || processing}
                    type='submit'
                    className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'

                    // onClick={modalHandler}
                  >
                    Pay {bookingInfo.price}$
                  </button>
                </div>
      </form>
    );
  };

  export default CheckoutForm;