import axios from "axios";
import { useState, createContext, useEffect } from "react";

export const CartContext = createContext(); // Create CartContext
export default function CartContextProvider({ children }) {
  const [allProducts, setAllProducts] = useState(null); // State to hold all products
  const [totalCartPrice, setTotalCartPrice] = useState(0); // State to hold total cart price
  const [numberOfCartItems, setNumberOfCartItems] = useState(0); // State to hold number of cart items
  async function addProductToCart(productId) {
    // Logic to add product to cart
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId, // the ID of the product to add
        },
        {
          headers: {
            token: localStorage.getItem("userToken") || "", // Use token from localStorage
          },
        }
      )
      .then((response) => {
        // console.log(response.data.numOfCartItems); // Log the number of cart items
        //   setNumberOfCartItems(response.data.numOfCartItems); // Update the number of cart items

        //   setAllProducts(response.data.products); // Update the allProducts state with the new cart items

        //   setTotalCartPrice(response.data.totalCartPrice); // Update the total cart price

        //   return true; // Return true to indicate success
        // })
        // .catch((error) => {
        //   console.error("Error adding product to cart:", error);
        getUserCart();
        return true;
      });
  }

  // Function To get User Cart
  async function getUserCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("userToken") || "", // Use token from localStorage
        },
      })
      .then((response) => {
        // console.log("User cart retrieved successfully:", response.data);
        setNumberOfCartItems(response.data.numOfCartItems); // Update the number of cart items
        setAllProducts(response.data.data.products); // Update the allProducts state with the retrieved cart items
        setTotalCartPrice(response.data.data.totalCartPrice); // Update the total cart price
      })
      .catch((error) => {
        console.error("Error retrieving user cart:", error);
        return null;
      });
  }
  // Get user Cart when the user make a refresh
  useEffect(() => {
    getUserCart();
  }, []);

  // Update The Cart Product Quantity

  async function updateCount(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: newCount,
        },
        {
          headers: {
            token: localStorage.getItem("userToken") || "", // Use token from localStorage
          },
        }
      )
      .then((response) => {
        // Handle successful response
        setNumberOfCartItems(response.data.numOfCartItems); // Update the number of cart items
        setAllProducts(response.data.data.products); // Update the allProducts state with the retrieved cart items
        setTotalCartPrice(response.data.data.totalCartPrice); // Update the total cart price
        return response;
      })
      .catch((error) => {
        console.error("Error updating product quantity:", error);
        return error;
      });
  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart, // Function to add product to cart
        allProducts, // All products in the cart
        totalCartPrice, // Total price of all products in the cart
        numberOfCartItems, // Number of items in the cart
        getUserCart, // Function to get user cart
        updateCount, // Function to update product quantity in the cart
      }}
    >
      {/* Provide any cart-related state or functions here */}
      {/* For example, you can manage cart items, total price, etc. */}
      {/* Value is the object that have the shared data */}
      {children}
    </CartContext.Provider>
  );
}
