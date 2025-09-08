import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import LoginPage from './Pages/auth/LoginPage'
import RegistrationPage from './Pages/auth/RegistrationPage'
import Home from './Pages/nonAuth/Home'
import Products from './Pages/nonAuth/Products'
import CartPage from './Pages/nonAuth/CartPage'
import ProfilePage from './Pages/nonAuth/ProfilePage'
import WishlistPage from './Pages/nonAuth/WishListPage'

function MainComponent() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegistrationPage />}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/cart' element={<CartPage />}/>
        <Route path='/profile' element={<ProfilePage />}/>
        <Route path='/wishlist' element={<WishlistPage />}/>
      </Routes>
    </Router>
  )
}

export default MainComponent