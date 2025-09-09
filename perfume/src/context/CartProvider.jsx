import React, { useEffect, useState } from 'react';
import { CartContext } from './CreateContext';
import axios from 'axios';
import toast from 'react-hot-toast'

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  // ✅ load user and cart on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      setUserId(storedUser.id);
      loadCart(storedUser.id);
    }
  }, []);

  // ✅ load cart for this user
  const loadCart = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/users/${id}`);
      setCart(res.data.cart || []);
    } catch (error) {
      console.error('Error loading cart', error);
    }
  };

  // ✅ add item to cart (with qty support)
  const addToCart = async (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    let updatedCart;
    if (existingItem) {
      // increase quantity if already exists
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, qty: (item.qty || 1) + 1 } : item
      );
    } else {
      // add new product with qty: 1
      updatedCart = [...cart, { ...product, qty: 1 }];
    }

    setCart(updatedCart);

    if (userId) {
      try {
        await axios.patch(`http://localhost:3000/users/${userId}`, {
          cart: updatedCart,
        });
      } catch (error) {
        console.error('Error updating cart', error);
      }
    }
    toast.success("Product added to cart!");
  };

  // ✅ remove from cart (decrease qty or remove completely)
  const removeFromCart = async (id) => {
    const existingItem = cart.find((item) => item.id === id);

    let updatedCart;
    if (existingItem && existingItem.qty > 1) {
      updatedCart = cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      );
    } else {
      updatedCart = cart.filter((item) => item.id !== id);
    }

    setCart(updatedCart);

    if (userId) {
      try {
        await axios.patch(`http://localhost:3000/users/${userId}`, {
          cart: updatedCart,
        });
      } catch (error) {
        console.error('Error removing item from cart', error);
      }
    }
  };

  // ✅ clear entire cart
  const clearCart = async () => {
    setCart([]);
    if (userId) {
      try {
        await axios.patch(`http://localhost:3000/users/${userId}`, { cart: [] });
      } catch (error) {
        console.error('Error clearing cart', error);
      }
    }
  };


  // increase quantity
const increaseQty = async (id) => {
  const updatedCart = cart.map((item) =>
    item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
  );
  setCart(updatedCart);

  if (userId) {
    await axios.patch(`http://localhost:3000/users/${userId}`, {
      cart: updatedCart,
    });
  }
};

// decrease quantity
const decreaseQty = async (id) => {
  const updatedCart = cart.map((item) =>
    item.id === id && (item.qty || 1) > 1
      ? { ...item, qty: (item.qty || 1) - 1 }
      : item
  );
  setCart(updatedCart);

  if (userId) {
    await axios.patch(`http://localhost:3000/users/${userId}`, {
      cart: updatedCart,
    });
  }
};


  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, loadCart,increaseQty, decreaseQty,}}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
