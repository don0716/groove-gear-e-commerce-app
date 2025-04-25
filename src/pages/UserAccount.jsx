import Header from "../components/Header"
import axios from "axios"
import { useState, useEffect } from "react"

const UserAccount = () => {
    const [cart, setCart] = useState([])
    const [wishList, setWishList] = useState([])
    const [userData, setUserData] = useState([])
    // const [defaultAddress, setDefaultAddress] = useState([])
    const [message, setMessage] = useState("")
    const [addressFormData, setAddressFormData] = useState({
        name: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        phone: ""
    })
    const cartValue = cart.reduce((acc, curr) => curr.quantity + acc, 0 )
    // console.log("userData:: ", userData.data)

    // Do for one User for now.
    const user = userData.data?.find(user => user.name === "Donovan Monteiro")
    console.log("user:: ", user)

    const defaultAddress = user?.addresses?.find(add => add._id === user.defaultAddressId)
    console.log("Default Addrewss:: ", defaultAddress)



    const fetchUsers = async  () => {
        try{
            const res = await axios.get(`https://groove-gear-ecommerce-backend.vercel.app/api/users`)
            setUserData(res.data)

        }catch(error){
            console.log(error)
        }
    }
    
    

const fetchCart = async () => {
        try{

            const res = await axios.get(`https://groove-gear-ecommerce-backend.vercel.app/api/users/68073e3381a7d2e650b55871/cart`)
            // console.log(res.data)
            setCart(res.data.cartItems)

        }catch(error){
            console.log(error)
        }
    }

    const fetchWishList = async () =>{
        try{
            const res = await axios.get(`https://groove-gear-ecommerce-backend.vercel.app/api/users/68073e3381a7d2e650b55871/wishList`)
            setWishList(res.data.wishList)
        } catch(error){
            console.log(error)
        }
    }

    const handleDefaultAddress = async (addressId) => {
        console.log("Address:: ", addressId)
        setMessage("Setting Default Address...")
        try{
            const res = await axios.patch(`https://groove-gear-ecommerce-backend.vercel.app/api/users/68073e3381a7d2e650b55871/default-address`, {
                addressId
            })
            fetchUsers()
            setMessage("Changed Default Address!")
            

        }catch(error) {
            setMessage("Some Error Occured!")
            console.log(error)
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
        console.log(addressFormData)
        setMessage("Loading...")
        try{
            const res = await axios.post(`https://groove-gear-ecommerce-backend.vercel.app/api/users/68073e3381a7d2e650b55871/address`, 
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
            console.log(error)
        }
    }

    const handleDeleteAddress = async (addressId) => {
        setMessage("Loading...")
        try{
            const res = await axios.delete(`https://groove-gear-ecommerce-backend.vercel.app/api/users/68073e3381a7d2e650b55871/address/${addressId}`)
            fetchUsers()
            setMessage("Deleted Address Successfully!")

        }catch(error){
            setMessage("Failed to Delete Address!")
            console.log(error)
        }

    }

    useEffect(() => {
        fetchCart()
        fetchWishList()
        fetchUsers()
    }, [])

    useEffect(() => {
        if(message.length > 0) {
            setTimeout(() => {
                setMessage("")
            }, 2000)
        }

    }, [message])


    return (
        <div>
            <Header cartValue={cartValue} wishListValue={wishList.length} />
            <div className="container  py-2"> 
            <h2 className="text-center">User Account</h2>

            {
                    message === "" ? (
                        
                            <div className="py-4"></div>
                        
                    ) : (
                        <div class="alert alert-secondary container" role="alert">
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
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="text-center">Add Address</h5>
                        <form onSubmit={handleFormSubmit}>
                        <label htmlFor="" className="form-label">Name: </label>
                        <input value={addressFormData.name} name="name" type="text" className="form-control" onChange={handleAddressInput} />
                        <label htmlFor="" className="form-label" >Street: </label>
                        <input value={addressFormData.street} name="street" onChange={handleAddressInput}  type="text" className="form-control" />
                        <label htmlFor="" className="form-label">State: </label>
                        <input value={addressFormData.state} name="state" onChange={handleAddressInput}  type="text" className="form-control" />

                        <label htmlFor="" className="form-label">City: </label>
                        <input value={addressFormData.city} name="city" onChange={handleAddressInput}  type="text" className="form-control" />
                        <label htmlFor="" className="form-label">Pincode: </label>
                        <input value={addressFormData.pincode} name="pincode" onChange={handleAddressInput}  type="text" className="form-control" />
                        <label htmlFor="" className="form-label">Phone: </label>
                        <input value={addressFormData.phone} name="phone" onChange={handleAddressInput}  type="text" className="form-control" />
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