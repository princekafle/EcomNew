

import React from 'react'
import { Link } from 'react-router-dom'

const Card = (props) => {
  const {image,name,new_price,old_price,id}=props.data

  return (
   <>


  <div
      class="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] mt-4">
      <div class="min-h-[256px]">
        <img src={image} class="w-full" alt={name} />
      </div>

      <div className="p-6">
          <h3 className="text-gray-800 text-xl font-bold">{name}</h3>

          {/* Price Row */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500 leading-relaxed">${new_price}</p>
            <strike>
              <p className="text-sm text-gray-500 leading-relaxed">${old_price}</p>
            </strike>
          </div>

          <Link to={`/products/${id}`}>
            <button
              type="button"
              className="mt-6 px-5 py-2.5 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Card