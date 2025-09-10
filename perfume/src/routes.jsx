import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import LoginPage from './Pages/auth/LoginPage'
import RegistrationPage from './Pages/auth/RegistrationPage'
import Home from './Pages/nonAuth/Home'
import Products from './Pages/nonAuth/Products'
import CartPage from './Pages/nonAuth/CartPage'
import ProfilePage from './Pages/nonAuth/ProfilePage'
import WishlistPage from './Pages/nonAuth/WishListPage'
import ForgotPassword from './Pages/auth/ForgetPassword'
import Checkout from './Pages/nonAuth/Checkout'
import ProductDetails from './Pages/nonAuth/ProductDetails'
import NavigationBar from './Pages/common/nav-bar/NavigationBar'

function MainComponent() {
  const location = useLocation();

  // hide navbar on login/register
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <NavigationBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/forgetPassword" element={<ForgotPassword />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

// ✅ Router should wrap MainComponent outside
export default function App() {
  return (
    <Router>
      <MainComponent />
    </Router>
  );
}
