import { useEffect,useState } from "react";
import api from "../../api";


function useCartData() {

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
        setLoading(false)
    })

        .catch(err =>{
        console.log(err.message)
        setLoading(false)
        })

    },[cart_code])

    return {cartItems, setCartItems, cartTotal, setCartTotal, loading, tax}

}

export default useCartData