import React, { useRef } from "react";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyCarousel({ children, className, ...config }) {
  const slider = useRef(null);
  return (
    <ReactScrollWheelHandler
      upHandler={(e) => slider?.current.slickPrev()}
      downHandler={(e) => slider?.current.slickNext()}
    >
      <Slider
        className={className}
        ref={slider}
        useTransform={false}
        centerPadding={"0px"}
        infinite={true}
        lazyLoad={false}
        {...config}
      >
        {children}
      </Slider>
    </ReactScrollWheelHandler>
  );
}

export default MyCarousel;
