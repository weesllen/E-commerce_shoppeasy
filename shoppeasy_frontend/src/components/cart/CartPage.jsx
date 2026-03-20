import CartSumary from './CartSumary'
import CartItem from './CartItem'
import Spinner from '../ui/Spinner'
import useCartData from '../hooks/UseCartData'

const CartPage = ({setNumberCartItems}) => {

  const {cartItems,setCartItems, cartTotal, setCartTotal, loading, tax} = useCartData()

  if(loading){
    return < Spinner loading={loading} />
  }


  return (
    <div className='container my-4 py-3'>
      <h4 className='mb-4 fw-semibold'>Seu Carrinho</h4>
      <div className='row g-4 align-items-start'>
        <div className='col-12 col-lg-8'>
          <div style={{ maxHeight: '65vh', overflowY: 'auto', paddingRight: '4px' }}>
          {cartItems.length  > 0 ? (
            cartItems.map(item => <CartItem key= {item.id} item={item} 
              setCartTotal={setCartTotal} 
              cartItems={cartItems}
              setNumberCartItems={setNumberCartItems}
              setCartItems={setCartItems}
               />)
          ) : (
            <div className="alert alert-primary my-5" role='alert'>
              Seu carrinho está vazio.
            </div>
          )}
          </div>
        </div>

      <CartSumary cartTotal={cartTotal} tax={tax} />
        </div>
    </div>    
  )
}

export default CartPage
