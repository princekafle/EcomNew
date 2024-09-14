import React, { useEffect, useState } from 'react';
import './Card.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Card = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {id} = useParams(); // Get the product ID from URL params

  useEffect(() => {
    if (id) { // Check if ID is available
      axios.get(`http://127.0.0.1:8000/products/${id}`)
        .then(response => {
          setProduct(response.data);
          // setLoading(false);
        })
        .catch(error => {
          console.error('There was a problem with the request:', error);
          setError('Failed to fetch product data.');
          // setLoading(false);
        });
    }
  }, [id]); // Dependency array to re-fetch if `id` changes

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="card max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg card-image" src={`${product.image}`} alt={product.name} />
      <div className="p-5">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
        <div className="price">
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">${product.new_price}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">${product.old_price}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
