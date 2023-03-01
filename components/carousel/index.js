import React, { useRef, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyCarousel({ children, className, ...config }) {
  const slider = useRef(null);
  const [sliding, setSliding] = useState(false);
  const slide = (e) => {
    if (!e || sliding || !slider?.current) return;
    setSliding(() => {
      const sliderCur = slider?.current;
      var direction = e.deltaY > 0 ? 1 : -1;
      console.log(e.deltaY);
      direction > 0 ? sliderCur.slickNext() : sliderCur.slickPrev();
      return true;
    });
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
        lazyLoad={false}
        {...config}
      >
        {children}
      </Slider>
    </div>
  );
}

export default MyCarousel;
