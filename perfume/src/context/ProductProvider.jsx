import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ProductContext } from './CreateContext';


const ProductProvider = ({children}) => {
  const[products,setProducts]=useState([]);

  const [searchTerm,setSearchTerm]=useState("");

   


  useEffect(()=>{
    axios
    .get('https://database-1-p36v.onrender.com/perfumes')
    .then(response => setProducts(response.data))
    .catch(error => console.error('Error fetching products',error));
  },[])


 


  return (
    <ProductContext.Provider value={{products,setProducts,searchTerm,setSearchTerm}}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider