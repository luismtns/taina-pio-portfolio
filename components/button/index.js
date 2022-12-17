import React from "react";
import cn from "classnames";

import styles from "./index.module.scss";

const Button = ({ children, active, onClick, className }) => {
  return (
    <button
      className={cn(styles.button, { [styles.active]: active }, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {};

export default Button;
