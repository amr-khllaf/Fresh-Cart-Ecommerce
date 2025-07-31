import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LazyLoading from "../LazyLoading/LazyLoading";
import useAllCategories from "../../CustomHooks/useAllCategories/useAllCategories";
import useAOS from "../../CustomHooks/useAOS/useAOS";

export default function CategorySlider() {
  // Slider settings configuration
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Default for large screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    cssEase: "linear",
    // Responsive settings to control number of slides shown per screen size
    responsive: [
      {
        breakpoint: 1280, // screens less than 1280px
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024, // screens less than 1024px
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768, // screens less than 768px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640, // screens less than 640px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // screens less than 480px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Use custom hook to fetch all categories using React Query
  const { data, isLoading, error } = useAllCategories();

  // Initialize AOS animation on mount and refresh on data change
  useAOS([data]);

  // Handle loading state
  if (isLoading) {
    return <LazyLoading message="Loading Categories..." fullPage={false} />;
  }

  // Handle error state
  if (error) {
    return <div>Error fetching categories: {error.message}</div>;
  }

  // Extract category data from response
  const allCategories = data.data.data;

  return (
    <div className="relative min-h-[300px]">
      {/* Section title with animation */}
      <h2
        className="text-2xl font-bold mt-4 mb-2 p-3 sm:p-4"
        data-aos="fade-right"
        data-aos-delay="300"
      >
        Shop Popular Categories
      </h2>

      {/* Render slider only if categories are available */}
      {allCategories ? (
        <Slider {...settings} arrows={false} className="w-full h-full">
          {allCategories.map((category) => (
            <div
              key={category._id}
              className="h-80 w-full overflow-hidden flex flex-col items-center mt-8 rounded-md shadow-md bg-white cursor-pointer p-3 sm:p-4"
            >
              {/* Category image with hover effect */}
              <div className="w-full h-60 overflow-hidden rounded-md">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="w-full h-full object-contain sm:object-cover md:object-cover  transform transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Category name with fade-up animation */}
              <h3
                className="text-center text-lg font-semibold mt-2 text-gray-800"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                {category.name}
              </h3>
            </div>
          ))}
        </Slider>
      ) : (
        // Show loading again if data becomes null unexpectedly
        <LazyLoading message="Loading Categories..." fullPage={false} />
      )}
    </div>
  );
}
