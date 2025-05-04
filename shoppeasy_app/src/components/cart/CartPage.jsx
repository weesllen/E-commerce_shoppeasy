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
    <div className='container my-3 py-3'>
      <h5 className='mb-4'
      >Carrinho</h5>
      <div className='row'>
        <div className='col-md-8'style={{ height: '60vh',overflow:'auto'}}>
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

      <CartSumary cartTotal={cartTotal} tax={tax} />
        </div>
    </div>    
  )
}

export default CartPage
