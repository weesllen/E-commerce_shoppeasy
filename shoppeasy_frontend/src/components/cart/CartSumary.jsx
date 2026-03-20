import { Link } from "react-router-dom"


const CartSumary = ({cartTotal,tax}) => {

        const subTotal = Number(cartTotal || 0)
        const cartTax = Number(tax || 0)
        const total = subTotal + cartTax

        const formatCurrency = (value) =>
            new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(value)
    

  return (
    <div className='col-12 col-lg-4 align-self-start'>
    <div className='card shadow-sm border-0'>
            <div className=' card-body'>
                <h5 className='card-title fw-semibold'>Resumo do Carrinho</h5>
                <hr />           
                <div className='d-flex justify-content-between'>
                    <span>Subtotal:</span>
                    <span>{formatCurrency(subTotal)}</span>
                </div>
                <div className='d-flex justify-content-between'>
                    <span>Taxa:</span>
                    <span>{formatCurrency(cartTax)}</span>
                </div>
                <div className='d-flex justify-content-between mb-3'>
                    <span>Total:</span>
                    <strong>{formatCurrency(total)}</strong>
                </div>
                <Link to='/checkout'>
                <button
                className="btn btn-primary w-100"
                style={{ background: '#6858DC', borderColor:'#5858DC'}}
                disabled={subTotal <= 0}
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
