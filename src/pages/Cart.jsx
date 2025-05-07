import Header from "../components/Header"
import Footer from "../components/Footer"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ProductCardCart from "../components/productCards/ProductCardCart"

const Cart = () => {
    const [cart, setCart] = useState([])
    const [wishList, setWishList] = useState([])
    const [isOrderPlaced, setIsOrderPlaced] = useState(false)
    const [message, setMessage] = useState("")
    const API_URL = process.env.REACT_APP_BACKEND_URL
    const cartValue = cart?.reduce((acc, curr) => curr.quantity + acc, 0 )
    const totalProductsPrice = cart?.reduce((acc, curr) => (curr.product.price * curr.quantity) + acc , 0 )
    const discount = totalProductsPrice === 0 ? 0 : totalProductsPrice < 10000 ? 500 : totalProductsPrice < 20000 ? 1000 : totalProductsPrice < 30000 ? 2000 : totalProductsPrice > 40000 ? 3000 : 0
    const deliveryCharges = totalProductsPrice < 10000 && totalProductsPrice > 0 ? 500 : 0
    const totalAmount = (totalProductsPrice + deliveryCharges) - discount
    const [userData, setUserData] = useState([])
    const user = userData?.data?.find(user => user.name === "Donovan Monteiro")
    const defaultAddress = user?.addresses.find(add => add._id.toString() === user?.defaultAddressId?.toString())

    const fetchUsers = async  () => {
            try{
                const res = await axios.get(`${API_URL}/api/users`)
                setUserData(res.data)

            }catch(error){
                console.log(error)
            }
        }

    const fetchCart = async () => {
        setMessage("Loading...")
        try{

            const res = await axios.get(`${API_URL}/api/users/68073e3381a7d2e650b55871/cart`)
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
            const res = await axios.get(`${API_URL}/api/users/68073e3381a7d2e650b55871/wishList`)
            setWishList(res.data.wishList)
        } catch(error){
            setMessage("Error fetching Wishlist!")
        }
    }

    const fetchAddresses = async () => {
        try{
            await axios.get(`${API_URL}/api/users/68073e3381a7d2e650b55871/address`)
        }catch(error){
            console.log(error)
        }
    }

    const handleCheckout = async () => {
        setMessage("Loading...")
        try{
            await axios.delete(`${API_URL}/api/users/68073e3381a7d2e650b55871/cart`)
            setMessage("Order Placed Successfully!")
            setCart([])
            setMessage("")
        }catch(error){
            console.log(error)
            setMessage("Error!")
        }
    }

    const handleDefaultAddress = async (addressId) => {
        setMessage("Setting Default Address...")
        try{
            await axios.patch(`${API_URL}/api/users/68073e3381a7d2e650b55871/default-address`, {
                addressId
            })
            fetchUsers()
            setMessage("Changed Default Address!")

        }catch(error) {
            setMessage("Some Error Occured!")
        }
    }
  
    useEffect(() => {
        fetchCart()
        fetchWishList()
        fetchAddresses()
        fetchUsers()
    }, [])

    useEffect(() => {
        if(message.length > 0 || message !== "Loading..." ){
          setTimeout(() => {
                setMessage("")
            }, 3000)
        }
    }, [message])

    return (
        <div>
            <Header cartValue={cartValue} wishListValue={wishList?.length} />
            <div className="bg-light">

                <h2 className="text-center py-2">
                    MY CART ({cartValue})
                </h2>

                {
                    message === "" ? (
                        <div className="py-4"></div>
                    ) : (
                        <div className="alert alert-secondary container" role="alert">
                    {message}
                </div>
                    )
                }
                {
                    (!cart.length > 0 && message !== "Loading...") && <h2 className="text-center">Add Items to Cart!</h2>
                }
    
                    {
                    !isOrderPlaced && (
                        <div className="container">
                <div className="row mt-4">

                    <div className="col-md-7">
                    <div className="row">
                        
                        {
                            cart.map(item => (
                                <div key={item.product._id} className="col-md-4">
                                    <ProductCardCart 
                                    product={item.product}
                                    quantity={item.quantity}
                                    setWishList={setWishList}
                                    wishList={wishList}
                                    setCart={setCart}
                                    setMessage={setMessage} />
                                </div>
                            ))
                        }
                   
                    </div>
                    </div>

                    {
                        cart?.length > 0 && (
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
                                <hr />
 
                                  <div><strong>Select an Address: </strong> 
                                    {user?.addresses?.length === 0 && <p className="text-center" style={{color: "red"}} >No Addresses Found. Please an Address. <Link to={`/useraccount`} className="btn btn-primary btn-sm">Add An Address</Link>  </p>}
                                    
                                      <ul>
                                      {user?.addresses?.map(add => (
                                        <li key={add._id}>
                                            
                                            
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                <p>{add.name} {user.defaultAddressId === add._id && (
                                                <span className="badge bg-success">Default</span>
                                            )} </p>
                                            <p>Phone: {add.phone} | {add.street}, {add.state} | pincode: {add.pincode}</p>
                                            <button onClick={() => handleDefaultAddress(add._id) } className={`btn btn-primary btn-sm ${user.defaultAddressId === add._id && "disabled"} `}>Make Default Address</button>
                                                </div>
                                                <div>
                                                   <div>
                                                    
                                                   </div>

                                            </div>
                                            </div>
                                            
                                            <hr />
                                        </li>
                                      ))}
                                      </ul>
                                     </div>

                                

                            </div>
                            <button onClick={() => setIsOrderPlaced(true)} className={`btn btn-primary m-3 ${!defaultAddress && `disabled` }`} >Place Order</button>
                        </div>
                    </div>
                        )
                    }


                    </div>
                </div>
                    )
                }
                

                {
                    (isOrderPlaced && cart.length > 0) && (
                        <div className="container">
                <hr />
                    <h2 className="text-center">Order Summary</h2>
                    <div className="card">
                        <div className="card-body">
                            <button onClick={() => setIsOrderPlaced(false)} className="btn btn-warning btn-sm mb-3">Back to Cart</button>

                            <div className="">
                            {
                                cart.map(item => (
                                    <div key={item.product._id} className="d-flex justify-content-between">
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
                                <button onClick={() => handleCheckout() }  className="btn btn-primary">Checkout</button>
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