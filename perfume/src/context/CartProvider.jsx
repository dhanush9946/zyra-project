import React, { useEffect, useState } from 'react'
import { CartContext } from './CreateContext'
import axios from 'axios'



function CartProvider({children}) {
  const [cart,setCart]=useState([]);
  const [userId,setUserId]=useState(null);

  // loding user
  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if(storedUser&&storedUser.id){
      setUserId(storedUser.id)
      loardCart(storedUser.id)
    }
  },[])

  // load cart for this user
  const loardCart = async (id)=>{
    try{
     const res = await axios.get(`http://localhost:3000/users/${id}`);
     setCart(res.data.cart || [])
    }
    catch(error){
      console.error('Error loading cart',error)
    }
  };
  // add item to user cart
  const addToCart = async (product)=>{

     const existingItem = cart.find((item) => item.id === product.id);
     if(existingItem){
      alert('item already existed in the cart')
     }
     else{
   
    const updatedCart = [...cart,product];
    setCart(updatedCart);
    
    

    if(userId){
      await axios.patch(`http://localhost:3000/users/${userId}`, {cart:updatedCart,})
    }
    alert('product added to cart');

  }
  };

  // remove from cart
 const removeFromCart = async (id)=>{
  const updatedCart = cart.filter((item)=>item.id != id);
  setCart(updatedCart);

  if(userId){
    await axios.patch(`http://localhost:3000/users/${userId}`,{cart:updatedCart})
  }
 };

 const clearCart = async ()=>{
  setCart([]);
  if(userId){
    await axios.patch(`http://localhost:3000/users/${userId}`,{cart:[]})
  }
 };




  return (
    <CartContext.Provider value={{cart,addToCart,removeFromCart,clearCart,loardCart}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider