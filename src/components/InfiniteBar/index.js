import React from "react";
import "./infiniteBar.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 

const InfiniteBar = () => {
  const specialities = [
    "Dementia",
    "Depression",
    "Diabetes",
    "Diphtheria",
    "Dyslexia",
    "Obesity",
    "Vertigo",
    "Dementia",
    "Depression",
    "Diabetes",
    "Diphtheria",
    "Dyslexia",
    "Obesity",
    "Vertigo",
    "Dementia",
    "Depression",
    "Diabetes",
    "Diphtheria",
    "Dyslexia",
    "Obesity",
    "Vertigo",
    "Obesity",
    "Vertigo",
    "Dementia",
    "Depression",
    "Diabetes",
    "Diphtheria",
    "Dyslexia",
    "Obesity",
    "Vertigo"
  ];

  const breakpoints = {320: { slidesPerView: 3 },480: { slidesPerView: 4 },768: { slidesPerView: 5 },1024: { slidesPerView: 8 }};
  return (
    <div className="infiniteBar">
      <Swiper
        spaceBetween={20}
        pagination={false}
        style={{display:"flex", marginLeft:0, marginRight:0, width:"100%"}}
        // slidesPerView={{lg:10,md:10,sm:6,xs:4}}
        breakpoints={breakpoints}
        freeMode={true}
      >
        {specialities.map((speciality, index) => (
          <SwiperSlide
            key={index}
            style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            // textAlign:"center",
              width: "auto",
              height:"1.75rem",
              borderRadius: "15px",
              padding:"0 10px"
            }}
          >
            {speciality}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InfiniteBar;
