import { useState } from "react"
import api, { BASE_URL } from "../../api"
import { toast } from "react-toastify"


const CartItem = ({item,setCartItems,setCartTotal,cartItems, setNumberCartItems}) => {
  
  const [quantity,setQuantity] = useState(item.quantity)
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
      setCartItems(cartItems.filter(cartItem => cartItem != item.id))

      setCartTotal(cartItems.filter((cartItem) => cartItem.id != item.id)
      .reduce((acc,curr) => acc + curr.total,0)) 
      
      setNumberCartItems(cartItems.filter((cartItem) => cartItem.id != item.id)
      .reduce((acc,curr) => acc+curr.total,0))
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

      setCartTotal(cartItems.map((cartItem) => cartItem.id === item.id ? res.data.data: cartItem)
      .reduce((acc,curr) => acc + curr.total,0)) 
      
      setNumberCartItems(cartItems.map((cartItem) => cartItem.id === item.id ? res.data.data: cartItem )
      .reduce((acc,curr) => acc+curr.total,0))
    })
    
    .catch(err => {
      console.log(err.message)
      setLoading(false)
    })
  }

  return (
    <div className="col-md-12">
      <div
      className="cart-item d-flex align-items-center mb-3 p-3"
      style={{background: '#f8f9fw', borderRadius: '8px'}}
      >
      <img 
      src={`${BASE_URL}${item.product.image}` } 
      alt="Nome do produto" 
      className="img-fluid"
      style={{width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px'}}
      />
      <div className="ms-3 flex-grow-1">
        <h5 className="mb-1">{item.product.name}</h5>
        <p className="mb-0 text-muted">{ `$${item.product.price}` }</p>
        </div>
        <div className=" d-flex align-items-center">
            <input type="number"
            className="form-control me-2"
            min='1'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ width:'70px'}} 
            />
            <button className="btn btn-sm mx-2"
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
