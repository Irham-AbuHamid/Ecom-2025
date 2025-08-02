import React, { useEffect, useState } from "react"
import { listProductBy } from "../../api/product"
import ProductCard from "./../card/ProductCard"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"

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
    listProductBy("sold", "desc", 5)
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

      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} 
            className="h-[320px]"
          >
            <ProductCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default BestSeller
