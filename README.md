# Groove-Gear — E-commerce App

Welcome to **Groove-Gear**, a full-stack e-commerce application built using **React JS** and **Bootstrap**. This project features a modern UI, dynamic filtering, and complete shopping workflow including cart, wishlist, checkout, and user profile functionality.

---
### Demo Link
[live demo](https://groove-gear-e-commerce-app-frontend.vercel.app/)

---
### Quick Start
```
git clone https://github.com/don0716/groove-gear-e-commerce-app.git
cd <your-repo>
npm install
npm run dev # or `npm start` / `yarn dev`
```
---
Demo Video
Walkthrough Video of the major features of App: [video link](https://www.loom.com/share/65b4d223c5bc4a46b2c94d5ff66a7341?sid=5ddee208-50c2-4e51-b788-f770a2e92086)

---

### Technologies
- React JS
- React Router
- Node JS
- Express
- MongoDB

---

## ✔ PRD Feature Checklist

###  Pages & Navigation
### Home Page
  - [x] Featured categories
  - [x] Clickable categories route to Product Listing
   #### Extra Added Features - Home Page
  - [x] Groove Gear Logo in the center of the page.
  - [x] Clickable featured products that lead to ProductDetail page of that product.
  - [x] View All Products Button that takes you to ProductListing page.


### Product Listing Page
  - [x] All products listed
  - [x] Product card with image, name, price, rating
  - [x] Add to Cart & Wishlist buttons
  - [x] Clickable product card links to product detail page

### Product Details Page
  - [x] Detailed view with image, description, price, rating, etc.
  - [x] Add to Cart & Wishlist Buttons added
  - [x] More Items you might like section below the Product Description.
        
### Cart Page
  - [x] Product list with quantity controls
  - [x] Remove from cart
  - [x] Move to wishlist
  - [x] Place Order button which takes you to checkout page with order summary only if products exist in cart and if the address is selected.

### Checkout & Order
- [x] View order summary
- [x] Back to cart button that takes you back to cart page.
- [x] Show "Order Placed Successfully" message on clicking checkout.
- [x] Cart is cleared in backend once the order is placed successfully.


### Wishlist Page
  - [x] View saved items
  - [x] Move item to cart.
  - [x] Remove from wishlist.

  #### Added Features - Wishlist Page
  - [x] Displays "No Items Added in wishList if wishlist is empty"
  - [x] If item already exists in cart, a message is displayed "Item already Exists in cart" and then deletes the item from wishList.

  
### User Profile Page
  - [x] View user details
  - [x] Display addresses and profile info

#### Address Management
- [x] Add new address, where user can add address with required inputs. Add Address will not work if all inputs are not filled.
- [x] Edit existing address
- [x] Delete address
- [x] Set default delivery address
- [x] Clears the input fields if the Address is added successfully to the backend.

---

###  Filters & Sorting
- [x] Category Filter (checkbox)
- [x] Rating Filter (slider)
- [x] Sort by Price (radio buttons)
  - [x] Low to High
  - [x] High to Low
- [x] Clear All Filters

---

###  Search
- [x] Search bar in navbar
- [x] Search filters the product list dynamically
- [x] Seach is disabled in all other pages except productListing page.

---

###  UX Enhancements
- [x] Loading messages (on product/user data fetch)
- [x] Alerts / Toasts:
  - [x] Add to Cart
  - [x] Remove from Cart
  - [x] Wishlist operations
  - [x] Address updates
  - [x] Order placed

---

##  Tech Stack

| Technology     | Usage                     |
|----------------|---------------------------|
| React JS       | Frontend framework        |
| Bootstrap      | UI styling and layout     |
| React Router   | Client-side routing       |
| Axios          | API calls                 |
| Node.js        | Backend                   |
| Express.js     | Server                    |
| MongoDB        | Database                  |

---

##  Future Features

- [ ] Authentication (Login / Signup)
- [ ] Payment Gateway Integration
- [ ] Admin Panel for Products
- [ ] Reviews & Ratings by Users
- [ ] Redux toolkit for state management.

---
API Reference
[Github Link to API Reference readme of Groove Gear Backend](https://github.com/don0716/groove-gear-ecommerce-backend/tree/main#readme) <br>
[BACKEND CODE LINK](https://github.com/don0716/groove-gear-ecommerce-backend/tree/main)

---

## Contact
For bugs or feature request, please reach out to donmonteiro16@gmail.com
---

