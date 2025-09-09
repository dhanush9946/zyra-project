// src/context/WishListProvider.jsx
import React, { useEffect, useState } from "react";
import { WishlistContext } from "./CreateContext";
import axios from "axios";
import toast from 'react-hot-toast'

function WishListProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(null);

  // load user on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      setUserId(storedUser.id);
      loadWishlist(storedUser.id);
    }
  }, []);

  // load wishlist for this user
  const loadWishlist = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/users/${id}`);
      setWishlist(res.data.wishlist || []);
    } catch (error) {
      console.error("Error loading wishlist", error);
    }
  };

  // add to wishlist
  const addToWishlist = async (product) => {
    const updatedWishlist = [...wishlist, product];
    setWishlist(updatedWishlist);

    if (userId) {
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        wishlist: updatedWishlist,
      });
    }
    toast.success("Product added to wishlist");
  };

  // remove from wishlist
  const removeFromWishlist = async (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);

    if (userId) {
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        wishlist: updatedWishlist,
      });
    }
  };

  // clear wishlist
  const clearWishlist = async () => {
    setWishlist([]);
    if (userId) {
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        wishlist: [],
      });
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        loadWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishListProvider;
