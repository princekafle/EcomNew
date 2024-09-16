import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext'

const Checkout = () => {
  const { cartItem, all_product, getTotalcartamount } = useContext(ShopContext);

  // Calculate total cost
  const totalCost = getTotalcartamount();

  // Function to get product details for the cart items
  const getOrderDetails = () => {
    // Retrieves an array of the keys (i.e., product IDs) from the cartItem object and Iterates over each product ID (itemId) in the cart.
    return Object.keys(cartItem).map((itemId) => {
      const quantity = cartItem[itemId];
      //Gets the quantity of the current item from the cartItem object.
      if (quantity > 0) {
        //Checks if the quantity of the item is greater than zero. If so, it continues to process the item.
        const product = all_product.find((product) => product.id === Number(itemId));
        // api bata lyako all_product ko id ra cart ma vako item ko id equals vayeko product lai matra product ma stor garxa
        return product ? {
          name: product.name,
          quantity,
          price: product.new_price,
        } : null;
        // If a  condition matching product is found, it creates an object with the product's name, quantity, size, and price. If no matching product is found, it returns null.

      }
      return null;
    }).filter(item => item !== null);
    // cart item ma nulll vako product lai filter garxa ra dekhaudaina 
  };

  const orderDetails = getOrderDetails();

  return (
    <div className="font-sans bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-b-[3px] border-gray-800 pb-1">Checkout</h2>
        </div>

        {/* Order Details Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800">Order Details</h3>
          <div className="mt-4">
            {orderDetails.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2">Product Name</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Size</th>
                    <th className="border p-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.map((item, index) => (
                    <tr key={index}>
                      <td className="border p-2">{item.name}</td>
                      <td className="border p-2">{item.quantity}</td>
                      <td className="border p-2">{item.size}</td>
                      <td className="border p-2">{item.price * item.quantity}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="3" className="border p-2 text-right font-bold">Total Cost:</td>
                    <td className="border p-2 font-bold">{totalCost}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>No items in the cart.</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-12">
          <div>
            <h3 className="text-3xl font-bold text-gray-300">01</h3>
            <h3 className="text-xl font-bold text-gray-800 mt-1">Personal Details</h3>
          </div>

          <div className="md:col-span-2">
            <form>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input type="text" placeholder="First name"
                    className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <input type="text" placeholder="Last name"
                    className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <input type="email" placeholder="Email address"
                    className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <input type="number" placeholder="Phone number"
                    className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-12">
          <div>
            <h3 className="text-3xl font-bold text-gray-300">02</h3>
            <h3 className="text-xl font-bold text-gray-800 mt-1">Shopping Address</h3>
          </div>

          <div className="md:col-span-2">
            <form>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input type="text" placeholder="Street address"
                    className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <input type="text" placeholder="City"
                    className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <input type="text" placeholder="State"
                    className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <input type="number" placeholder="Zip Code"
                    className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-12">
          <div>
            <h3 className="text-3xl font-bold text-gray-300">03</h3>
            <h3 className="text-xl font-bold text-gray-800 mt-1">Payment method</h3>
          </div>

          <div className="md:col-span-2">
            <select name="" id="" className='mt-5'>
              <option value="">Esewa</option>
              <option value="">Cash on delivery</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-4 mt-12">
          <button type="button"
            className="px-6 py-3 text-sm font-semibold tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700">Proceed now</button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
