import CartItem from "../cart/CartItem";
import OrderItem from "./OrderItem";
import styles from "./OrderSummary.module.css";

const OrderSummary = ({cartItems, cartTotal, tax}) => {

  const total = (cartTotal + tax)

  return (
    <div className="col-md-8">
    <div className={`card mb-4 ${styles.card}`}>
        <div className="card-header" style={{background:'#0E689F',color:'white'}}>
            <h5>Sumário do Carrinho</h5>
        </div>
        <div className="card-body">

            <div className="px-3" style={{height:'300px',overflow:'auto'}}>
              
                {cartItems.map(cartItem => <OrderItem  key={cartItem.id} cartItem={cartItem} />)}
                
            </div>
            <div className="d-flex justify-content-between"> 
              <h6>Total</h6>
              <h6>{`R$ ${total}`}</h6>

            </div>
        </div>
    </div>
      
    </div>
  )
}

export default OrderSummary
