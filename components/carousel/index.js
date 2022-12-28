import React from "react";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

function MyCarousel({ children }) {
  return (
    <Carousel
      suppressHydrationWarning={true}
      showArrows={false}
      showStatus={false}
      showThumbs={false}
    >
      {children}
    </Carousel>
  );
}

export default MyCarousel;
