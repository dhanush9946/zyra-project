import React, { useContext, useState } from "react";
import { CartContext, ProductContext } from "../../context/CreateContext";
import ShopByGender from "./ShopByGender";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

function ProductList() {
  const { addToCart } = useContext(CartContext);
  const { products, searchTerm } = useContext(ProductContext);

  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please login to add items to your cart!");
      return;
    }

    addToCart(product); // add to context
  };

  const [gender, setGender] = useState("All");

  // filter by gender + search
  const filteredProducts = products.filter((p) => {
    const matchesGender = gender === "All" || p.gender === gender;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGender && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-black tracking-wide">
        Premium Perfume Collection
      </h2>

      <ShopByGender onSelect={setGender} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="bg-pink-50 rounded-3xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col border border-pink-100 hover:border-pink-300"
            >
              {/* Image */}
              <div
                onClick={() => navigate(`/product/${product.id}`)}  
                className="h-72 w-full overflow-hidden">
                <img
                  src={product.image || "https://via.placeholder.com/300x400"}
                  alt={product.name}
                  className="h-full w-full object-cover hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>

              {/* Info */}
              <div className="p-5 flex-2 flex flex-col bg-pink-50"
               >
              <div 
              onClick={() => navigate(`/product/${product.id}`)}
              className="p-6 flex-1 flex flex-col  from-pink-50 to-white bg-pink-50">
                <h3 className="text-xl font-semibold text-black mb-2 tracking-wide">
                  {product.name}
                </h3>
                <p className="text-sm text-black mb-4 italic">
                  {product.description || "A luxury fragrance for every mood."}
                </p>
                </div>

                {/* Price + Button */}
                <div className="mt-auto flex items-center justify-between">
                  <p className="text-2xl font-bold text-black">
                    ₹{product.price}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-5 py-2.5 bg-black text-white rounded-full shadow-md hover:bg-gray-900 hover:shadow-lg transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-black text-lg">
            No perfumes found.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
