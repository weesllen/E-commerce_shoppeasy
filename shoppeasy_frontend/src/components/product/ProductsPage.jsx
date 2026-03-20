import { useParams } from "react-router-dom"
import ProductPagePlaceHolder from "./ProductPagePlaceHolder"
import RelatedProducts from "./RelatedProducts"
import { useEffect, useState } from "react"
import api, { BASE_URL } from "../../api"
import { getOrCreateCartCode } from '../../utils/CartUtils'
import { toast } from "react-toastify"



const ProductsPage = ({setNumberCartItems}) => {
  
  const { slug } = useParams()
  const [product, setProduct]= useState({})
  const [similarProducts, setSimilarProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const[InCart,setInCart] = useState(false)
  const cart_code = getOrCreateCartCode();
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(product.price || 0))

  
  useEffect(function(){
    if(product.id){
      api.get(`products_in_cart?cart_code=${cart_code}&product_id=${product.id}`)
        .then(res =>{
          console.log(res.data)
          setInCart(res.data.products_in_cart)
        })
        
        .catch(err =>{
          console.log(err.message)
        })
      }
    },[cart_code,product.id])
    
       function add_item() {
        const newItem = { cart_code: cart_code, product_id: product.id };
      
        api.post('add_item/', newItem, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          console.log(res.data);
          setInCart(true);
          setNumberCartItems(curr => curr + 1);
          toast.success('Item adicionado no carrinho com sucesso!')
        })
        .catch(err => {
          console.error(err.message);
        });
      }

    
    useEffect(function(){
        setLoading(true)
        api.get(`product_detail/${slug}`)
        .then(res => {
            console.log(res.data)
            setProduct(res.data)
            setSimilarProducts(res.data.similar_products)
            setLoading(false)

        })
        .catch(err=> {
            console.log(err.message)
            setLoading(false)
        })

    }, [slug])

    if (loading){
      return <ProductPagePlaceHolder />
    }


  return (
    <div>
      <section className="py-3">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
                <img  
                    className="card-img-top mb-5 mb-md-8"
                    src={`${BASE_URL}${product.image}`}
                    alt="..." 
                />
            </div>
            <div className="col-md-6">
                <h1 className="display-5 fw-bolder">{product.name} </h1>
                <div className="mb-4">
                    <p className="text-muted mb-1">Preco a vista</p>
                    <span className="fw-bold text-success" style={{ fontSize: '2rem', lineHeight: 1 }}>
                      {formattedPrice}
                    </span>
                    <p className="small text-muted mb-0 mt-1">Em ate 10x sem juros no cartao</p>
                </div>
                <p className="lead" style={{ textAlign: 'justify' }}>
                {product.description}
                </p>
                <div className="d-flex">
                    <button className=" btn btn-outline-dark flex-shrink-0"
                    type="button"
                    onClick={add_item}
                    >
                      <i className="bi-cart-fill me-1"></i>
                      Comprar
                    </button>
                </div>
            </div>
            </div>
        </div>
        </section>  

        <RelatedProducts products={similarProducts} />
    </div>

  )
}

export default ProductsPage

