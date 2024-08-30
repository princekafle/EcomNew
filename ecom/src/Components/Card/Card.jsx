import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'

////the function receives 'noop' as a parameter function
// and
// note : shopcontext provider le app lai wrap gareko xa so app vitra ko sabai thau ma hamile shopcontext ko context value yaniki all_product lai noop ko rupma pathayeko le hamile noop ko rupma access garyau thats it .

const Card = (noop) => {
  return (
    <>
    

<div className="card max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
    <Link to="#">
        <img className="rounded-t-lg card-image" src={noop.image} alt={noop.name} />
    </Link>
    <div className="p-5">
        <Link to="#">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{noop.name}</h5>
        </Link>
        <div className="price">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">${noop.new_price}</p>
         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">${noop.old_price}</p>

         </div>
         <Link to={`/products/${noop.id}`}>
  <button
    className="buttton btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    onClick={() => window.scrollTo(0, 0)}
  >
    View Details
  </button>
</Link>


        
        
    </div>
</div>

    </>
  )
}

export default Card