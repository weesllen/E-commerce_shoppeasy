import React, { useEffect, useState } from 'react'
import CartSumary from './CartSumary'
import CartItem from './CartItem'
import api from '../../api'
import Spinner from '../ui/Spinner'

const CartPage = ({setNumberCartItems}) => {

  const cart_code = localStorage.getItem('cart_code')
  const [cartItems, setCartItems] = useState([])
  const [cartTotal, setCartTotal] = useState(0.00)
  const [loading, setLoading]= useState(false)
  const tax = 4.00

  useEffect(function(){
    setLoading(true)
    api.get(`get_cart?cart_code=${cart_code}`)
    .then(res =>{
      console.log(res.data)
      setCartItems(res.data.items)
      setCartTotal(res.data.sum_total)
      setCartTotal(false)
  })

    .catch(err =>{
      console.log(err.message)
      setLoading(false)
    })

  },[])

  if(loading){
    return < Spinner loading={loading} />
  }


  return (
    <div className='container my-3 py-3'>
      <h5 className='mb-4'>Carrinho</h5>
      <div className='row'>
        <div className='col-md-8'>
          {cartItems.length  > 0 ? (
            cartItems.map(item => <CartItem key= {item.id} item={item} 
              setCartTotal={setCartTotal} 
              cartItems={cartItems}
              setNumberCartItems={setNumberCartItems}
              setCartItems={setCartItems}
               />)
          ) : (
            <div className="alert alert-primary my-5" role='alert'></div>
          )}
        
        </div>

      <CartSumary cartTotal={cartTotal} tax={tax} />
        </div>
    </div>    
  )
}

export default CartPage
