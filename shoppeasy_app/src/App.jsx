import { BrowserRouter,Routes,Route } from "react-router-dom"
import MainLayout from "./Layout/MainLayout"
import NotFoundPage from "./components/ui/NotFoundPage"
import ProductsPage from "./components/product/ProductsPage"
import HomePage from "./components/home/Homepage"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="products/:slug" element={<ProductsPage />} />
      <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App

