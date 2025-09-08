import React, { useContext } from "react";
import { CartContext, ProductContext } from "../../context/CreateContext";

function ProductList() {
  const { addToCart } = useContext(CartContext);
  const { products, searchTerm } = useContext(ProductContext);

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login to add items to your cart!");
      return;
    }

    addToCart(product); // add to context
  };

  // filtering products for search
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())

   
  );

  

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Perfume Collection
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.slice(0,8).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col border border-gray-100"
            >
              
              <div className="h-64 w-full overflow-hidden">
                <img
                  src={product.image || "https://via.placeholder.com/300x400"}
                  alt={product.name}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 tracking-wide">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3 italic">
                  {product.description || "A luxury fragrance for every mood."}
                </p>

                
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
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No perfumes found.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
