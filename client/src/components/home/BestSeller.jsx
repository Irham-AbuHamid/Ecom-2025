import React, { useEffect, useState } from "react"
import { listProductBy } from "../../api/product"
import ProductCard from "./../card/ProductCard"
import SwiperShowProduct from "../../utils/swiperShowProduct"

// Import Swiper React components
import { SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const BestSeller = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    listProductBy("sold", "desc", 10)
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
      {data.length > 0 && (
        <SwiperShowProduct>
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <ProductCard item={item} />
            </SwiperSlide>
          ))}
        </SwiperShowProduct>
      )}
    </div>
  )
}

export default BestSeller
