import { useParams } from "react-router-dom"
import ProductPagePlaceHolder from "./ProductPagePlaceHolder"
import RelatedProducts from "./RelatedProducts"
import { useEffect, useState } from "react"
import api, { BASE_URL } from "../../api"

const ProductsPage = () => {

    const { slug } = useParams()
    const [product, setProduct]= useState({})
    const [similarProducts, setSimilarProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function(){
        setLoading(true)
        api.get(`product_detail/${slug}`)
        .then(res => {
            console.log(res.data)
            setProduct(res.data)
            setSimilarProducts(res.data.similar_products)
            setLoading(false)
        })
        .catch(err=>{
            console.log(err.message)
            setLoading(false)
        })

    }, [slug])

    if (loading){
      return <ProductPagePlaceHolder />
    }


  return (
    <div>
        <ProductPagePlaceHolder />
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
                <div className="small mb-1">SKU: BST-498</div>
                <h1 className="display-5 fw-bolder">{product.name} </h1>
                <div className="fs-5 mb-5">
                    <span>{`$${product.price}`}</span>
                </div>
                <p className="lead">
                There are many variations of passages of Lorem Ipsum available, 
                but the majority have suffered alteration in some form, by injected
                humour, or randomised words which don't look even slightly believable.
                If you are going to use a passage of Lorem Ipsum, you need to be sure
                there isn't anything embarrassing hidden in the middle of text.
                </p>
                <div className="d-flex">
                    <button className=" btn btn-outline-dark flex-shrink-0"
                    type="button"
                    >
                      <i className="bi-cart-fill me-1"></i>
                      add to cart  
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

