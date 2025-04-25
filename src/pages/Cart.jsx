import Header from "../components/Header"
import Footer from "../components/Footer"
import ProductCard from "../components/ProductCard"
import axios from "axios"
import { useState, useEffect } from "react"


const Cart = () => {

    const [cart, setCart] = useState([])
    const [wishList, setWishList] = useState([])
    const [isOrderPlaced, setIsOrderPlaced] = useState(false)
    const [message, setMessage] = useState("")
    const [checkout, setCheckout] = useState(false)

    console.log("cart:: , ", cart)
    const cartValue = cart.reduce((acc, curr) => curr.quantity + acc, 0 )

    const totalProductsPrice = cart.reduce((acc, curr) => (curr.product.price * curr.quantity) + acc , 0 )
    const discount = totalProductsPrice === 0 ? 0 : totalProductsPrice < 10000 ? 500 : totalProductsPrice < 20000 ? 1000 : totalProductsPrice < 30000 ? 2000 : totalProductsPrice > 40000 ? 3000 : 0

    const deliveryCharges = totalProductsPrice < 10000 && totalProductsPrice > 0 ? 500 : 0

    const totalAmount = (totalProductsPrice + deliveryCharges) - discount

    const [userData, setUserData] = useState([])
    
    const user = userData.data?.find(user => user.name === "Donovan Monteiro")
    const defaultAddress = user?.addresses.find(add => add._id.toString() === user?.defaultAddressId?.toString())
    console.log("user::", user)
    console.log("defaultAddressData:: ", defaultAddress)

  const fetchUsers = async  () => {
        try{
            const res = await axios.get(`https://groove-gear-ecommerce-backend.vercel.app/api/users`)
            setUserData(res.data)

        }catch(error){
            console.log(error)
        }
    }
    




    const fetchCart = async () => {
        setMessage("Loading...")
        try{

            const res = await axios.get(`https://groove-gear-ecommerce-backend.vercel.app/api/users/68073e3381a7d2e650b55871/cart`)
            // console.log(res.data)
            setCart(res.data.cartItems)
            setMessage("")

        }catch(error){
            setMessage("There was an Error!")
            console.log(error)
        }
    }

    const fetchWishList = async () =>{
        try{
            const res = await axios.get(`https://groove-gear-ecommerce-backend.vercel.app/api/users/68073e3381a7d2e650b55871/wishList`)
            setWishList(res.data.wishList)
        } catch(error){
            console.log(error)
        }
    }

    const fetchAddresses = async () => {
        try{
            const res = await axios.get(`https://groove-gear-ecommerce-backend.vercel.app/api/users/68073e3381a7d2e650b55871/address`)
            console.log(res.data)
        }catch(error){
            console.log(error)
        }
    }
  
    useEffect(() => {
        fetchCart()
        fetchWishList()
        fetchAddresses()
        fetchUsers()
    }, [])
    console.log("CHECKOUT:: ", checkout)
    console.log("message:: ", message)

    useEffect(() => {
        if(message.length > 0 ){
          setTimeout(() => {
                setMessage("")
            }, 3000)
        }
    }, [message])

    return (
        <div>
            <Header cartValue={cartValue} wishListValue={wishList.length} />
            <div className="bg-light">

                <h2 className="text-center py-2">
                    MY CART ({cartValue})
                </h2>

                {
                    message === "" ? "" : (
                        <div class="alert alert-secondary container" role="alert">
                    {message}
                </div>
                    )
                }

                {
                    !isOrderPlaced && (
                        <div className="container">
                <div className="row mt-4">

                    <div className="col-md-7">
                    <div className="row">
                        
                        {
                            cart.map(item => (
                                <div className="col-md-4">
                                    <ProductCard isCartPage={true}
                                    product={item.product}
                                    quantity={item.quantity}
                                    setWishList={setWishList}
                                    wishList={wishList}
                                    cart={cart}
                                    setCart={setCart}
                                    setMessage={setMessage} />
                                </div>
                            ))
                        }
                   
                    </div>
                    </div>

                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-body">
                                <h5>Price Details</h5>
                                <hr />

                                <div className="d-flex justify-content-between">

                                    <div>
                                        <p>Price:</p>
                                        <p>Discount: </p>
                                        <p>Delivery Charges:</p>
                                    </div>
                                    <div>
                                        <p>₹ {totalProductsPrice}</p>
                                        <p>₹ {discount}</p>
                                        <p>₹ {deliveryCharges}</p>
                                    </div>

                                    
                                </div>
                                <hr />

                                <div className="d-flex justify-content-between">
                                    
                                    <h5>TOTAL AMOUNT</h5>
                                    <h5>₹ {totalAmount}</h5>

                                </div>

                                {
                                    totalAmount > 0 && (
                                        <div>
                                
                                    You will save <span><strong>{discount}</strong></span> on this order
                                </div>
                                    )
                                }

                                

                            </div>
                            <button onClick={() => setIsOrderPlaced(true)} className="btn btn-primary m-3">Place Order</button>
                        </div>
                    </div>


                    </div>
                </div>
                    )
                }
                

                {
                    (isOrderPlaced) && (
                        <div className="container">
                <hr />
                    <h2 className="text-center">Order Summary</h2>
                    <div className="card">
                        <div className="card-body">
                            <button onClick={() => setIsOrderPlaced(false)} className="btn btn-warning btn-sm mb-3">Back to Cart</button>

                            <div className="">
                            {
                                cart.map(item => (
                                    <div className="d-flex justify-content-between">
                                        <p> {item.product.name} x {item.quantity} </p>
                                        
                                        <p> ₹  {item.product.price * item.quantity}</p>
                                    </div>
                                ))
                            }
                            <hr />
                            <h4 className="text-center">Cart Total Amount: {totalAmount} </h4>
                            </div>
                            <hr />

                            <div>
                                <h5>Deliver to: </h5>
                                {
                                    user?.addresses?.length === 0 || !defaultAddress  ? (
                                        <div>Please Add or Choose a default Address in your account to deliver this product.</div>
                                    ) : (
                                        <div>
                                            <p>{defaultAddress?.street}, {defaultAddress?.state} | pincode: {defaultAddress?.pincode}</p>
                                <p><strong>Phone:</strong> {defaultAddress?.phone}</p>
                                <button onClick={() => {
                                    setCheckout(true)
                                    setMessage("Order Placed Successfully!")
                                    setCart([])
                                } }  className="btn btn-primary">Checkout</button>
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                    </div>
                </div>
                    )
                }
                
            </div>
            <Footer />
        </div>
    )
}

export default Cart