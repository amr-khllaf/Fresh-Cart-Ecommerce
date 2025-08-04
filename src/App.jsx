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

  return (
    <>
      {/* Provide the AuthContext to the entire app */}
      <AuthContext>
        <QueryClientProvider client={reactQueryClientConfig}>
          <CartContextProvider>
            <RouterProvider router={router} />
          </CartContextProvider>
        </QueryClientProvider>
      </AuthContext>
    </>
  );
}

export default App;
