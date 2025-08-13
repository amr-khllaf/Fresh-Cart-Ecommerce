import React, { useEffect, useState } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createHashRouter, RouterProvider } from "react-router-dom"; // To support GitHub Pages

import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Notfound from "./Components/NotFound/Notfound";
import AuthContext from "./Context/AuthContext";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Products from "./Components/Products/Products";

import { QueryClient } from "./../node_modules/@tanstack/query-core/src/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import { Offline } from "react-detect-offline";

function App() {
  const router = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },

        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },

        {
          path: "*",
          element: <Notfound />,
        },
      ],
    }, // Routes
  ]);
  const reactQueryClientConfig = new QueryClient();

  const [isOnlineAgain, setIsOnlineAgain] = useState(false);

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnlineAgain(true);
      setTimeout(() => {
        setIsOnlineAgain(false);
      }, 3000);
    };

    window.addEventListener("online", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
    };
  }, []);

  return (
    <>
      {/* Provide the AuthContext to the entire app */}
      <AuthContext>
        <QueryClientProvider client={reactQueryClientConfig}>
          <CartContextProvider>
            <RouterProvider router={router} />
            <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
            <Offline>
              <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg border border-red-200 flex items-center justify-center z-50 animate-fadeIn">
                <span className="h-3 w-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                <span className="text-gray-800 dark:text-white font-medium text-sm">
                  Connection lost. Some features may be unavailable.
                </span>
              </div>
            </Offline>
            {isOnlineAgain && (
              <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg border border-green-200 flex items-center justify-center z-50 animate-fadeIn">
                <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                <span className="text-gray-800 dark:text-white font-medium text-sm">
                  You're back online!
                </span>
              </div>
            )}
          </CartContextProvider>
        </QueryClientProvider>
      </AuthContext>
    </>
  );
}

export default App;
