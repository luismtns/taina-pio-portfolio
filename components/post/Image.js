import React, { useState } from "react";
import cn from "classnames";

import styles from "./Image.module.scss";

function Image({ className, ...imgProps }) {
  const [isVertical, setIsVertical] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const onLoad = ({ target: { width, height } }) => {
    setIsVertical(height > width);
    setIsLoaded(true);
  };
  return (
    <img
      {...imgProps}
      className={cn(
        styles.image,
        {
          [styles.isLoaded]: isLoaded,
          [styles.vertical]: isVertical,
        },
        className
      )}
      onLoad={onLoad}
    />
  );
}

export default Image;
