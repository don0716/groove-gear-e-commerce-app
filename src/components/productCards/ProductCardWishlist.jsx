import RatingComponent from "../RatingComponent"
import { Link } from "react-router-dom"
import axios from "axios"

const ProductCardWishlist = (props) => {
  const {product, setCart, wishList, setWishList, setMessage} = props
  const API_URL = process.env.REACT_APP_BACKEND_URL
  const isProductInWishList = wishList?.some(item => item._id === product._id)

  const handleWishList = async (prodId) => {
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
  
  return (
    <div>
    {
                      ( product) && (

                        <div className="card text-center h-100 d-flex flex-column" >
                    <div>

                      <Link to={`/products/${product._id}`}>
                      
                      <img src={`${product.imageUrl}`} className="card-img-top img-fluid pt-5"  alt={`${product.name} Image`} />
                      </Link>

                    </div>
                    <div className="d-flex flex-column">
                      <div className="py-2">
                      <RatingComponent isDisplay={true} ratingValue={product.rating} />
                      </div>
                        <button onClick={() => handleWishList(product._id)} className="btn btn-warning my-2 mx-2">{isProductInWishList ? "Remove From WishList" : "Add To WishList"}</button>
                        <button onClick={() => {
                          handleAddToCart(product._id, true)
                          handleWishList(product._id)
                        }} className="btn btn-primary px-5 my-2 mx-2 mt-auto">{"Move to Cart"}</button>
                    </div>
                    
                
                  </div>
                        
                      )
                    }
</div>
  )
}

export default ProductCardWishlist