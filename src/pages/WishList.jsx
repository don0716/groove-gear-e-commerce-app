import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import ProductCardWishlist from "../components/productCards/ProductCardWishlist"

const WishList = () => {
    const [wishList, setWishList] = useState([])
    const [cart, setCart] = useState([])
    const [message, setMessage] = useState("")
    const API_URL = process.env.REACT_APP_BACKEND_URL
    const cartValue = cart?.reduce((acc, curr) => curr.quantity + acc, 0 )

    const fetchWishList = async () =>{
        setMessage("Loading...")
        try{
            const res = await axios.get(`${API_URL}/api/users/68073e3381a7d2e650b55871/wishList`)
            setWishList(res.data.wishList)
            setMessage("")
        } catch(error){
            setMessage("Error Occured")
            console.log(error)
        }
    }

    const fetchCart = async () => {
        try{
            const res = await axios.get(`${API_URL}/api/users/68073e3381a7d2e650b55871/cart`)
            setCart(res.data.cartItems)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchWishList()
        fetchCart()
    }, [])

    useEffect(() => {
        if(message.length > 0 || message !== "Loading..."){
            setTimeout(() => {
                setMessage("")
            }, 2000)
        }
    }, [message])


    return (
        <div>
            <Header wishListValue={wishList?.length} cartValue={cartValue} />
            <div className="container">
                <h1 className="text-center my-2">Wishlist ({`${wishList.length}`})</h1>
            <div className="pt-2">
                        {
                    message === "" ? (
                        
                            <div className="py-4"></div>
                        
                    ) : (
                        <div className="alert alert-secondary container" role="alert">
                    {message}
                </div>
                    )
                }
                        </div>

           <div >
           <div className="row">
              {
                (wishList.length > 0 ) ? (
                    <>
                        {
                        wishList.map(item => (
                            <div key={item._id} className="col-md-3">
                                 <ProductCardWishlist
                                    setMessage={setMessage}
                                    product={item}
                                    setWishList={setWishList}
                                    wishList={wishList}
                                    setCart={setCart}
                              />
                            </div>
                        ))
                       }
                    </>
                ) : (
                    message !== "Loading..." && (
                        <h4 className="text-center" >No Items Added In WishList!</h4>
                    )
                )
              }
           </div>
           </div>

            </div>
            <Footer />
        </div>
    )
}

export default WishList