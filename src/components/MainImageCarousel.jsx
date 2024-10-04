import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../styles/MainImageCarousel.css';

import Wedding from '../assets/images/l1.jpeg';
import Decor from '../assets/images/l2.png';
import Landscape from '../assets/images/l3.jpg';
import Natural from '../assets/images/l4.jpg';

function MainImageCarousel() {
  const images = [
    { src: Wedding, alt: "Wedding" },
    { src: Decor, alt: "Decor" },
    { src: Landscape, alt: "Landscape" },
    { src: Natural, alt: "Natural" }
  ];

  useEffect(() => {
    console.log("MainImageCarousel mounted");
    console.log("Images:", images);
  }, []);

  return (
    <div className="carousel-wrapper">
      <Carousel 
        useKeyboardArrows={true} 
        autoPlay={true} 
        infiniteLoop={true}
        interval={5000}
        showStatus={false}
        showThumbs={false}
        showIndicators={true}
        className="full-width-carousel"
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          const defStyle = { marginLeft: 20, color: "white", cursor: "pointer" };
          const style = isSelected
            ? { ...defStyle, color: "red" }
            : { ...defStyle };
          return (
            <span
              style={style}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`${label} ${index + 1}`}
            >
              {"●"}
            </span>
          );
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default MainImageCarousel;