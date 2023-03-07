import React, { useRef } from "react";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyCarousel({ children, className, ...config }) {
  const slider = useRef(null);
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });

  const handleWheel = (ev, _d) => {
    if (isTabletOrMobile) return false;
    if (_d == "up") {
      slider?.current.slickPrev();
    } else {
      slider?.current.slickNext();
    }
  };
  return (
    <ReactScrollWheelHandler
      upHandler={(e) => handleWheel(e, "up")}
      downHandler={(e) => handleWheel(e, "down")}
    >
      <Slider
        className={className}
        ref={slider}
        useTransform={false}
        useCSS={false}
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
