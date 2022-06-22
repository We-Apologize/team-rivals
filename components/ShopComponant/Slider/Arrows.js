import React from "react";
import style from "./slider.module.scss";

function Arrows({ prevSlide, nextSlide }) {
  return (
    <div className={style.arrows}>
      <span className={style.prev} onClick={prevSlide}>
        &#10094;
      </span>
      <span className={style.next} onClick={nextSlide}>
        &#10095;
      </span>
    </div>
  );
}

export default Arrows;
