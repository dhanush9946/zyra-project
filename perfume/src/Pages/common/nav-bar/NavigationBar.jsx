import React, { useContext, useState } from "react";
import { 
  FaSearch, FaUser, FaHeart, FaShoppingCart, 
  FaSignOutAlt, FaBars, FaTimes 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext, CartContext, WishlistContext } from "../../../context/CreateContext";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const { products } = useContext(ProductContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  // filter results for dropdown
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-pink-100 via-pink-200 to-pink-100 shadow-lg border-b border-pink-300">
  <div className="flex items-center justify-between px-6 py-4">
    {/* Left: Brand */}
      <div
  className="flex items-center gap-3 cursor-pointer"
  onClick={() => navigate("/")}
>
  <img
    src="/zyra-logo.jpg"
    alt="logo"
    className="w-20 h-12 rounded-3xl border-2 border-pink-400 shadow-md"
  />
 <span className="text-3xl font-bold tracking-wider text-black font-serif">
  ZYRA
</span>


</div>

    {/* Center: Search (with dropdown) */}
    <div className="hidden md:flex items-center relative w-80">
      <div className="flex items-center bg-pink-50 px-3 py-2 rounded-full w-full border border-pink-300 shadow-inner">
        <FaSearch className="text-black mr-2" />
        <input
          type="search"
          placeholder="Search on Zyra"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowResults(true);
          }}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          className="bg-transparent outline-none w-full text-sm text-black placeholder-gray-500"
        />
      </div>

      {/* Search Results Dropdown */}
      {showResults && searchTerm && (
        <div className="absolute top-12 left-0 w-full bg-pink-50 border border-pink-300 rounded-lg shadow-xl max-h-60 overflow-y-auto z-50">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 px-4 py-2 hover:bg-pink-100 cursor-pointer text-black"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <img
                  src={p.image || 'https://via.placeholder.com/40'}
                  alt={p.name}
                  className="w-10 h-10 object-cover rounded border border-pink-300"
                />
                <span>{p.name}</span>
              </div>
            ))
          ) : (
            <p className="px-4 py-2 text-gray-700">No products found</p>
          )}
        </div>
      )}
    </div>

    {/* Right: Desktop Navigation */}
    <div className="hidden md:flex items-center gap-6">
      <button
        className="px-4 py-2 text-black hover:text-gray-700 transition"
        onClick={() => navigate("/")}
      >
        Home
      </button>
      <button
        className="px-4 py-2 text-black hover:text-gray-700 transition"
        onClick={() => navigate("/products")}
      >
        Product
      </button>

      {/* Wishlist with Count */}
      <div className="relative cursor-pointer" onClick={() => navigate("/wishlist")}>
        <FaHeart className="text-black hover:text-red-500 text-xl" />
        {wishlist.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {wishlist.length}
          </span>
        )}
      </div>

      {/* Cart with Count */}
      <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
        <FaShoppingCart className="text-black hover:text-gray-700 text-xl" />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {cart.length}
          </span>
        )}
      </div>

      <FaUser
        onClick={() => navigate("/profile")}
        className="cursor-pointer text-black hover:text-gray-700 text-xl"
      />
    </div>

    {/* Mobile Menu Button */}
    <div className="md:hidden">
      <button onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? (
          <FaTimes className="text-2xl text-black" />
        ) : (
          <FaBars className="text-2xl text-black" />
        )}
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="md:hidden bg-pink-50 shadow-lg border-t border-pink-200 px-6 py-4 flex flex-col gap-4">
      <button
        className="text-black hover:text-gray-700 text-left"
        onClick={() => {
          setMenuOpen(false);
          navigate("/");
        }}
      >
        Home
      </button>
      <button
        className="text-black hover:text-gray-700 text-left"
        onClick={() => {
          setMenuOpen(false);
          navigate("/products");
        }}
      >
        Product
      </button>
      <button
        className="text-black hover:text-gray-700 text-left"
        onClick={() => {
          setMenuOpen(false);
          navigate("/login");
        }}
      >
        Login
      </button>

      <div className="flex gap-6 mt-2">
        {/* Wishlist count in mobile */}
        <div className="relative cursor-pointer" onClick={() => navigate("/wishlist")}>
          <FaHeart className="text-black hover:text-red-500 text-xl" />
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {wishlist.length}
            </span>
          )}
        </div>

        {/* Cart count in mobile */}
        <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
          <FaShoppingCart className="text-black hover:text-gray-700 text-xl" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </div>

        <FaUser
          onClick={() => navigate("/profile")}
          className="cursor-pointer text-black hover:text-gray-700 text-xl"
        />
        <FaSignOutAlt className="cursor-pointer text-black hover:text-gray-700 text-xl" />
      </div>
    </div>
  )}
</nav>


  );
}
