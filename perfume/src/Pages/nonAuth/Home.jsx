import React from 'react'
import Navbar from '../common/nav-bar/NavigationBar'
import HeroSlider from './HomeImages'
import ShopByGender from './ShopByGender'
import ProductList from './ProductList'

function Home() {
  
  return (
    <div>
      {/* Navbar */}
      <nav>
        <Navbar />
      </nav>
     {/* Hero section */}
      <section>
        <div>
          <HeroSlider />
        </div>
      </section>
      

    {/* Products */}
    <div>
      <ProductList />
    </div>

   
  </div>
  )
}

export default Home