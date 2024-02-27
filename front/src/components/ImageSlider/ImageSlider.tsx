import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlider.css";

interface ImageSliderProps {
  images: (string | null)[];
}
interface ArrowProps {
  onClick?: () => void;
}

const ImageSlider = ({ images }: ImageSliderProps) => {
  const filteredImages = images.filter(image => image !== null);

  const SampleNextArrow: React.FC<ArrowProps> = ({ onClick }) => {
    return (
      <div className="custom-arrow next" onClick={onClick}>
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    );
  };

  const SamplePrevArrow: React.FC<ArrowProps> = ({ onClick }) => {
    return (
      <div className="custom-arrow prev" onClick={onClick}>
        <i className="fa-solid fa-chevron-left"></i>
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="imageslider">
      {images.length > 0 && (
        <div className="custom-dot-container">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="carousel__item">
                <img src={image!} alt={`Image ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
