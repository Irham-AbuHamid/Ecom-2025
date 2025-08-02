import React, { useEffect, useState } from "react"
import { listProductBy } from "../../api/product"
import ProductCard from "../card/ProductCard"
import SwiperShowProduct from "../../utils/swiperShowProduct"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const NewProduct = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    listProductBy("updatedAt", "desc", 5)
      .then((res) => {
        // console.log(res.data)
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <p className="text-center text-2xl font-bold text-gray-800 mb-6 pb-2">
        สินค้าขายดี
      </p>

      <SwiperShowProduct>
        {data.map((item, index) => (
          <SwiperSlide>
            <ProductCard item={item} key={index} />
          </SwiperSlide>
        ))}
      </SwiperShowProduct>
    </div>
  )
}

export default NewProduct
