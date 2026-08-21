import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "./customSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import leftSideIcon from "../../assets/icons/left_side.svg";
import rightSideIcon from "../../assets/icons/right_side.svg";

export default function CustomSlider({ dataList }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
  const thumbnailRef = useRef(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, next) => setActiveIndex(next),
  };

  const adjustThumbnailScroll = (index) => {
    if (thumbnailRef.current) {
      const thumbnailElements = thumbnailRef.current.children;
      if (thumbnailElements[index]) {
        thumbnailElements[index].scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }
    }
  };

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    sliderRef?.current?.slickGoTo(index);
  };

  const scrollThumbnails = (direction) => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollBy({
        left: direction === "left" ? -150 : 150,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    adjustThumbnailScroll(activeIndex);
  }, [activeIndex]);
  return (
    <div className="custom-slider-wrapper">
      <Slider {...settings} ref={sliderRef}>
        {dataList?.map((item, index) => (
          <div key={index}>
            <img src={item} alt={item || `Slide-${index}`} width={"100%"} />
          </div>
        ))}
      </Slider>

      {/* Thumbnail section */}
      <div className="flex items-center relative mt-5">
        <button
          className="bg-brand-start text-white border-none cursor-pointer p-[5px] h-10 w-10 rounded-[60%] absolute top-[45%] -translate-y-1/2 z-10 left-[-20px] d-flex justify-content-center align-item-center"
          onClick={() => scrollThumbnails("left")}
        >
          <img src={leftSideIcon} alt="" width={20} />
        </button>
        {/* thumbnail show */}
        <div
          className="flex overflow-x-auto whitespace-nowrap scroll-smooth pb-[10px] w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          ref={thumbnailRef}
        >
          {dataList?.map((item, index) => (
            <img
              key={index}
              src={item}
              alt={`thumbnail-${index}`}
              className={`w-20 h-[50px] cursor-pointer rounded-[5px] m-[5px] ${
                index === activeIndex
                  ? "border-[3px] border-primary scale-105 shadow-[0_8px_16px_rgba(0,0,0,0.2)] transition-all duration-300"
                  : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>

        <button
          className="bg-brand-start text-white border-none cursor-pointer p-[5px] h-10 w-10 rounded-[60%] absolute top-[45%] -translate-y-1/2 z-10 right-[-10px] d-flex justify-content-center align-item-center"
          onClick={() => scrollThumbnails("right")}
        >
          <img src={rightSideIcon} alt="" width={20} />
        </button>
      </div>
    </div>
  );
}
