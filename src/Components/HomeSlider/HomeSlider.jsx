import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderimage1 from "../../assets/images/slider-image-1.jpeg";
import sliderimage2 from "../../assets/images/slider-image-2.jpeg";
import sliderimage3 from "../../assets/images/slider-image-3.jpeg";
import sliderimage4 from "../../assets/images/blog-img-1.jpeg";
import sliderimage5 from "../../assets/images/blog-img-2.jpeg";
import sliderimage6 from "../../assets/images/slider-2.jpeg";
export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease",
  };
  return (
    <Slider {...settings} arrows={false} className="w-full h-full">
      {[
        sliderimage1,
        sliderimage2,
        sliderimage3,
        sliderimage4,
        sliderimage5,
        sliderimage6,
      ].map((image, index) => (
        <div key={index} className="h-80 w-full overflow-hidden">
          <img
            src={image}
            alt={`slide-${index + 1}`}
            className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      ))}
    </Slider>
  );
}
