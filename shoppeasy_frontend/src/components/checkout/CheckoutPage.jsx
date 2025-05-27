import useCartData from '../hooks/UseCartData'
import OrderSummary from './OrderSummary'
import PaymentSection from './PaymentSection'

const CheckoutPage = () => {

  const {cartItems,setCartItems, cartTotal, setCartTotal, loading, tax} = useCartData()

  return (
    <div className='container my-3'>

        <div className='row'>
            <OrderSummary cartItems={cartItems} tax={tax} cartTotal={cartTotal} />
            <PaymentSection />
        </div>
      
    </div>
  )
}

export default CheckoutPage
