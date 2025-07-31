import axios from "axios";
import { useEffect, useState } from "react";
import HomeSlider from "../HomeSlider/HomeSlider";
import img1 from "../../assets/images/blog-img-1.jpeg";
import img2 from "../../assets/images/blog-img-2.jpeg";
import LazyLoading from "../LazyLoading/LazyLoading";
import AOS from "aos";
import "aos/dist/aos.css";
import CategorySlider from "../CategorySlider/CategorySlider";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useAOS from "../../CustomHooks/useAOS/useAOS";
import { Link } from "react-router-dom";

function Products() {
  // This component will render the products
  // You can fetch products from an API or use static data
  // const [allProducts, setAllProducts] = useState(null);
  // async function getAllProducts() {
  //   const { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/products"
  //   );

  //   setAllProducts(data.data);
  // }

  // // Call the function to fetch products in componentMount or useEffect
  // // If using functional components, you can use useEffect

  // useEffect(() => {
  //   getAllProducts();
  //   // Initialize AOS for animations
  //   AOS.init({
  //     duration: 1000, // Animation duration in milliseconds
  //     // once: false, // Whether animation should happen only once
  //     mirror: true, // Whether elements should animate out while scrolling past them
  //     easing: "ease-in-out", // Easing function for the animations
  //     delay: 100, // Delay before the animation starts
  //   });
  // }, []);

  // -----------------Applying Use Query -------------------

  // Function to fetch all products
  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["productDetails"], // Unique key for the query
    queryFn: getAllProducts, // Function to fetch data
    // ----- Options for the query -----
    // refetchOnMount: false, // Do not refetch on mount
    // refetchInterval: 10000, // Refetch every 10 seconds
    // keepPreviousData: true, // Keep previous data while fetching new data
    // placeholderData: keepPreviousData, // Display previous data while loading new data
    // retry: 2, // Retry 2 times on failure
    // retryDelay: 1500, // Delay between retries in milliseconds
    // cacheTime: 300000, // Cache data for 5 minutes (300,000 milliseconds)
  });
  // console.log("Data:", data);
  // console.log("Is Loading:", isLoading);
  // console.log("Error:", error);
  // console.log("Is Fetching:", isFetching);

  // // Initialize AOS when component mounts
  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000,
  //     mirror: true,
  //     easing: "ease-in-out",
  //     delay: 100,
  //   });
  // }, []);

  // // Refresh AOS when new data (products) is available
  // useEffect(() => {
  //   if (data) {
  //     AOS.refresh();
  //   }
  // }, [data]);

  // ----------- Use AOS custom Hook -----------
  useAOS([data]);

  if (isLoading) {
    return <LazyLoading message="Loading Products..." fullPage={true} />;
  }
  if (error) {
    return <div>Error fetching products: {error.message}</div>;
  }

  const allProducts = data?.data?.data || []; // Handle case when data is undefined
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-4 my-4 items-center justify-between bg-gray-100 p-5 pb-7 rounded-md shadow-md mb-5 ">
          {/* Slider Section */}
          <div
            className="w-full md:w-[75%] sm:mb-3 md:mb-0 "
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <HomeSlider />
          </div>

          {/* Side Images Section */}
          <div className="w-full md:w-[25%] flex md:flex-col gap-8  py-3 md:py-0 rounded-md shadow-md">
            <div
              className="h-40 md:h-1/2 w-full overflow-hidden rounded-md"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              <img
                src={img1}
                alt="Blog 1"
                className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div
              className="h-40 md:h-1/2 w-full overflow-hidden rounded-md"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img
                src={img2}
                alt="Blog 2"
                className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
        {/* Category Slider */}
        <CategorySlider />

        {/* Products Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 p-4 ">
          <h2
            className="text-2xl font-bold mt-8 col-span-full"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            All Products
          </h2>
          {/* Products will be rendered here */}

          {allProducts.map((product, index) => (
            <Link
              key={product._id}
              to={`/productDetails/${product._id}`}
              data-aos="fade-up"
              data-aos-delay={(index % 6) * 100}
              className="product bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.imageCover}
                alt={product.title}
                loading="lazy"
                className="w-full object-cover rounded-md mb-4 hover:scale-105 transition-transform duration-300"
              />
              <h6 className="text-sm text-gray-500 mb-1">
                {product.category.name}
              </h6>
              <h2 className="text-lg font-semibold mb-2">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h2>
              <div className="flex flex-col w-full">
                <div className="flex items-center justify-between">
                  <span
                    className={`${
                      product.priceAfterDiscount
                        ? "line-through text-red-500 text-sm"
                        : "text-green-600 "
                    }`}
                  >
                    {product.price} <span className="text-sm">EGP</span>
                  </span>
                  {!product.priceAfterDiscount && (
                    <p className="flex items-center text-yellow-500 ml-2">
                      <i className="fa-solid fa-star mr-1"></i>
                      {product.ratingsAverage}
                    </p>
                  )}
                </div>
                {product.priceAfterDiscount && (
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-green-600 flex justify-between w-full">
                      <div className="flex items-center">
                        {product.priceAfterDiscount}
                        <span className="text-sm ml-1">EGP</span>
                      </div>
                      <div className="flex items-center text-yellow-500">
                        <i className="fa-solid fa-star mr-1"></i>
                        {product.ratingsAverage}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
