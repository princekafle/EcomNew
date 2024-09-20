import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const { cartItem, all_product, getTotalcartamount, cartItemSizes } = useContext(ShopContext);
  const [personalDetails, setPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [addressDetails, setAddressDetails] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  // Calculate total cost
  const totalCost = getTotalcartamount();

  // Function to get product details for the cart items
  const getOrderDetails = () => {
    return Object.keys(cartItem).map((itemId) => {
      const quantity = cartItem[itemId];
      const size = cartItemSizes[itemId] || 'N/A';
      if (quantity > 0) {
        const product = all_product.find((product) => product.id === Number(itemId));
        return product ? {
          name: product.name,
          quantity,
          size,
          price: product.new_price,
        } : null;
      }
      return null;
    }).filter(item => item !== null);
  };

  const orderDetails = getOrderDetails();
  const userdata = JSON.parse(localStorage.getItem('user'));  
  const orderData = {
    user: userdata.username,
    name: `${personalDetails.firstName} ${personalDetails.lastName}`,
    email: personalDetails.email,
    phone: personalDetails.phone,
    address: addressDetails.streetAddress,
    city: addressDetails.city,
    state: addressDetails.state,
    zip_code: addressDetails.zipCode,
    payment_method: paymentMethod,
    total_cost: totalCost,
    products: orderDetails // Store all order details in an array
  };
  console.log(orderData);

  // Define the async function to handle order submission
  const handleProceed = async () => {
    try {
      const { data } = await axios.post('http://127.0.0.1:8000/api/checkout/',orderData);
      console.log(data);
  
      if (paymentMethod === 'Esewa') {
        // Redirect to eSewa payment page
        navigate('/cart'); // Modify with actual eSewa URL
      } else {
        navigate('/ordersuccess');
      }
    } catch (error) {
      console.error('Error processing order:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };
  
  return (
    <div className="font-sans bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-b-[3px] border-gray-800 pb-1">Checkout</h2>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleProceed(); }}>

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

        {/* Personal Details Section */}
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          <div>
            <h3 className="text-3xl font-bold text-gray-300">01</h3>
            <h3 className="text-xl font-bold text-gray-800 mt-1">Personal Details</h3>
          </div>

          <div className="md:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <input type="text" placeholder="First name" value={personalDetails.firstName}
                  onChange={(e) => setPersonalDetails({ ...personalDetails, firstName: e.target.value })}
                  className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
              </div>
              <div>
                <input type="text" placeholder="Last name" value={personalDetails.lastName}
                  onChange={(e) => setPersonalDetails({ ...personalDetails, lastName: e.target.value })}
                  className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
              </div>
              <div>
                <input type="email" placeholder="Email address" value={personalDetails.email}
                  onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                  className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
              </div>
              <div>
                <input type="number" placeholder="Phone number" value={personalDetails.phone}
                  onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
                  className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          <div>
            <h3 className="text-3xl font-bold text-gray-300">02</h3>
            <h3 className="text-xl font-bold text-gray-800 mt-1">Shopping Address</h3>
          </div>

          <div className="md:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <input type="text" placeholder="Street address" value={addressDetails.streetAddress}
                  onChange={(e) => setAddressDetails({ ...addressDetails, streetAddress: e.target.value })}
                  className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
              </div>
              <div>
                <input type="text" placeholder="City" value={addressDetails.city}
                  onChange={(e) => setAddressDetails({ ...addressDetails, city: e.target.value })}
                  className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
              </div>
              <div>
                <input type="text" placeholder="State" value={addressDetails.state}
                  onChange={(e) => setAddressDetails({ ...addressDetails, state: e.target.value })}
                  className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
              </div>
              <div>
                <input type="text" placeholder="Zip Code" value={addressDetails.zipCode}
                  onChange={(e) => setAddressDetails({ ...addressDetails, zipCode: e.target.value })}
                  className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold text-gray-300">03</h3>
          <h3 className="text-xl font-bold text-gray-800 mt-1">Payment Method</h3>
          <div className="flex flex-col mt-4">
            <label className="inline-flex items-center">
              <input type="radio" value="Cash" checked={paymentMethod === 'Cash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out" />
              <span className="ml-2">Cash on Delivery</span>
            </label>
            <label className="inline-flex items-center mt-2">
              <input type="radio" value="Esewa" checked={paymentMethod === 'Esewa'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out" />
              <span className="ml-2">eSewa</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-12">
          <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-md font-bold">Proceed to Payment</button>
        </div>
      </form>
    </div>
    </div>
  )};

export default Checkout;
