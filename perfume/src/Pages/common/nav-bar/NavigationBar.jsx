import React, { useContext, useEffect, useState } from "react";
import { FaSearch, FaUser, FaHeart, FaShoppingCart, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../../context/CreateContext";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState(null);

  const {searchTerm,setSearchTerm}=useContext(ProductContext);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Brand */}
        <div className="text-2xl font-bold tracking-wide text-gray-800 cursor-pointer" onClick={() => navigate("/")}>
          Zyra
        </div>

        {/* Center: Search (hidden on mobile) */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-full w-80">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="search"
            placeholder="Search on Zyra"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        {/* Right: Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <button className="px-4 py-2 text-gray-700 hover:text-black" onClick={() => navigate("/")}>
            Home
          </button>
          
          <button className="px-4 py-2 text-gray-700 hover:text-black" onClick={()=>navigate('/products')}>
            Product
          </button>
          {!user ? (
          <button className="px-4 py-2 text-gray-700 hover:text-black" onClick={() => navigate("/login")}>
            Login
          </button>

          ):(<span className="text-gray-700 font-semibold">
              Hi, {user.name}
            </span>)}

          <FaUser 
          onClick={()=>navigate('/profile')}
          className="cursor-pointer text-gray-700 hover:text-black text-xl" 
          />
          <FaHeart 
          className="cursor-pointer text-gray-700 hover:text-red-500 text-xl" 
          onClick={()=>navigate('/wishlist')}
          />
          <FaShoppingCart onClick={()=>navigate('/cart')} className="cursor-pointer text-gray-700 hover:text-black text-xl" />
          <FaSignOutAlt  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.reload(); // Refresh to update UI
                    }} 
            className="cursor-pointer text-gray-700 hover:text-black text-xl" />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FaTimes className="text-2xl text-gray-700" />
            ) : (
              <FaBars className="text-2xl text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 flex flex-col gap-4">
          <button className="text-gray-700 hover:text-black text-left" onClick={() => { setMenuOpen(false); navigate("/"); }}>
            Home
          </button>
          <button className="text-gray-700 hover:text-black text-left" onClick={() => setMenuOpen(false)}>
            Product
          </button>
          <button className="text-gray-700 hover:text-black text-left" onClick={() => { setMenuOpen(false); navigate("/login"); }}>
            Login
          </button>

          <div className="flex gap-4 mt-2">
            <FaUser className="cursor-pointer text-gray-700 hover:text-black text-xl" />
            <FaHeart className="cursor-pointer text-gray-700 hover:text-red-500 text-xl" />
            <FaShoppingCart className="cursor-pointer text-gray-700 hover:text-black text-xl" />
            <FaSignOutAlt className="cursor-pointer text-gray-700 hover:text-black text-xl" />
          </div>
        </div>
      )}
    </nav>
  );
}
