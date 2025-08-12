import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import LazyLoading from "../LazyLoading/LazyLoading";
import useAOS from "../../CustomHooks/useAOS/useAOS";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

function ProductDetails() {
  const { addProductToCart } = useContext(CartContext);
  const navigate = useNavigate();
  async function handleAddProduct(id) {
    const responseFlag = await addProductToCart(id); // we will make it await to handel the async because the if condition will be applied after it so we need to handle it

    if (responseFlag) {
      // Message Success
      toast.success("Product added to cart successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      // Navigate to cart page
      // Show a loading toast while redirecting
      // toast.loading("Redirecting to cart...", {
      //   id: "redirect-toast",
      //   position: "top-center",
      //   duration: 3000,
      // });
      setTimeout(() => {
        toast.dismiss("redirect-toast"); // Dismiss the loading toast
        navigate("/cart");
      }, 3000);
    } else {
      // Problem With Response
      toast.error("Failed to add product to cart. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }
  const { id } = useParams(); // Get the product ID from the URL parameters
  // State to manage the image cover
  const [imageCover, setImageCover] = useState(null);

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
  });

  // ----------- Use AOS custom Hook -----------
  useAOS([data]);

  // Set initial imageCover when product data is available
  useEffect(() => {
    if (data?.data?.data && !imageCover) {
      setImageCover(data.data.data.image);
    }
  }, [data, imageCover]);

  if (isLoading) {
    return <LazyLoading message="Loading Product Details..." fullPage={true} />;
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
        <div className="p-6 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-red-200">
          <p className="text-red-600 text-lg font-semibold">
            Error fetching product details: {error.message}
          </p>
        </div>
      </div>
    );
  }

  const product = data.data.data;

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-12 transition-all duration-300 hover:shadow-2xl border border-gray-100">
        {/* Image Section */}
        <div className="flex flex-col items-center order-2 lg:order-1 space-y-8">
          <div
            className="relative group w-96"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <img
              src={imageCover || product.imageCover}
              alt={product.title}
              loading="lazy"
              className="w-96 h-[28rem] object-cover rounded-2xl border border-gray-200 shadow-lg group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          {product.images && product.images.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-center w-96">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Product thumbnail ${idx + 1}`}
                  onClick={() => setImageCover(img)}
                  loading="lazy"
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm hover:scale-110 hover:border-emerald-400 transition-all duration-300 cursor-pointer"
                />
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="flex flex-col h-full order-1 lg:order-2">
          {/* Top section: title + category + description */}
          <div
            className="flex-grow space-y-4"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <h1 className="text-3xl font-bold text-gray-900/90 tracking-tight">
              {product.title}
            </h1>
            <h5 className="text-sm font-medium text-gray-800 uppercase">
              {product.category.name}
            </h5>
            <p className="text-gray-600 leading-relaxed text-base">
              {product.description}
            </p>
          </div>

          {/* Optional separator line */}
          <div className="border-t border-gray-200 my-4" />

          {/* Bottom section: price + rating + add to cart button */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-600/70">
                EGP {product.price.toLocaleString()}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 text-lg">
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className="text-gray-700/60 font-semibold">
                  {product.ratingsAverage}
                </span>
              </div>
            </div>
            <button
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-2 px-6 rounded-xl font-semibold text-lg shadow-md hover:shadow-xl transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-200 cursor-pointer"
              onClick={() => handleAddProduct(product._id)}
            >
              + Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
