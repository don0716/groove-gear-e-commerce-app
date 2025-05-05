import { Link } from "react-router-dom"

const Header = ({setSearchInstruments, cartValue, wishListValue, isListingPage = false }) => {
    return (
        <div className="bg-dark text-white py-4">
            <div className="container">
               <div className="row d-flex align-items-center">
                    <div className="col-md-4">
                        <Link to={`/`} style={{textDecoration: "none", color: "white"}}><h2>Groove Gear</h2></Link>
                    </div>
                    <div className="col-md-4 my-3">
                        {isListingPage && <input onChange={(e) => setSearchInstruments(e.target.value)} type="text" placeholder="Search Instruments" className="form-control" />}
                    </div>
                    <div className="col-md-4 ">
                    <Link className="position-relative text-light" style={{textDecoration: "none"}} to={`/`}>Home</Link>

                        <Link className="position-relative text-light mx-2" style={{textDecoration: "none"}} to={`/products`}>Products</Link>

                        <Link className="mx-2 position-relative text-light" to={`/wishlist`} style={{textDecoration: "none",}} ><i className="bi bi-heart  "></i> <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-danger">{wishListValue}<span className="visually-hidden"></span></span> </Link>
                        
                        
                        <Link className="mx-3 position-relative text-light" to={`/cart`} style={{textDecoration: "none"}} ><i className="bi bi-cart"></i> Cart<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-danger">{cartValue}<span className="visually-hidden"></span></span></Link>

                        <Link className="px-2  position-relative text-white" to={`/useraccount`} style={{textDecoration: "none"}} ><i className="bi bi-person-circle"></i> User</Link>
                    </div>
                    
               </div>
            </div>
        </div>
    )
}

export default Header