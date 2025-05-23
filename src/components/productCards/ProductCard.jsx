import RatingComponent from "../RatingComponent"
import { Link } from "react-router-dom"
import axios from "axios"

const ProductCard = (props) => {
  const {product, setCart, wishList, setWishList, setMessage} = props
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const isProductInWishList = wishList?.some(item => item._id === product._id)

  const handleWishList = async (prodId) => {
    if(!isProductInWishList){
      try{
        setMessage("Loading...")
        await axios.post(`${backendUrl}/api/users/68073e3381a7d2e650b55871/wishlist`,{
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
        await axios.delete(`${backendUrl}/api/users/68073e3381a7d2e650b55871/wishlist/${prodId}`)

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
          await axios.post(`${backendUrl}/api/users/68073e3381a7d2e650b55871/cart`, {
            productId: prodId
          })
          setMessage("Added To Cart")
          setCart(prev => [...prev, {product: product, quantity: 1}])
        }catch(error){
          setMessage("Product Already Exists in Cart")
        }
        
      } else {
        setMessage("Loading...")
        await axios.delete(`${backendUrl}/api/users/68073e3381a7d2e650b55871/cart/${prodId}`)
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
                          (product) && (
                            <div className="card text-center h-100 d-flex flex-column"  >
                        <div className="position-relative" >
                           <div onClick={() => handleWishList(product._id)} style={{cursor: "pointer"}} className="position-absolute top-0 end-0 py-1 px-2">
                            {isProductInWishList ? <i className='bi bi-heart-fill text-danger'></i> : <i className='bi bi-heart'></i> }  
                           </div>
                           <div className="position-absolute top-0 start-0 py-1 px-1">
                             <RatingComponent isDisplay={true} ratingValue={product.rating} />
                           </div>

                          <Link to={`/products/${product._id}`}> 
                          <img src={`${product.imageUrl}`} className="card-img-top img-fluid pt-5" style={{objectFit: "contain"}} alt={`${product.name} Image`} />
                          </Link>
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h3 className="card-title">{product.name}</h3>
                            <p className="card-text">{product.name}</p> 
                            <p>{product?.category?.name}</p>
                            <p><strong>₹ {product.price}</strong></p>
                            <button onClick={() => handleAddToCart(product._id, true)} className="btn btn-primary px-5 mt-auto">Add to Cart </button>
                        </div>
                        
                    
                      </div>
                          ) }

                      </div>
    )
}
export default ProductCard