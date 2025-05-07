import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import FilterComponent from "../components/FilterComponent"
import { useLocation } from "react-router-dom"
import ProductListingCard from "../components/productCards/ProductListingCard"

const ProductListing = () => {
    const [products, setProducts] = useState([])
    const [wishList, setWishList] = useState([])
    const [categories, setCategories] = useState([])
    const [cart, setCart] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchInstruments, setSearchInstruments] = useState("")
    const [filter, setFilter] = useState({
        priceRange: 0,
        sortByPrice: "",
        rating: 0,
        categories: []
    })
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const categoryFromURL = params.get("category");
    const [message, setMessage] = useState("")
    const cartValue = cart?.reduce((acc, curr) => curr.quantity + acc, 0 )
    const wishListValue = wishList?.length
    const API_URL = process.env.REACT_APP_BACKEND_URL

    const fetchWishList = async () =>{
        try{
            const res = await axios.get(`${API_URL}/api/users/68073e3381a7d2e650b55871/wishList`)
            setWishList(res.data.wishList)
        } catch(error){
            setMessage(error.message)
        }
    }

    const fetchCart = async () => {
        try{
            const res = await axios.get(`${API_URL}/api/users/68073e3381a7d2e650b55871/cart`)
            setCart(res.data.cartItems)
        }catch(error){
            setMessage(error.message)
        }
    }

     const fetchProducts = async () => {
        setMessage("Loading...")
        try{
            const res = await axios.get(`${API_URL}/api/products`)
            setProducts(res.data)
            setMessage("")
        } catch(error){
            setMessage("Error Fetching Products!, ERROR:: ", error.message)
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

    const handleWishList = async (prodId, isProductInWishList) => {
        const product = products.find(prod => prod._id === prodId)
        if(!isProductInWishList){
          try{
            setMessage("Loading...")
            await axios.post(`${API_URL}/api/users/68073e3381a7d2e650b55871/wishlist`,{
              productId: prodId
            } )
            setWishList(prev => [...prev, product])
            setMessage("Added to WishList!")
            
          }catch(error) {
            setMessage("Failed to Add To WishList!", error.message)
          }
        } else {
          try{
            setMessage("Loading...")
            await axios.delete(`${API_URL}/api/users/68073e3381a7d2e650b55871/wishlist/${prodId}`)
    
            setMessage("Successfully Deleted from WishList!")
            setWishList(prev => prev.filter(item => item._id !== prodId))
            
          }catch(error) {
            setMessage("Failed to Delete from Wishlist", error.message)
          }
        }
      }
    
      const handleAddToCart = async (prodId, isAddToCartBtn = false) => {
        const product = products.find(prod => prod._id === prodId)
        try{
          setMessage("Loading...")
          if(isAddToCartBtn) {
            try{
              await axios.post(`${API_URL}/api/users/68073e3381a7d2e650b55871/cart`, {
                productId: prodId
              })
              setMessage("Added To Cart")
              setCart(prev => [...prev, {product: product, quantity: 1}])
            }catch(error){
              setMessage("Product Already Exists in Cart")
            }
            
          } else {
            setMessage("Loading...")
            await axios.delete(`${API_URL}/api/users/68073e3381a7d2e650b55871/cart/${prodId}`)
            setMessage("Deleted from Cart")
      
            setCart(prevCart => prevCart.filter(item => item.product._id !== product._id) )
          }
        } catch(error){
          setMessage(error.message)
        }
    }

    // Handles all filters.
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

        setFilteredProducts(filtered)
    }

    useEffect(() => {
         fetchProducts()
         fetchCategories()
         fetchCart()
         fetchWishList()
    }, [])

    useEffect(() => {
        handlefilters()
    }, [products, filter, searchInstruments])

    useEffect(() => {
        if(message.length > 0 && message !== "Loading..."){
            setTimeout(() => {
                setMessage("")
            }, 3000)
        }
    }, [message])

    useEffect(() => {
        if (categoryFromURL && categories.length > 0 && products.length > 0) {
          const validCategory = categories.some(cat => cat.name === categoryFromURL);
          if (validCategory) {
            setFilter(prev => ({
              ...prev, 
              categories: [categoryFromURL],
            }));
          }
        }
      }, [categoryFromURL, categories, products]);

    return (
        <div>
            <Header setSearchInstruments={setSearchInstruments} cartValue={cartValue} wishListValue={wishListValue} isListingPage= {true} />
            <div className="container">
            {message === "" ? (
                            <div className="py-4"></div>) : (
                                <div className="alert alert-secondary container mt-2" role="alert">
                            {message}
                            </div>
                            )}
                

                <div className="row">
                    {
                        products.length > 0 && (
                            <div className="col-md-2 py-4">
                        <div className="d-md-none mb-2">
                            <button className="btn btn-secondary w-100"  data-bs-toggle="collapse"
                            data-bs-target="#mobileFilter"
                            aria-expanded="false"
                            aria-controls="mobileFilter" >Toggle Filters</button>
                        </div>
                        <div className="collapse d-md-block" id="mobileFilter">
                         <FilterComponent filter={filter} setFilter={setFilter} categories={categories} />

                        </div>
                      
                    </div>
                        )
                    }
                    <div className="col-md-10 py-4">
                        {
                            (filteredProducts?.length > 0 && products) && (
                                <div className="products-header">
                                    <h4 className="text-center">Showing All Products</h4>
                               </div>
                            )
                        }

                        <div className="row">
                            {
                                (filteredProducts?.length  > 0 && products) ? (

                                    filteredProducts?.map(product => {
                                        const isProductInWishList = wishList?.some(item => item._id === product?._id)
                                        return (
                                            <div key={product._id} className="col-md-3 py-2 px-2 d-flex">
                                            <ProductListingCard product={product} handleAddToCart={handleAddToCart} handleWishList={handleWishList} isProductInWishList={isProductInWishList} />
                                        </div>
                                        )
                                        
                                    })
                                ) : <div className="d-flex justify-content-center align-items-center">
                                    {
                                        message === "Loading..." ? "" : <p>No Products Found</p>
                                    }
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