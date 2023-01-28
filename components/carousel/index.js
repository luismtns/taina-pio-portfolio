import React, { useRef, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyCarousel({ children, ...config }) {
  const slider = useRef(null);
  const slide = (e) => {
    const { deltaY } = e;
    deltaY > 0 ? slider?.current.slickNext() : slider?.current.slickPrev();
  };
  return (
    <div onWheel={slide} onMouseOut={() => {}}>
      <Slider
        ref={slider}
        useTransform={false}
        variableWidth={true}
        centerMode={true}
        infinite={true}
        centerPadding={"0px"}
        slidesToShow={1}
        {...config}
      >
        {children}
      </Slider>
    </div>
  );
}

export default MyCarousel;
