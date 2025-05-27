import React from 'react'
import OrderHistoryItems from './OrderHistoryItems'

const OrderHistoryItemContainer = ({orderItems = []}) => {
  return (
<div className="container mt-4">
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-header" style={{ background: '#0E689F', color: 'white' }}>
          <h6 className="mb-0">Historico de compras</h6>
        </div>

        <div className="card-body" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {orderItems.map(item => <OrderHistoryItems key={item.id} item={item} />)}
          
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default OrderHistoryItemContainer
