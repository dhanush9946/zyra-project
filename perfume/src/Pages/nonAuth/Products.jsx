import React, { useContext, useEffect, useState } from "react";
import { CartContext, ProductContext, WishlistContext } from "../../context/CreateContext";
import NavigationBar from "../common/nav-bar/NavigationBar";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'

function Products() {
  const { products, searchTerm } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const navigate = useNavigate();

  const [selectedBrand, setSelectedBrand] = useState("All");
  const [loading, setLoading] = useState(true);

  // fake loading effect when page first opens
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); // 1.2s delay
    return () => clearTimeout(timer);
  }, []);

  // Define 5 brands you want to filter
  const brands = ["All", "Dior", "Chanel", "Gucci", "Versace", "Armani"];

  // filter by search + brand
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBrand =
      selectedBrand === "All" || p.brand.toLowerCase() === selectedBrand.toLowerCase();

    return matchesSearch && matchesBrand;
  });

  // add to cart with login check
  const handleAddToCart = (product) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user) {
    toast.error("Please login to add items to your cart!");
    return;
  }

  if (product.status !== "active") {
    toast.error("This product is currently unavailable!");
    return;
  }

  addToCart(product);
};


  // toggle wishlist
  const toggleWishlist = (product) => {

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("Please login to add items to your wishlist!");
      return;
    }

    if (wishlist.find((item) => item.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <NavigationBar />

      <h1 className="text-3xl font-bold text-center mt-12 text-gray-800 mb-6">
        Perfume Collection
      </h1>
         <h3 className="text-2xl font-bold text-center mt-12 text-gray-800 mb-6">Top Brands</h3>
      {/* 🔹 Brand Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-5 py-2 rounded-full border transition ${
              selectedBrand === brand
                ? "bg-black text-white border-black"
          : "bg-white text-black border-black hover:bg-gray-800 hover:text-white"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* 🔹 Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-pulse">
          {[...Array(8)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col border border-gray-100"
            >
              <div className="h-48 w-full bg-gray-300 rounded-lg mb-4"></div>
              <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : (
        // 🔹 Products Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const isInWishlist = wishlist.find((item) => item.id === product.id);

              return (
                <div
                  key={product.id}
                  className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col border border-gray-100"
                >
                  {/* Wishlist Icon */}
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
                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="h-64 w-full overflow-hidden"
                  >
                    <img
                      src={product.image || "https://via.placeholder.com/300x400"}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500"
                    />
                  </div>


                  {/* Status Badge */}
              <span
                className={`absolute top-2 left-2 px-3 py-1 text-xs rounded-lg ${
                  product.status === "active"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {product.status === "active" ? "Available" : "Out of Stock"}
              </span>

                  {/* Product Info */}
                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="p-5 flex-1 flex flex-col"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 tracking-wide">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-700 mb-3 italic">
                      {product.description || "A luxury fragrance for every mood."}
                    </p>
                    </div>

                    {/* Price + Button */}
                    <div className="flex items-center justify-between mt-4 mb-4 px-5">
  <p className="text-xl font-bold text-black">
    ₹{product.price}
  </p>
  <button
    onClick={() => handleAddToCart(product)}
    className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
  >
    Add to Cart
  </button>
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
      )}
    </div>
  );
}

export default Products;
