import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "./customSlider.scss";
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
      <div className="thumbnail-container ">
        <button
          className="scroll-btn left-btn d-flex justify-content-center align-item-center"
          onClick={() => scrollThumbnails("left")}
        >
          <img src={leftSideIcon} alt="" width={20} />
        </button>
        {/* thumbnail show */}
        <div className="thumbnail-scroll left-btn " ref={thumbnailRef}>
          {dataList?.map((item, index) => (
            <img
              key={index}
              src={item}
              alt={`thumbnail-${index}`}
              className={`thumbnail-preview-image ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>

        <button
          className="scroll-btn right-btn d-flex justify-content-center align-item-center"
          onClick={() => scrollThumbnails("right")}
        >
          <img src={rightSideIcon} alt="" width={20} />
        </button>
      </div>
    </div>
  );
}
