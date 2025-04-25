import { Link } from "react-router-dom"

const Header = ({setSearchInstruments, cartValue, wishListValue, isListingPage = false }) => {
    return (
        <div className="bg-dark text-white py-4">
            <div className="container">
               <div className="row d-flex align-items-center">
                    <div className="col-md-4">
                        <h2>Groove Gear</h2>
                    </div>
                    <div className="col-md-4">
                        {isListingPage && <input onChange={(e) => setSearchInstruments(e.target.value)} type="text" placeholder="Search Instruments" className="form-control" />}
                    </div>
                    <div className="col-md-4">
                        <Link className="px-2" style={{textDecoration: "none"}} to={`/`}>Home</Link>
                        
                        <Link className="px-2" to={`/wishlist`} style={{textDecoration: "none"}} >WishList<span className="badge text-bg-danger m-1">{wishListValue}</span></Link>
                        <Link className="px-2" to={`/cart`} style={{textDecoration: "none"}} >Cart<span className="badge text-bg-danger m-1">{cartValue}</span></Link>
                        <Link className="px-2" to={`/useraccount`} style={{textDecoration: "none"}} >Account</Link>
                    </div>
                    
               </div>
            </div>
        </div>
    )
}

export default Header