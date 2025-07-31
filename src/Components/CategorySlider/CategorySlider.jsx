import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import LazyLoading from "../LazyLoading/LazyLoading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Aos from "aos";
import useAllCategories from "../../CustomHooks/useAllCategories/useAllCategories";
import useAOS from "../../CustomHooks/useAOS/useAOS";

export default function CategorySlider() {
  // const [allCategories, setAllCategories] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    cssEase: "linear",
  };

  // useEffect(() => {
  //   async function fetchCategories() {
  //     try {
  //       const response = await axios.get(
  //         "https://ecommerce.routemisr.com/api/v1/categories"
  //       );
  //       setAllCategories(response.data.data);
  //     } catch (error) {
  //       console.log("Error fetching categories:", error);
  //     }
  //   }
  //   fetchCategories();
  // }, []);

  // ----- Applying useQuery to fetch categories -----
  // function getAllCategories() {
  //   // Fetch or retrieve category data here
  //   return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  // }
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["categoryDetails"], // Unique key for the query
  //   queryFn: getAllCategories, // Function to fetch data
  // });

  // --------------Using Custom Hook -----------

  const { data, isLoading, error } = useAllCategories();

  // Initialize AOS when component mounts
  // useEffect(() => {
  //   Aos.init({
  //     duration: 1000,
  //     mirror: true,
  //     easing: "ease-in-out",
  //     delay: 100,
  //   });
  // }, []);

  // // Refresh AOS when new data (products) is available
  // useEffect(() => {
  //   if (data) {
  //     Aos.refresh();
  //   }
  // }, [data]);

  // ----------- Use AOS custom Hook -----------
  useAOS([data]);

  if (isLoading) {
    return <LazyLoading message="Loading Categories..." fullPage={false} />;
  }
  if (error) {
    return <div>Error fetching categories: {error.message}</div>;
  }
  const allCategories = data.data.data;

  return (
    <div className="relative min-h-[300px]">
      <h2 className="text-2xl font-bold mt-4 mb-2">Shop Popular Categories</h2>
      {allCategories ? (
        <Slider {...settings} arrows={false} className="w-full h-full">
          {allCategories.map((category) => (
            <div
              key={category._id}
              className="h-80 w-full overflow-hidden flex flex-col items-center mt-8 rounded-md shadow-md bg-white"
            >
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="w-full h-60 object-fill rounded-md hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-center text-lg font-semibold mt-2 text-gray-800">
                {category.name}
              </h3>
            </div>
          ))}
        </Slider>
      ) : (
        <LazyLoading message="Loading Categories..." fullPage={false} />
      )}
    </div>
  );
}
