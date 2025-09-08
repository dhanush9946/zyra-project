import React, { useContext, useState } from "react";
import { CartContext, ProductContext } from "../../context/CreateContext";
import { WishlistContext } from "../../context/CreateContext";
import ShopByGender from "./ShopByGender";
import NavigationBar from "../common/nav-bar/NavigationBar";
import { Heart } from "lucide-react"; // using lucide-react icons

function Products() {
  const { products, searchTerm } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const [gender, setGender] = useState("All");

  // filter by gender + search
  const filteredProducts = products.filter((p) => {
    const matchesGender = gender === "All" || p.gender === gender;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGender && matchesSearch;
  });

  // add to cart with login check
  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login to add items to your cart!");
      return;
    }
    addToCart(product);
  };

  // toggle wishlist
  const toggleWishlist = (product) => {
    if (wishlist.find((item) => item.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <NavigationBar />
      <ShopByGender onSelect={setGender} />

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Perfume Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const isInWishlist = wishlist.find((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col border border-gray-100"
              >
                {/* Wishlist Icon - always visible */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isInWishlist
                        ? "fill-pink-600 text-pink-600"
                        : "text-gray-400"
                    }`}
                  />
                </button>

                {/* Product Image */}
                <div className="h-64 w-full overflow-hidden">
                  <img
                    src={product.image || "https://via.placeholder.com/300x400"}
                    alt={product.name}
                    className="h-full w-full object-cover  transition-transform duration-500"
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
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No perfumes found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Products;
