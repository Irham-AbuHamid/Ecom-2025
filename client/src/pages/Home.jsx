import React from "react"
import ContentCarousel from "../components/home/ContentCarousel"
import BestSeller from "../components/home/BestSeller"
import NewProduct from "../components/home/NewProduct"

const Home = () => {
  return (
    <div>
      <ContentCarousel />
      <BestSeller />
      <NewProduct />
    </div>
  )
}

export default Home
