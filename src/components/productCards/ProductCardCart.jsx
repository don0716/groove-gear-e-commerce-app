import RatingComponent from "../RatingComponent"
import axios from "axios"

const ProductCardCart = (props) => {
  const {product, setCart, wishList, setWishList, quantity=0, setMessage} = props
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

  const handleIncrement = async (prodId, qty) => {
    try{
      setMessage("Loading...")
      const res = await axios.patch(`${API_URL}/api/users/68073e3381a7d2e650b55871/cart/increase/${prodId}`, {
        quantity: qty
      })
      setMessage("Incremented")
      setCart(res.data.cart)
    }catch(error){
      setMessage("Max Quantity is 10!")
    }
  }

  const handleDecrement = async (prodId, qty) => {
    try{
      setMessage("Loading...")
      const res = await axios.patch(`${API_URL}/api/users/68073e3381a7d2e650b55871/cart/decrease/${prodId}`, {
        quantity: qty
      })
      setMessage("Decremented")
      setCart(res.data.cart)
    }catch(error){
      setMessage("Quantity Cannot be less than 1")
    }
  }



    return (
      <div>
        {
                          (product) && (
                            <div className="card text-center h-100 d-flex flex-column m-2" >
                        <div className="position-relative">
                        <div className="position-absolute top-0 end-0 p-4">
                            <span onClick={() => handleDecrement(product._id, 1)} className="btn btn-outline-secondary btn-sm py-0">-</span>
                            <span className="btn btn-light btn-sm py-0">{quantity}</span>
                            <span onClick={() => handleIncrement(product._id, 1)}  className="btn btn-outline-secondary btn-sm py-0">+</span>
                        </div>

                          
                          <img src={`${product.imageUrl}`} className="card-img-top img-fluid pt-5" style={{objectFit: "contain"}}  alt={`${product.name} Image`} />

                        </div>
                        <div className="d-flex flex-column">
                          <div className="py-2">
                          <RatingComponent isDisplay={true} ratingValue={product.rating} />
                          </div>
                            <h5>₹ {product.price}</h5>
                            <p>{product.name}</p>
                            <button onClick={() => handleAddToCart(product._id)} className="btn btn-warning my-2 mx-2">Remove From Cart</button>
                            <button onClick={() => {
                              handleWishList(product._id)
                              handleAddToCart(product._id)
                            }} className="btn btn-primary px-5 my-2 mx-2 mt-auto">{"Move to Wishlist"}</button>
                        </div>
                        
                    
                      </div>
                          )
                        }
    </div>
    )
}

export default ProductCardCart