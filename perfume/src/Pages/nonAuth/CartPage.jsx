import React, { useContext } from "react";
import { CartContext } from "../../context/CreateContext";
import NavigationBar from '../common/nav-bar/NavigationBar';
import { useNavigate } from "react-router-dom";


function CartPage() {
  const { cart, removeFromCart, clearCart,decreaseQty,increaseQty } = useContext(CartContext);


  const navigate = useNavigate();

  return (
    
    <div className="max-w-5xl mx-auto px-6 py-10 mt-10">
      <NavigationBar />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-white shadow-md rounded-lg p-4"
              >
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                  <p className="text-pink-600 font-bold">₹{item.price}</p>
                  <div className="flex items-center gap-3 mt-2">
  <button
    onClick={() => decreaseQty(item.id)}
    className="px-2 py-1 bg-gray-200 rounded"
  >
    -
  </button>
  <span className="px-3">{item.qty || 1}</span>
  <button
    onClick={() => increaseQty(item.id)}
    className="px-2 py-1 bg-gray-200 rounded"
  >
    +
  </button>
</div>

          </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Actions */}
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={clearCart}
              className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
            >
              Clear Cart
            </button>
            <button 
            onClick={()=>navigate('/checkout')}
            className="px-5 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
