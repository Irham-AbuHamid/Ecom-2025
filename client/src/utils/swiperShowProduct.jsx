import React from "react"

// Import Swiper React components
import { Swiper } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

// import required modules
import { Autoplay, Navigation } from "swiper/modules"

const SwiperShowProduct = ({ children }) => {
  return (
    <div>
      {/* BestSeller and NewProduct*/}
      <Swiper
        slidesPerView={1}
        spaceBetween={15}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
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
        {children}
      </Swiper>
    </div>
  )
}

export default SwiperShowProduct
