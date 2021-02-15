import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../style/MultiItemsCarousel.css";

export const MultiItemsCarousel = ({ items, slidesNum, offset }) => {
  const NavigationArrows = ({ direction }) => {
    const label =
      direction === "left" ? (
        <i className="fas fa-chevron-left"></i>
      ) : (
        <i className="fas fa-chevron-right"></i>
      );

    return <button className="carousel-button">{label}</button>;
  };
  return (
    <div className="carousel-wrapper">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={true}
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={true}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: slidesNum,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: slidesNum,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: slidesNum,
          },
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {items}
      </Carousel>
    </div>
  );
};
