import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";

import ProductProvider from "./context/ProductProvider";
import CartProvider from "./context/CartProvider";
import WishListProvider from "./context/WishListProvider";

import NavigationBar from "./Pages/common/nav-bar/NavigationBar";
import Footer from "./Pages/common/footer/Footer";

// user
import Home from "./Pages/nonAuth/Home";
import Products from "./Pages/nonAuth/Products";
import CartPage from "./Pages/nonAuth/CartPage";
import ProfilePage from "./Pages/nonAuth/ProfilePage";
import WishlistPage from "./Pages/nonAuth/WishListPage";
import Checkout from "./Pages/nonAuth/Checkout";
import ProductDetails from "./Pages/nonAuth/ProductDetails";

// Admin
import Sidebar from "./Admin/Sidebar/Sidebar";
import Dashboard from "./Admin/Pages/Dashboard";
import AdminProducts from "./Admin/Pages/Products";
import AdminOrders from "./admin/pages/Orders";
import AdminUsers from "./admin/pages/Users";

import LoginPage from "./Pages/auth/LoginPage";
import RegistrationPage from "./Pages/auth/RegistrationPage";
import ForgotPassword from "./Pages/auth/ForgetPassword";
import NotFound from "./Pages/nonAuth/NotFound";

import ProtectedRoute from "./ProtectedRoute";

function AppWrapper() {
  const location = useLocation();

  // Hide navbar & footer on login/register
  const hideLayout =
    ["/login", "/register"].includes(location.pathname) ||
    location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <NavigationBar />}

      <div className="flex-grow">
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

            
            <Route path="*" element={<NotFound/>} />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Sidebar />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </div>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <WishListProvider>
          <Router>
            <AppWrapper />
          </Router>
        </WishListProvider>
      </CartProvider>
    </ProductProvider>
  );
}
