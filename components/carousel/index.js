import React, { useRef, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyCarousel({ children, className, ...config }) {
  const slider = useRef(null);
  const [sliding, setSliding] = useState(false);
  const slide = (e) => {
    if (sliding) return;
    setSliding(true);
    const { deltaY } = e;
    deltaY / 200 > 0
      ? slider?.current.slickNext()
      : slider?.current.slickPrev();
    setTimeout(() => setSliding(false), 800);
  };
  return (
    <div onWheel={slide}>
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
