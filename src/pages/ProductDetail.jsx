import Header from "../components/Header"
import Footer from "../components/Footer"
import {  useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "../components/ProductCard"
import useFetch from "../useFetch"
import RatingComponent from "../components/RatingComponent"

const ProductDetail = () => {
    const [products, setProducts] = useState()
    // Impletement fetch and fetch in case you directly land on page also.
    const {productId} = useParams()
    const product = products?.find(prod => prod._id == productId)
    console.log("Product:: ", product)

    // const {data, loading, error} = useFetch(`https://groove-gear-ecommerce-backend.vercel.app/api/products`)
    // console.log("Data:: ", data, "Loading..", loading, "error:", error)

    const [wishList, setWishList] = useState([])

    const fetchWishList = async () =>{
        try{
            const res = await axios.get(`https://groove-gear-ecommerce-backend.vercel.app/api/users/68073e3381a7d2e650b55871/wishList`)
            setWishList(res.data.wishList)
        } catch(error){
            console.log(error)
        }
    }

   

    const fetchProducts = async () => {
        try{
            const res = await axios.get(`https://groove-gear-ecommerce-backend.vercel.app/api/products`)
            setProducts(res.data)
        } catch(error){
            console.log(error)
        }
    }
    

    useEffect(() => {
        fetchProducts()
        fetchWishList()
    }, [])


    return (
        <div>
            <Header />
            <div className="container m-2">
                <div className="row">
                    {product && (
                        <div className="col-md-4">
                        <ProductCard
                        isDetailPage={true}
                        isListingPage={false}
                    product={product}
                    wishList={wishList}
                    setWishList={setWishList}
                    cart={[]}
                    setCart={() => {}}
                  />
                        </div>
                    )}
                    <div className="col-md-8">
                        <h2>{product?.name}</h2>
                        <h4>₹ {product?.price}</h4>
                        <hr />
                         <i class="bi bi-truck"></i>
                         <i class="bi bi-wallet"></i>
                         
                        <hr />
                        <p><strong>Description:</strong> </p>
                        <p>{product?.description}</p>
                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductDetail