import React, { useEffect, useState } from 'react';
import './Css/Shopcategory.css';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Card from '../Components/Card/Card';

const Shopcategory = (props) => {
  const [products, setProducts] = useState([]);

  // Fetching product data from API
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching product data:', error));
  }, []);

  return (
    <>
      <div className="shop-category">
        <img src={props.banner} alt="" className="shopcategory-banner" />
        <div className="shopcategory-indexsort">
          <p>
            <span>Showing 1-12</span> Out of {products.length} Products
          </p>
          <div className="shopcategory-sort">
            <span>Sort By</span>
            <img src={dropdown_icon} alt="" />
          </div>
        </div>
        <div className="shopcategory-products">
          {products.map((item, i) => {
            // Checking if the product's category matches the props category
            if (props.category === item.category) {
              return (
                <Card data = {item} key = {i}/>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Shopcategory;
