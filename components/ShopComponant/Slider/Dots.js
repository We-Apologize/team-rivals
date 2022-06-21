import React from "react";
import styles from "./slider.module.scss";
function Dots({ activeIndex, onclick, sliderImage }) {
  return (
    <div className={styles.allDots}>
    {sliderImage.map((slide, index) => (
      <span
        key={index}
        //className={`${activeIndex === index ? "dot active-dot" : "dot"}`}
        className={index === activeIndex ? `${styles.dot} ${styles.activeDot}` : styles.dot}
        onClick={() => onclick(index)}
      ></span>
    ))}
  </div>
);
}

export default Dots;
