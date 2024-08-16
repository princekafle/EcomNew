import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Route, not Routes
import Shop from './Pages/Shop';
import Products from './Pages/Products';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Shopcategory from './Pages/Shopcategory';
import Productdetails from './Pages/Productdetails';

const MyRoute = () => {
  return (
    <>
     <Router>
                
                <Routes>
                    <Route path="/" element= {<Shop/>} />
                    <Route path="/mens" element={<Shopcategory />} />
                    <Route path="/womens" element= {<Shopcategory />} />
                    <Route path="/kids" element= {<Shopcategory />} />
                    <Route path="/product" element={<Products />} />
                    <Route path="/productdetails/:productId" element= {<Productdetails />} />
                    <Route path="/cart" element= {<Cart />} />
                    <Route path="/login" element= {<LoginSignup />} />
                </Routes>
            </Router>
    </>
  )
}

export default MyRoute