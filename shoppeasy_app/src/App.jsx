import { BrowserRouter,Routes,Route } from "react-router-dom"
import MainLayout from "./Layout/MainLayout"
import NotFoundPage from "./components/ui/NotFoundPage"
import ProductsPage from "./components/product/ProductsPage"
import HomePage from "./components/home/Homepage"
import { useEffect, useState } from "react"
import CartPage from "./components/cart/CartPage"
import api from "./api"
import CheckoutPage from "./components/checkout/CheckoutPage"
import LoginPage from "./components/user/LoginPage"
import ProtectedRouter from "./components/ui/ProtectedRouter"
import { AuthProvider } from "./components/context/AuthContext"

const App = () => {

  const [numCartItems,setNumberCartItems] = useState(0)
  const cart_code = localStorage.getItem("cart_code")

  useEffect(function(){

    if(cart_code){
      api.get(`get_cart_stat?cart_code=${cart_code}`)
      .then( res => {
        console.log(res.data)
        setNumberCartItems(res.data.num_of_items)
    })

      .catch(err => {
        console.log(err.message)
      })    

    }
  },[])

  return (
    <AuthProvider>
    <BrowserRouter>


    <Routes>

      <Route path="/" element={<MainLayout numCartItems={numCartItems} />}>
      <Route index element={<HomePage />} />
      <Route path="products/:slug" element={<ProductsPage  setNumberCartItems={setNumberCartItems} />} />
      <Route path="cart" element={<CartPage setNumberCartItems={setNumberCartItems}/>} />
      <Route path="checkout" element= {
        <ProtectedRouter>
        <CheckoutPage />
        </ProtectedRouter>
      }/>

      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />


      </Route>


    </Routes>


    </BrowserRouter>
    </AuthProvider>
  )
}

export default App

