import { useEffect, useState } from "react"
import RatingComponent from "./RatingComponent"
import { Link } from "react-router-dom"
import axios from "axios"

const ProductCard = ({product, cart, setCart, isDetailPage = false, isWishListPage = false, isListingPage = false, isCartPage = false, wishList, setWishList, quantity=0, setMessage}) => {

  const isProductInWishList = wishList.some(item => item._id === product._id)
  const isProdInCart = cart.some(item => item.product._id === product._id)


  const handleWishList = async (prodId) => {
    if(!isProductInWishList){
      // Add to wishList
      try{
        setMessage("")
        const res = await axios.post(`https://groove-gear-ecommerce-backend.vercel.app/api/users/68073e3381a7d2e650b55871/wishlist`,{
          productId: prodId
        } )
        setWishList(prev => [...prev, product])
        setMessage("Added to WishList!")
        
      }catch(error) {
        setMessage("Failed to Add To WishList!")
        console.log(error.message)
      }
    } else {
      try{
        setMessage("")
        const res = await axios.delete(`https://groove-gear-ecommerce-backend.vercel.app/api/users/68073e3381a7d2e650b55871/wishlist/${prodId}`)

        setMessage("Successfully Deleted from WishList!")
       
        setWishList(prev => prev.filter(item => item._id !== prodId))
        
      }catch(error) {
        setMessage("Failed to Delete from Wishlist")
        console.log(error.message)
      }
    }
    
  }

  const handleAddToCart = async (prodId, isAddToCartBtn = false) => {
    
    try{
      setMessage("")
      if(isAddToCartBtn) {
        await axios.post(`https://groove-gear-ecommerce-backend.vercel.app/api/users/68073e3381a7d2e650b55871/cart`, {
          productId: prodId
        })
        setMessage("Added To Cart")

          setCart(prev => [...prev, {product: product, quantity: 1}])
  
        
      } else {
        // Quantity increase or decrease or delete altogether.
        
        await axios.delete(`https://groove-gear-ecommerce-backend.vercel.app/api/users/68073e3381a7d2e650b55871/cart/${prodId}`)
        setMessage("Deleted from Cart")
  
        setCart(prevCart => prevCart.filter(item => item.product._id !== product._id) )
  
      }
    } catch(error){
      setMessage("Failed to delete from Cart")
      
      console.log(error)
    }

  }

    return (
                      <div>
                        {
                          isListingPage && (
                            <div className="card text-center flex-fill" >
                        <div className="position-relative">
                           <div onClick={() => handleWishList(product._id)} style={{cursor: "pointer"}} className="position-absolute top-0 end-0 py-1 px-2">
                            {isProductInWishList ? <i className='bi bi-heart-fill text-danger'></i> : <i className='bi bi-heart'></i> }  
                           </div>
                           <div className="position-absolute top-0 start-0 py-1 px-1">
                             <RatingComponent isDisplay={true} ratingValue={product.rating} />
                           </div>

                          <Link to={`/products/${product._id}`} > 
                          <img src={`${product.imageUrl}`} className="card-img-top img-fluid pt-5" style={{objectFit: "contain"}} alt={`${product.name} Image`} />
                          </Link>
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h3 className="card-title">{product.name}</h3>
                            <p className="card-text">{product.name}</p> 
                            <p>{product.category.name}</p>
                            <p><strong>₹ {product.price}</strong></p>
                            <button onClick={() => handleAddToCart(product._id, true)} className="btn btn-primary px-5 mt-auto">Add to Cart</button>
                        </div>
                        
                    
                      </div>
                          ) }
                          
                         { isDetailPage && (
                            <div className="text-center flex-fill" >
                        <div>

                          <img src={`${product.imageUrl}`} className="img-fluid pt-5"  alt={`${product.name} Image`} />

                        </div>
                        <div className="d-flex flex-column">
                          <p className="py-2">
                          <RatingComponent isDisplay={true} ratingValue={product.rating} />
                          </p>
                            <button onClick={() => handleWishList(product._id)} className="btn btn-warning my-2">{isProductInWishList ? "Remove From WishList" : "Add To WishList"}</button>
                            <button onClick={() => handleAddToCart()} className="btn btn-primary px-5 mt-auto">Add to Cart</button>
                        </div>
                        
                    
                      </div>
                          ) 
                        }

                        {
                          (isWishListPage) && (

                            <div className="card text-center flex-fill m-2" >
                        <div>

                          <img src={`${product.imageUrl}`} className="card-img-top img-fluid pt-5"  alt={`${product.name} Image`} />

                        </div>
                        <div className="d-flex flex-column">
                          <p className="py-2">
                          <RatingComponent isDisplay={true} ratingValue={product.rating} />
                          </p>
                            <button onClick={() => handleWishList(product._id)} className="btn btn-warning my-2 mx-2">{isProductInWishList ? "Remove From WishList" : "Add To WishList"}</button>
                            <button onClick={() => handleAddToCart(product._id, true)} className="btn btn-primary px-5 my-2 mx-2 mt-auto">{isProdInCart ? "Add More To Cart" : "Move to Cart"}</button>
                        </div>
                        
                    
                      </div>
                            
                          )
                        }

{
                          isCartPage && (
                            <div className="card text-center flex-fill m-2" >
                        <div className="position-relative">
                        <div className="position-absolute top-0 end-0 p-4">
                        <span className="badge text-bg-danger">{quantity}</span>
                        </div>

                          <img src={`${product.imageUrl}`} className="card-img-top img-fluid pt-5"  alt={`${product.name} Image`} />

                        </div>
                        <div className="d-flex flex-column">
                          <div className="py-2">
                          <RatingComponent isDisplay={true} ratingValue={product.rating} />
                          </div>
                            <h5>₹ {product.price}</h5>
                            <button onClick={() => handleAddToCart(product._id)} className="btn btn-warning my-2 mx-2">Remove From Cart</button>
                            <button onClick={() => handleWishList(product._id)} className="btn btn-primary px-5 my-2 mx-2 mt-auto">{isProductInWishList ? "Remove from WishList" : "Move to Wishlist"}</button>
                        </div>
                        
                    
                      </div>
                          )
                        }




                      </div>
    )
}
export default ProductCard