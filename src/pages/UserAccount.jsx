import Header from "../components/Header"
import axios from "axios"
import { useState, useEffect } from "react"

const UserAccount = () => {
    const [cart, setCart] = useState([])
    const [wishList, setWishList] = useState([])
    const [userData, setUserData] = useState([])
    const [message, setMessage] = useState("")
    const [addressFormData, setAddressFormData] = useState({
        name: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        phone: ""
    })
    const API_URL = process.env.REACT_APP_BACKEND_URL
    const cartValue = cart?.reduce((acc, curr) => curr.quantity + acc, 0 )
    const user = userData?.data?.find(user => user.name === "Donovan Monteiro")

    const fetchUsers = async  () => {
        setMessage("Loading...")
        try{
            const res = await axios.get(`${API_URL}/api/users`)
            setUserData(res.data)
            setMessage("")

        }catch(error){
            setMessage("Failed to get user Data")
        }
    }
    
    

const fetchCart = async () => {
        try{
            const res = await axios.get(`${API_URL}/api/users/68073e3381a7d2e650b55871/cart`)
            setCart(res.data.cartItems)
        }catch(error){
            setMessage("Error!")
        }
    }

    const fetchWishList = async () =>{
        try{
            const res = await axios.get(`${API_URL}/api/users/68073e3381a7d2e650b55871/wishList`)
            setWishList(res.data.wishList)
        } catch(error){
            setMessage("Error")
        }
    }

    const handleDefaultAddress = async (addressId) => {
        setMessage("Setting Default Address...")
        try{
            await axios.patch(`${API_URL}/api/users/68073e3381a7d2e650b55871/default-address`, {
                addressId
            })
            fetchUsers()
            setMessage("Changed Default Address!")

        }catch(error) {
            setMessage("Some Error Occured!")
        }
    }

    const handleAddressInput = (e) => {
        const {name, value} = e.target

        setAddressFormData(prev => ({
            ...prev,
            [name]: value
        }))

    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setMessage("Loading...")
        try{
            const res = await axios.post(`${API_URL}/api/users/68073e3381a7d2e650b55871/address`, 
                addressFormData)
            console.log(res.data)
            setAddressFormData({
                name: "",
                street: "",
                city: "",
                state: "",
                pincode: "",
                phone: ""
            })
            setMessage("Address Added Successfully!")
            fetchUsers()
            
        }catch(error){
            setMessage("Failed to Add Address!")
        }
    }

    const handleDeleteAddress = async (addressId) => {
        setMessage("Loading...")
        try{
            await axios.delete(`${API_URL}/api/users/68073e3381a7d2e650b55871/address/${addressId}`)
            fetchUsers()
            setMessage("Deleted Address Successfully!")

        }catch(error){
            setMessage("Failed to Delete Address!")
        }

    }

    useEffect(() => {
        fetchCart()
        fetchWishList()
        fetchUsers()
    }, [])

    useEffect(() => {
        if(message.length > 0 || message !== "Loading...") {
            setTimeout(() => {
                setMessage("")
            }, 2000)
        }
    }, [message])


    return (
        <div>
            <Header cartValue={cartValue} wishListValue={wishList?.length} />
            <div className="container  py-2"> 
            <h2 className="text-center">User Account</h2>

            {
                    message === "" ? (
                        
                            <div className="py-4"></div>
                        
                    ) : (
                        <div className="alert alert-secondary container" role="alert">
                    {message}
                </div>
                    )
                }

            <div className="row">
                <div className="col-md-6">
                    {
                        user ? (
                            <div className="card">

                                <div className="card-body">
                                    <h5 className="text-center">User Details</h5>
                                    <p><strong>Name: </strong>{user.name}</p>
                                    <p><strong>Email: </strong>{user.email}</p>
                                    <hr />

                                    <div><strong>Addresses: </strong> 
                                    {user.addresses.length === 0 && <p className="text-center" style={{color: "red"}} >No Addresses Found. Please an Address.</p>}
                                      <ul>
                                      {user.addresses.map(add => (
                                        <li key={add._id}>
                                            
                                            
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                <p>{add.name} {user.defaultAddressId === add._id && (
                                                <span className="badge bg-success">Default</span>
                                            )} </p>
                                            <p>Phone: {add.phone} | {add.street}, {add.state} | pincode: {add.pincode}</p>
                                            <button onClick={() => handleDefaultAddress(add._id) } className={`btn btn-primary btn-sm ${user.defaultAddressId === add._id && "disabled"} `}>Make Default Address</button>
                                                </div>
                                                <div>
                                                   <div>
                                                    <button onClick={() => handleDeleteAddress(add._id)} className="btn btn-danger btn-sm m-2">Delete</button>
                                                   </div>

                                            </div>
                                            </div>
                                            
                                            <hr />
                                        </li>
                                      ))}
                                      </ul>
                                     </div>

                                </div>
                                
                            </div>
                        ) : "Login To Get the user data."
                    }
                </div>
                <div className="col-md-6 my-2">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="text-center">Add Address</h5>
                        <form onSubmit={handleFormSubmit}>
                        <label htmlFor="" className="form-label">Name: </label>
                        <input required value={addressFormData.name} name="name" type="text" className="form-control" onChange={handleAddressInput} />
                        <label htmlFor="" className="form-label" >Street: </label>
                        <input required value={addressFormData.street} name="street" onChange={handleAddressInput}  type="text" className="form-control" />
                        <label htmlFor="" className="form-label">State: </label>
                        <input required value={addressFormData.state} name="state" onChange={handleAddressInput}  type="text" className="form-control" />

                        <label htmlFor="" className="form-label">City: </label>
                        <input required value={addressFormData.city} name="city" onChange={handleAddressInput}  type="text" className="form-control" />
                        <label htmlFor="" className="form-label">Pincode: </label>
                        <input required value={addressFormData.pincode} name="pincode" onChange={handleAddressInput}  type="text" className="form-control" />
                        <label htmlFor="" className="form-label">Phone: </label>
                        <input required value={addressFormData.phone} name="phone" onChange={handleAddressInput}  type="text" className="form-control" />
                        <button type="submit" className="btn btn-primary mt-2">Add Address</button>
                    </form>
                        </div>
                    </div>
                </div>
            </div>




        </div>
        </div>
    )
}

export default UserAccount