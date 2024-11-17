import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './Carousel.css'

import Carousel1 from '../assets/images/carousel1.jpg';
import Carousel2 from '../assets/images/carousel2.jpg';
import Carousel3 from '../assets/images/carousel3.jpg';




const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 200,
        cssEase: "linear",
        waitForAnimate: false,
      };
  
    return (
    <div className="slider">
        <div className="slider-container">
            <Slider {...settings}>
                <div className="slider-item">
                <img src={Carousel1} />
                </div>
                <div className="slider-item">
                <img src={Carousel2} />
                </div>
                <div className="slider-item">
                <img src={Carousel3} />
                </div>
            </Slider>
        </div>
      </div>
  )
}

export default Carousel
