import styles from './OrderHistoryItem.module.css'
import { BASE_URL } from '../../api'
import { FormatDate } from '../../utils/FormatDate'

const OrderHistoryItems = ({item}) => {
  return (
    <div className="container mt-4">
    <div className="row mb-4">
      <div className="col-12">
        <div className="card">

          <div className="card-body">

            <div className={`order-item mb-4 p-3 border rounded ${styles.orderItem}`}>
              <div className="row align-items-center">

                <div className="col-md-2">
                  <img 
                    src={`${BASE_URL}${item.product.image}`}
                    alt="Order Item"
                    className="img-fluid"
                    style={{ borderRadius: '5px' }}
                  />
                </div>

                <div className="col-md-6">
                  <h6 className="mb-1">{item.product.name}</h6>
                  <p className="mb-1">{`Data da compra: ${FormatDate(item.order_date)}`}</p>
                  <p className="mb-0">{`ID do pedido: ${item.order_id}`}</p>
                </div>

                <div className="col-md-2 text-center">
                  <h6 className="text-muted">{`Quantidade: ${item.quantity}`}</h6>
                </div>
                <div className="col-md-2 text-center">
                  <h6 className="text-muted">{`Preço: $${item.product.price}`}</h6>
                </div>

              </div>
            </div>
            {/* Fim do item */}

          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default OrderHistoryItems
