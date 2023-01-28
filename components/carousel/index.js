import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyCarousel({ children, ...config }) {
  return (
    <Slider
      variableWidth={true}
      centerMode={true}
      centerPadding={"0px"}
      {...config}
    >
      {children}
    </Slider>
  );
}

export default MyCarousel;
