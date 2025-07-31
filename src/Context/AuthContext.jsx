import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthContext({ children }) {
  // You can add state and functions here to manage authentication
  const [token, setToken] = useState(null);

  // We Will Use `useEffect` to check if the token exists in localStorage
  // and set it in the context when the component mounts.

  useEffect(() => {
    const storedUserToken = localStorage.getItem("userToken");
    // Check if the token exists in localStorage
    // If it does, set it in the context state
    if (storedUserToken !== null) {
      setToken(storedUserToken);
    }
  }, []);

  return (
    <authContext.Provider value={{ token: token, setToken: setToken }}>
      {children}
    </authContext.Provider>
  );
}
