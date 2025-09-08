import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ProductContext } from './CreateContext';


const ProductProvider = ({children}) => {
  const[products,setProducts]=useState([]);

  const [searchTerm,setSearchTerm]=useState("");

   


  useEffect(()=>{
    axios
    .get('http://localhost:3000/perfumes')
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