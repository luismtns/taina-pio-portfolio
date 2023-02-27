import React, { useRef, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyCarousel({ children, className, ...config }) {
  const slider = useRef(null);
  const slide = (e) => {
    const { deltaY } = e;
    deltaY / 200 > 0
      ? slider?.current.slickNext()
      : slider?.current.slickPrev();
  };
  return (
    <div onWheel={slide} onMouseOut={() => {}}>
      <Slider
        className={className}
        ref={slider}
        useTransform={false}
        centerPadding={"0px"}
        infinite={true}
        {...config}
      >
        {children}
      </Slider>
    </div>
  );
}

export default MyCarousel;
