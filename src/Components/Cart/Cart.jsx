import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import LazyLoading from "../LazyLoading/LazyLoading";
import toast from "react-hot-toast";

function Cart() {
  const { allProducts, totalCartPrice, updateCount, removeFromCart } =
    useContext(CartContext);
  function handleCountUpdate(productId, newCount) {
    updateCount(productId, newCount);
  }

  async function handleRemoveFromTheCart(productId) {
    const isRemovedFlag = await removeFromCart(productId);
    if (isRemovedFlag) {
      // Handle successful removal (e.g., show a success message)
      toast.success("Product removed from cart successfully!");
    } else {
      // Handle failed removal (e.g., show an error message)
      toast.error("Failed to remove product from cart.");
    }
  }

  return (
    <div className="py-8 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex flex-col justify-start items-start space-y-2 mb-6 ">
        <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 ">
          Your Cart
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 w-full">
        <div className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Order Summary
            </h2>
            <div className="flex justify-between mt-4">
              <span className="text-gray-600 dark:text-gray-300">
                Total Price
              </span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {totalCartPrice} EGP
              </span>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-gray-600 dark:text-gray-300">
                Total Items
              </span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {allProducts?.length || 0}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            {allProducts && allProducts.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {allProducts.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex-shrink-0 w-40 h-40 mr-4">
                      <img
                        src={product.product.imageCover}
                        alt={product.product.title}
                        className="w-full h-full object-cover rounded-md"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {product.product.title}
                      </h3>
                      <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                        {product.price} EGP
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                        <button
                          onClick={() =>
                            handleCountUpdate(
                              product.product._id,
                              product.count - 1
                            )
                          }
                          disabled={product.count <= 1}
                          className={`px-3 py-1 text-gray-600 dark:text-gray-400 rounded-l-md transition-colors cursor-pointer ${
                            product.count <= 1
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-red-100 dark:hover:bg-red-700"
                          }`}
                          type="button"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M20 12H4"
                            ></path>
                          </svg>
                        </button>
                        <input
                          type="text"
                          className="w-10 text-center border-none focus:ring-0 text-gray-900 dark:text-white bg-transparent"
                          value={product.count}
                          readOnly
                        />
                        <button
                          onClick={() =>
                            handleCountUpdate(
                              product.product._id,
                              product.count + 1
                            )
                          }
                          className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-green-700 rounded-r-md transition-colors cursor-pointer"
                          type="button"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v12m6-6H6"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          handleRemoveFromTheCart(product.product._id);
                        }}
                        className="remove text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <LazyLoading
                  fullPage={false}
                  message="Loading Cart Products..."
                />
              </div>
            )}
          </div>

          {allProducts && allProducts.length > 0 && (
            <div className="p-4 bg-gray-50 dark:bg-gray-700">
              <button className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow transition-colors cursor-pointer">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
