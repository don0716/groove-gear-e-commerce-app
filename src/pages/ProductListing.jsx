import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "../components/ProductCard"
import FilterComponent from "../components/FilterComponent"

const ProductListing = () => {

    const [products, setProducts] = useState([])
    const [wishList, setWishList] = useState([])
    const [categories, setCategories] = useState([])
    // const [cart, setCart] = useState([{
    //     product: "",
    //     quantity: 0
    // }])
    const [cart, setCart] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchInstruments, setSearchInstruments] = useState("")
    const [filter, setFilter] = useState({
        priceRange: 0,
        sortByPrice: "",
        rating: 0,
        categories: []
    })
    console.log("cart quantity count:: ", cart.reduce((acc, curr) => curr.quantity + acc, 0 ) )
    console.log("cart length:: ", cart.length) 
    const cartValue = cart.reduce((acc, curr) => curr.quantity + acc, 0 )
    const wishListValue = wishList.length
    const [message, setMessage] = useState("")


    // console.log("wishList:: , ", wishList)
    // console.log("Cart:: ", cart)
    // console.log("SearchInstruments:: ", searchInstruments)

    const fetchWishList = async () =>{
        try{
            const res = await axios.get(`https://groove-gear-ecommerce-backend.vercel.app/api/users/68073e3381a7d2e650b55871/wishList`)
            setWishList(res.data.wishList)
        } catch(error){
            console.log(error)
        }
    }

    const fetchCart = async () => {
        try{
            const res = await axios.get(`https://groove-gear-ecommerce-backend.vercel.app/api/users/68073e3381a7d2e650b55871/cart`)
            setCart(res.data.cartItems)
        }catch(error){
            console.log(error.message)
        }
    }

     const fetchProducts = async () => {
        setMessage("Loading...")
        try{
            const res = await axios.get(`https://groove-gear-ecommerce-backend.vercel.app/api/products`)
            setProducts(res.data)
            setMessage("")
        } catch(error){
            setMessage("Error Fetching Products!")
            console.log(error)
        }
    }

    const fetchCategories = async () => {
        try{
            const res = await axios.get(`https://groove-gear-ecommerce-backend.vercel.app/api/categories`)
            setCategories(res.data.prod)
        } catch(error){
            console.log(error)
        }
    }
    console.log("Products:: ", products)
    console.log("categories:: ", categories)
    console.log("----------")


    // Handle all filters and search component here.
    const handlefilters = () => {
        let filtered = [...products]
        
        if(filter.priceRange > 0){
            filtered = filtered.filter(prod => prod.price <= filter.priceRange )
        }

        if(filter.sortByPrice === "lowToHigh" ){
            filtered = filtered.sort((a,b) => a.price - b.price)
        } else if(filter.sortByPrice === "highToLow"){
            filtered = filtered.sort((a,b) => b.price - a.price)
        }

        if(filter.rating > 0 ){
            filtered = filtered.filter(prod => prod.rating >= filter.rating )
        }

        if(filter.categories.length > 0) {
            filtered = filtered.filter(prod => filter.categories.includes(prod.category.name)  )
        }

        if(searchInstruments !== "") {
            filtered = filtered.filter(prod => prod.name.toLowerCase().includes(searchInstruments.toLowerCase()) || prod.category.name.toLowerCase().includes(searchInstruments.toLowerCase())  )
        }
        // console.log("Filtered:: ", filtered)

        setFilteredProducts(filtered)
    }

    useEffect(() => {
         fetchProducts()
         fetchCategories()
         fetchCart()
         fetchWishList()
    }, [])
    console.log("cart listing", cart)

    useEffect(() => {
        handlefilters()
    }, [products, filter, searchInstruments])

    useEffect(() => {
        if(message.length > 0 ){
            setTimeout(() => {
                setMessage("")
            }, 3000)
        }
    }, [message])

    return (
        <div>
            <Header setSearchInstruments={setSearchInstruments} cartValue={cartValue} wishListValue={wishListValue} isListingPage= {true} />
            <div className="container">
                

                <div className="row">
                    <div className="col-md-2 py-4">
                    <FilterComponent filter={filter} setFilter={setFilter} categories={categories} />
                        

                    </div>
                    <div className="col-md-10 py-4">

                        <div>
                            <h4 className="text-center">Showing All Instruments </h4>
                        </div>
                        <div>
                        {
                    message === "" ? (
                        
                            <div className="py-4"></div>
                        
                    ) : (
                        <div class="alert alert-secondary container" role="alert">
                    {message}
                </div>
                    )
                }
                        </div>

                        <div className="row">
                            {
                                filteredProducts.length > 0 ? (
                                    filteredProducts.map(product => (
                                        <div key={product._id} className="col-md-3 py-2 px-2 d-flex">
                                            <ProductCard product={product}  cart={cart} setCart={setCart} isListingPage={true} wishList={wishList} setWishList={setWishList} setMessage={setMessage} />
                                        </div>
                                    ))
                                ) : <div className="d-flex justify-content-center align-items-center">
                                    <p>No Products Found</p>
                                </div>
                            }
                        </div>
                        

                    </div>
                </div>
                
            </div>
            <Footer />
        </div>
    )
}

export default ProductListing