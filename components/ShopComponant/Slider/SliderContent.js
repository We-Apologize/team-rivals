import React, { useEffect } from "react";
import Image from "next/image";
import style from "./slider.module.scss";

function SliderContent({ activeIndex, sliderImage ,setActiveBanner}) {

  useEffect(() => {
    if(Boolean(setActiveBanner)){
      setActiveBanner(sliderImage[activeIndex]);
    }
  }, [activeIndex]);
  return (
    <section>
      {sliderImage.map((slide, index) => (
        <div
          key={index}
          className={
            index === activeIndex
              ? `${style.slides} ${style.active}`
              : style.inactive
          }
        >
          <Image
            className={style.slideImage}
            src={slide.urls}
            alt="hello"
            layout="fill"
            placeholder="blur"
            blurDataURL="/testImage/jerseyBanner.jpg"
            objectFit="unset"
          />
          <h2 className={style.slideTitle}>{slide.title}</h2>
          <h3 className={style.slideText}>{slide.description}</h3>
        </div>
      ))}
    </section>
  );
}

export default SliderContent;
