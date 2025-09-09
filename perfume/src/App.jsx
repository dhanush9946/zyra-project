import React from "react";
import MainComponent from "./routes";
import ProductProvider from "./context/ProductProvider";
import CartProvider from "./context/CartProvider";
import WishListProvider from "./context/WishListProvider";
import Footer from "./Pages/common/footer/Footer";


function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <WishListProvider>
          
          <MainComponent />
          <Footer />
        </WishListProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
