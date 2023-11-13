import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageSlider.css';

const ImageSlider = ({ images }) => {
  const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow next" onClick={onClick}>
        {/* You can customize the Next Arrow UI here */}
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow prev" onClick={onClick}>
        {/* You can customize the Prev Arrow UI here */}
        <i className="fa-solid fa-chevron-left"></i>
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="imageslider">
      {images.length > 0 && (
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="carousel__item">
              <img src={image} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ImageSlider;
