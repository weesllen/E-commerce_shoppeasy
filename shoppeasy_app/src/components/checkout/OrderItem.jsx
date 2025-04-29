
const OrderItem = () => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3" style={{}}>
    <div className="d-flex align-center">
        <img 
        src="" 
        alt="Product"
        className="img-fluid"
        style={{ width: '60px', height:'60px',objectFit:'cover',borderRadius:'5px'}} 
        />
        <div className="ms-3">
            <h6 className="mb-0">Nome do Produto</h6>
        <small>Quantity: 1</small>       
        </div>
        </div> 
        <h6>R$ 100,00</h6>
    </div>
  )
}

export default OrderItem
