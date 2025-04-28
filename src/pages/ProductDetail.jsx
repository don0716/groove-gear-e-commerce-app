import Header from "../components/Header"
import Footer from "../components/Footer"
import {  useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "../components/ProductCard"

const ProductDetail = () => {
    const [products, setProducts] = useState()
    const {productId} = useParams()
    const product = products?.find(prod => prod._id == productId)
    const [wishList, setWishList] = useState([])
    const [cart, setCart] = useState([])
    const backendUrl = process.env.REACT_APP_BACKEND_URL
    const [message, setMessage] = useState("")
    const cartValue = cart.reduce((acc, curr) => curr.quantity + acc, 0 )

    const serviceBadges = [
        {title: "Free Delivery" ,icon:"bi bi-truck"},
        {title: "Pay on Delivery" ,icon:"bi bi-credit-card-fill"},
        {title: "10 Days Returnable" ,icon:"bi bi-arrow-return-left"},
        {title: "Secure Payment" ,icon:"bi bi-file-earmark-lock"}
    ]

    const fetchWishList = async () =>{
        try{
            const res = await axios.get(`${backendUrl}/api/users/68073e3381a7d2e650b55871/wishList`)
            setWishList(res.data.wishList)
        } catch(error){
            console.log(error)
        }
    }
    const fetchCart = async () => {
        try{

            const res = await axios.get(`${backendUrl}/api/users/68073e3381a7d2e650b55871/cart`)
            // console.log(res.data)
            setCart(res.data.cartItems)

        }catch(error){
            setMessage("There was an Error!")
        }
    }

   

    const fetchProducts = async () => {
        setMessage("Loading...")
        try{
            const res = await axios.get(`${backendUrl}/api/products`)
            setProducts(res.data)
            setMessage("")
        } catch(error){
            console.log(error)
        }
    }
    

    useEffect(() => {
        fetchProducts()
        fetchWishList()
        fetchCart()
    }, [])

    useEffect(() => {
        if(message.length > 0) {
            setTimeout(() => {
                setMessage("")
            }, 3000)
        }
    })


    return (
        <div>
            <Header wishListValue={wishList.length} cartValue={cartValue} />
            <div className="container py-4">
            {
                    message === "" ? "" : (
                        <div class="alert alert-secondary" role="alert">
                    {message}
                </div>
                    )
                }

                {
                    product && (
                        <div className="row">
                    {product && (
                        <div className="col-md-4">
                        <ProductCard
                        setMessage={setMessage}
                        message={message}
                        isDetailPage={true}
                        isListingPage={false}
                        product={product}
                        wishList={wishList}
                        setWishList={setWishList}
                        cart={cart}
                        setCart={setCart}
                  />
                        </div>
                    )}
                    <div className="col-md-8">
                        <h2>{product?.name}</h2>
                        <h4>₹ {product?.price}</h4>
                        <hr />
                        <div className="d-flex my-4 flex-wrap  justify-content-start">
                        {
                            serviceBadges.map(badge => (
                                <div className="d-flex flex-column align-items-center mx-2 my-2">
                        <div className="rounded-circle d-flex justify-content-center align-items-center" style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: "#f0f0f0",
                            }}>
                            <i className={`${badge.icon}`} ></i>
                        </div>
                        <div className="small">{badge.title}</div>
                        </div>
                            ))
                        }
                        </div>
                        <hr />
                        <p><strong>Description:</strong> </p>
                        <p>{product?.description}</p>
                        
                    </div>
                </div>
                    )
                }
                <hr />

                <div className="my-2">

                    <h5>More Items You Might Like</h5>

                    <div className="row">
                    {
                        products?.slice(0,4).map(product => (
                            <div className="col-md-3 py-2 px-2 d-flex">
                                <ProductCard product={product}  cart={cart} setCart={setCart} isListingPage={true} wishList={wishList} setWishList={setWishList} setMessage={setMessage} />
                            </div>
                        ) )
                    }
                    </div>

                </div>

                
            </div>
            <Footer />
        </div>
    )
}

export default ProductDetail