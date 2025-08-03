import React, { useEffect, useState, useRef } from "react"
import axios from "axios"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules"

const ContentCarousel = () => {
  const [data, setData] = useState([])
  const paginationRef = useRef(null)

  useEffect(() => {
    hldGetImage()
  }, [])

  const hldGetImage = () => {
    axios
      .get("https://picsum.photos/v2/list?page=1&limit=15")
      .then((res) => {
        // console.log(res.data)
        setData(res.data)
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="w-full max-w-6xl mx-auto justify-center">
      {/* Main Swiper - Large */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: paginationRef.current,
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper mb-4"
      >
        {data?.map((item, index) => (
          <SwiperSlide key={item.id}>
            <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 ">
              <img
                src={item.download_url}
                alt={`slide-${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination อยู่ "นอก" Swiper */}
      <div
        ref={paginationRef}
        className="custom-pagination 
        flex justify-center mb-4
        px-2
        sm:gap-2
        md:gap-3
        lg:gap-3
        "
      ></div>

      {/* Thumbnail Swiper - Small Carousel */}
      <Swiper
        className="mySwiper"
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          // 1280: { slidesPerView: 6 },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {data?.map((item, index) => (
          <SwiperSlide key={item.id}>
            <div className="w-full h-32 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
              <img
                src={item.download_url}
                alt={`thumb-${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ContentCarousel
