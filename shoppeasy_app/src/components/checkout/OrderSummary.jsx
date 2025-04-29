import OrderItem from "./OrderItem"
import styles from "./OrderSummary.module.css"
const OrderSummary = () => {
  return (
    <div className="col-md-8">
    <div className={`card mb-4 ${styles.card}`}>
        <div className="card-header" style={{background:'#6050DC',color:'white'}}>
            <h5>Sumário do Carrinho</h5>
        </div>
        <div className="card-body">

            <div className="px-3" style={{height:'300px',overflow:'auto'}}>

                {<OrderItem />}
            </div>
            <div className="d-flex justify-content-between"> 
              <h6>ToTal</h6>
              <h6>R$100,00</h6>

            </div>
        </div>
    </div>
      
    </div>
  )
}

export default OrderSummary
