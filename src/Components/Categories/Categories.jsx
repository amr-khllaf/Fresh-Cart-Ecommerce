import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LazyLoading from "../LazyLoading/LazyLoading";
import { useEffect } from "react";
import Aos from "aos";
import useAllCategories from "../../CustomHooks/useAllCategories/useAllCategories";
import useAOS from "../../CustomHooks/useAOS/useAOS";

function Categories() {
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

  // // Initialize AOS when component mounts
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
    return <LazyLoading message="Loading Categories..." fullPage={true} />;
  }
  if (error) {
    return <div>Error fetching categories: {error.message}</div>;
  }
  return (
    <>
      <div className="container mx-auto px-2 sm:px-4 py-8">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-2"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          Categories
        </h2>
        <p
          className="text-gray-600 mb-6 text-base sm:text-lg"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Explore our diverse range of categories.
        </p>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
          {data.data.data.map((category, index) => (
            <div
              key={category._id}
              data-aos="fade-up"
              data-aos-delay={(index % 6) * 50}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 sm:p-4 flex flex-col items-center capitalize cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-80 sm:h-48 md:h-52 lg:h-60 object-fill md:object-cover mb-3 sm:mb-4 transition-transform duration-300 hover:scale-105"
              />
              <h3 className="text-base sm:text-lg font-semibold text-center text-gray-400">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
