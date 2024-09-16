
import React, { useEffect, useState } from 'react';
import Card from '../Card/Card'
import axios from 'axios';
import './popular.css'


const Popular = () => {
  const [product,setProduct]=useState([])

  //  This state variable "products" will hold the array of products fetched from the API.
  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/products/`)

    //  Sends a GET request to the Fake Store API to fetch products data.
    .then(res=>(
     setProduct(res.data)))
     // Updates the products state with the data received from the API response.
     .catch(err=> console.log(err))
  },[])

  return (
    <>
    <div className="popular">
    <h1>Popular Items</h1>
    <hr />
    <div className="popular-item">
        
    {product.map((item,i)=>
  <Card data = {item} key = {i}/>
)}

    </div>
    </div>
    </>
  )
}

export default Popular