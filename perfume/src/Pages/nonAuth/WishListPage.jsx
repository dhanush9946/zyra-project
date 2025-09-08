import React, { useContext } from "react";
import { WishlistContext, CartContext } from "../../context/CreateContext";
import NavigationBar from "../common/nav-bar/NavigationBar";
import { Heart } from "lucide-react";

function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } =
    useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login to add items to your cart!");
      return;
    }
    addToCart(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <NavigationBar />

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 mt-10">
        My Wishlist
      </h1>

      {wishlist.length > 0 ? (
        <>
          {/* Wishlist Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col border border-gray-100"
              >
                {/* Remove from Wishlist */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md"
                >
                  <Heart className="w-5 h-5 fill-pink-600 text-pink-600" />
                </button>

                {/* Product Image */}
                <div className="h-64 w-full overflow-hidden">
                  <img
                    src={product.image || "https://via.placeholder.com/300x400"}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 tracking-wide">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 italic">
                    {product.description || "A luxury fragrance for every mood."}
                  </p>

                  {/* Price + Button */}
                  <div className="mt-auto flex items-center justify-between">
                    <p className="text-xl font-bold text-pink-600">
                      ₹{product.price}
                    </p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Clear Wishlist Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={clearWishlist}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
            >
              Clear Wishlist
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600">
          Your wishlist is empty. Start adding some perfumes
        </p>
      )}
    </div>
  );
}

export default WishlistPage;
