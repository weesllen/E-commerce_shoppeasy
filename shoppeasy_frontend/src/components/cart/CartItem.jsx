import { useState } from "react"
import api, { BASE_URL } from "../../api"
import { toast } from "react-toastify"


const CartItem = ({item,setCartItems,setCartTotal,cartItems, setNumberCartItems}) => {
  
  const [quantity,setQuantity] = useState(Number(item.quantity) || 1)
  const [loading,setLoading] = useState(false)
  
  const itemData = {quantity:quantity, item_id:item.id}
  const itemId = {item_id: item.id};
  
  function deleteCartItem(){

    const confirmDelete = window.confirm('Tem certeza que deseja deletar esse item?')

    if(confirmDelete){
    console.log(itemId)
    api.post('delete_cart_item/',itemId)
    .then( res =>{
      console.log(res)
      toast.success('Item Deletado com sucesso!')
      const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id)
      setCartItems(updatedCartItems)
      setCartTotal(updatedCartItems.reduce((acc,curr) => acc + Number(curr.total),0))
      setNumberCartItems(updatedCartItems.reduce((acc,curr) => acc + Number(curr.quantity),0))
    })

    .catch(err =>{
      console.log(err.message)
    })

  }}


  function updateCartItem() {
    setLoading(true)
    api.patch('update_quantity/',itemData)
    .then(res=> {
      console.log(res.data)
      setLoading(false)
      toast.success('Item atualizando com sucesso!')

      const updatedCartItems = cartItems.map(cartItem => cartItem.id === item.id ? res.data.data: cartItem)
      setCartItems(updatedCartItems)
      setCartTotal(updatedCartItems.reduce((acc,curr) => acc + Number(curr.total),0))
      setNumberCartItems(updatedCartItems.reduce((acc,curr) => acc + Number(curr.quantity),0))
    })
    
    .catch(err => {
      console.log(err.message)
      setLoading(false)
    })
  }

  return (
    <div className="col-12">
      <div
      className="cart-item d-flex flex-column flex-md-row align-items-start align-items-md-center mb-3 p-3"
      style={{background: '#f8f9fa', borderRadius: '12px', border: '1px solid #e9ecef', gap: '12px'}}
      >
      <img 
      src={`${BASE_URL}${item.product.image}` } 
      alt="Nome do produto" 
      className="img-fluid"
      style={{width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px'}}
      />
      <div className="flex-grow-1 ms-md-3" style={{ minWidth: 0 }}>
        <h5 className="mb-1">{item.product.name}</h5>
        <p className="mb-0 text-muted">{ `R$ ${Number(item.product.price).toFixed(2)}` }</p>
        </div>
        <div className="d-flex align-items-center gap-2 ms-md-auto flex-shrink-0" style={{ minWidth: '210px' }}>
            <input type="number"
            className="form-control"
            min='1'
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
            style={{ width:'78px'}} 
            />
            <button className="btn btn-sm"
            onClick={updateCartItem}
            style={{background:'#4B3BCB', color: 'white'}} disabled={loading}>
              {loading ? 'Atualizando' : 'Atualizar'}
              </button>
            <button className="btn btn-danger btn-sm" onClick={deleteCartItem}>Remover</button>
            </div>      
      </div>
    </div>
  )
}

export default CartItem
