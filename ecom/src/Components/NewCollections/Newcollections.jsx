
import React, { useEffect, useState } from 'react';
import './Newcollections.css'
import Card from '../Card/Card'
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Newcollections = () => {
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
    <div className="new-collections">
    <h1>New Collections</h1>
    <hr />
    <div className="collections">
        
    {product.map((item,i)=>
  <Card data = {item} key = {i}/>
)}

    </div>
    </div>
    </>
  )
}

export default Newcollections