import React, { useEffect, useState } from "react";
import cn from "classnames";

function Cursor() {
  const [position, setPosition] = useState(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (navigator.userAgent.indexOf("Mobile") > -1 || window.innerWidth < 768)
      return;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);
  const handleClick = (ev) => {
    setActive(true);

    setTimeout(() => {
      setActive(false);
    }, 500);
  };
  const handleMouseMove = (ev) => {
    const { pageX, pageY } = ev;
    setPosition({
      x: pageX,
      y: pageY,
    });
  };
  return (
    <>
      <div
        className={cn("custom-cursor", {
          active: active,
          visible: position,
        })}
        style={{ left: position?.x, top: position?.y }}
      />
    </>
  );
}

export default Cursor;
