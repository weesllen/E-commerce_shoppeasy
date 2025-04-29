import { Link } from "react-router-dom"



const CartSumary = ({cartTotal,tax}) => {

    const subTotal = cartTotal.toFixed(2)
    const cartTax = tax.toFixed(2)
    const total = (Number(subTotal) + Number(cartTax)).toFixed(2)
    

  return (
    <div className='col-md-4 align-self-start'>
    <div className='card'>
            <div className=' card-body'>
                <h5 className='card-title'>Sumario do Carrinho</h5>
                <hr />           
                <div className='d-flex justify-content-between'>
                    <span>Subtotal:</span>
                    <span>{`$${subTotal}`}</span>
                </div>
                <div className='d-flex justify-content-between'>
                    <span>Taxa:</span>
                    <span>{`$${cartTax}`}</span>
                </div>
                <div className='d-flex justify-content-between mb-3'>
                    <span>Total:</span>
                    <strong>{`$${total}`}</strong>
                </div>
                <Link to='/checkout'>
                <button
                className="btn btn-primary w-160"
                style={{ background: '#6858DC', borderColor:'#5858DC'}}
                >
                    Continuar a Compra
                </button> 
                </Link>   
            </div>
        </div>
        </div>
        )
}

export default CartSumary
