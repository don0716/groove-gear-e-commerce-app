import Header from "../components/Header"
import { useState, useEffect } from "react"
import axios from "axios"
import ProductCard from "../components/productCards/ProductCard"
import Footer from "../components/Footer"
import { Link, useNavigate } from "react-router-dom"

const LandingPage  = () => {

    const [cart, setCart] = useState([])
    const [wishList, setWishList] = useState([])
    const [categories, setCategories] = useState([])
    const [message, setMessage] = useState("")
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const API_URL = process.env.REACT_APP_BACKEND_URL
    const cartValue = cart?.reduce((acc, curr) => curr.quantity + acc, 0 )

    const fetchProducts = async () => {
        setMessage("Loading...")
        try{
            const res = await axios.get(`${API_URL}/api/products`)
            setProducts(res.data)
            setMessage("")
        } catch(error){
            console.log(error)
        }
    }

    const fetchCart = async () => {
        setMessage("Loading...")
        try{

            const res = await axios.get(`${API_URL}/api/users/68073e3381a7d2e650b55871/cart`)
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

    const fetchCategories = async () => {
        try{
            const res = await axios.get(`${API_URL}/api/categories`)
            setCategories(res.data.prod)
            
        } catch(error){
            setMessage(error.message)
        }
    }

    useEffect(() => {
            fetchCart()
            fetchWishList()
            fetchCategories()
            fetchProducts()
        }, [])
    
        useEffect(() => {
            if(message.length > 0 || message !== "Loading..." ){
              setTimeout(() => {
                    setMessage("")
                }, 3000)
            }
        }, [message])

    return (
        <>  
          <Header  cartValue={cartValue} wishListValue={wishList?.length}/>

          <div className="bg-light">
          <div className="container">
          {
                    message === "" ? (
                        <div className="py-4"></div>
                    ) : (
                        <div className="alert alert-secondary container my-2" role="alert">
                    {message}
                </div>
                    )
                }
          </div>


          {
            message !== "Loading..." ? (
                <div>
          <div className="container">
          
            <div className="">
            <div className="row justify-content-center">
                { 
                    categories?.map(cat => (
                        <div style={{cursor: "pointer"}} key={cat._id} className="col-md-2 border-0 card my-3 mx-4 position-relative"  onClick={() => navigate(`/products?category=${cat.name}`)} >
                            <img style={{ height: "80px", objectFit: "cover" }} src={`https://media.istockphoto.com/id/1337514975/vector/rock-music-band-vector-flat-illustration-isolated-over-white-background-hard-rock-and-heavy.jpg?s=612x612&w=0&k=20&c=Ngx7NlK0E6wIf9NigmNB3yZoE67kWuUIRZx7l5-YmQ4=`} alt="image" />

                            <h4 className="position-absolute top-50 start-50 bg-light rounded translate-middle text-center bg-opacity-80 w-100">{cat.name}</h4>
                            
                        </div>
                    ))
                }
            </div>
            </div>

            <div className="my-4">
                <div className="card text-center">
                    <img  style={{ height: "150px", objectFit: "contain" }}   className="img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTjAHpO5cGjQuylLQkTZJTXBv4NdSU3jozaA&s" alt="" />
                    <h2 className=""><i>Buy Musical Instruments</i></h2>
                </div>
                
            </div>

            <div className="card bg-light my-4">
                <div className="card-body text-center">
                    <h4>Featured Products</h4>
                <div className="row">
                        {
                            products?.slice(3,7).map(product => (
                                <div key={product._id} className="col-md-3 py-2 px-2 d-flex">
                                    <ProductCard product={product} setCart={setCart}  wishList={wishList} setWishList={setWishList} setMessage={setMessage} />
                                </div>
                            ) )
                        }
                </div>
                <Link to={`/products`}><button className="btn btn-warning my-2">View All Products</button></Link>
                </div>
            </div>

          </div>
          </div>
            ) : ""
          }
          </div>

          <Footer />
        </>
    )
}

export default LandingPage