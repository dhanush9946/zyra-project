import React from "react";
import MainComponent from "./routes";
import ProductProvider from "./context/ProductProvider";
import CartProvider from "./context/CartProvider";
import WishListProvider from "./context/WishListProvider";

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <WishListProvider>
          <MainComponent />
        </WishListProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
