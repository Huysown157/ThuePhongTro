import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper";
const Slider = ({ images }) => {
  // console.log(images);
  return (
    <>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper w-full h-full text-white select-none"
      >
        {images?.map((item) => (
          <SwiperSlide className="text-center text-lg" key={item?.url}>
            <img
              className="w-full h-full object-contain bg-black"
              src={item?.url}
              alt="swiper"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
