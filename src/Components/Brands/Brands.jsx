import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LazyLoading from "../LazyLoading/LazyLoading";
import { useEffect } from "react";
import Aos from "aos";
import useAOS from "../../CustomHooks/useAOS/useAOS";

function Brands() {
  function getAllBrands() {
    // Fetch or retrieve brand data here
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["brandDetails"], // Unique key for the query
    queryFn: getAllBrands, // Function to fetch data
  });

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
    return <LazyLoading message="Loading Brands..." fullPage={true} />;
  }
  if (error) {
    return <div>Error fetching brands: {error.message}</div>;
  }
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h2
          className="text-2xl font-bold mb-2"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          Brands
        </h2>
        <p
          className="text-gray-600 mb-6"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          Explore our diverse range of brands.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {/* Example brand card */}
          {data.data.data.map((brand, index) => (
            <div
              key={brand._id}
              data-aos="fade-up"
              data-aos-delay={(index % 6) * 100}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center capitalize cursor-pointer "
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full object-fill mb-4 transition-transform duration-300 hover:scale-105"
              />
              <h3 className="text-lg font-semibold text-center text-gray-400">
                {brand.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Brands;
