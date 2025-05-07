import RatingComponent from "../RatingComponent"
import { Link } from "react-router-dom"

const ProductListingCard = (props) => {
    const {product, handleAddToCart, handleWishList, isProductInWishList} = props

   return (
    <div>
         {
                          (product) && (
                            <div className="card text-center h-100 d-flex flex-column"  >
                        <div className="position-relative" >
                           <div onClick={() => handleWishList(product._id, isProductInWishList)} style={{cursor: "pointer"}} className="position-absolute top-0 end-0 py-1 px-2">
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

export default ProductListingCard