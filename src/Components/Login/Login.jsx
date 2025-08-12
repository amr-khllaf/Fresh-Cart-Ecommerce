import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { ColorRing } from "react-loader-spinner";
import { AuthContext } from "../../Context/AuthContext";
import LazyLoading from "../LazyLoading/LazyLoading";
import { CartContext } from "../../Context/CartContext";

function Login() {
  const { getUserCart } = useContext(CartContext);
  const navigate = useNavigate(); // Assuming you have useNavigate imported from 'react-router-dom'
  const [loginFailMessage, setLoginFailMessage] = useState(null);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState(false);
  const [submitButtonFormIsClicked, setSubmitButtonFormIsClicked] =
    useState(false);
  let user = {
    email: "",
    password: "",
  };
  // Using AuthContext to manage authentication state
  const { setToken } = useContext(AuthContext);

  function loginUser(values) {
    setSubmitButtonFormIsClicked(true); // Set the button state to clicked
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(function (x) {
        // Handle success response
        // You can redirect the user or show a success message here

        // Store the token in localStorage or sessionStorage
        localStorage.setItem("userToken", x.data.token); // Store token in localStorage
        setToken(x.data.token); // Update the context with the new token instead of local state

        getUserCart(); // Fetch the user's cart after login

        setLoginSuccessMessage(true);
        setSubmitButtonFormIsClicked(false); // Reset the button state

        setTimeout(() => {
          navigate("/");
        }, 2000); // Redirect to Products Page after 2 seconds
        setLoginFailMessage(null); // Clear any previous error messages
      })
      .catch(function (x) {
        // Handle error response

        setLoginFailMessage(x.response.data.message);
        setSubmitButtonFormIsClicked(false); // Reset the button state
        // You can redirect the user or show an error message here
        setTimeout(() => {
          setLoginFailMessage(null);
        }, 2000);
      });
  }

  // Initialize Formik
  const LoginFormik = useFormik({
    initialValues: user,
    onSubmit: loginUser,

    validationSchema: yup.object().shape({
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(12, "Password must not exceed 12 characters")
        .required("Password is required"),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
  }); // <-- Add this closing brace to end useFormik and Register function body

  // Create a loading state
  // This will be used to show a loading spinner while the form is being submitted

  //
  const [Loading, setLoading] = useState(true);
  // Create Lazy Loaded For 2 Seconds When Refreshing the Page
  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (Loading)
    return <LazyLoading message="Loading Login..." fullPage={true} />;

  return (
    <>
      {/* Failure Message */}
      {loginFailMessage ? (
        <div
          class=" container mx-auto  flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
          role="alert"
        >
          <svg
            class="shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>

          <div>{loginFailMessage}</div>
        </div>
      ) : (
        ""
      )}

      {/* Success Message */}
      {loginSuccessMessage ? (
        <div
          class=" container mx-auto  flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
          role="alert"
        >
          <svg
            class="shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>

          <div> Welcome Back... </div>
        </div>
      ) : (
        ""
      )}
      <div>
        <h2 className="text-2xl mb-6 text-center ">Login Now:</h2>
        <form onSubmit={LoginFormik.handleSubmit} className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              value={LoginFormik.values.email}
              onChange={LoginFormik.handleChange}
              onBlur={LoginFormik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-500-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
            {LoginFormik.errors.email && LoginFormik.touched.email ? (
              <div
                className="flex items-center p-3 mb-4 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>{LoginFormik.errors.email}</div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              value={LoginFormik.values.password}
              onChange={LoginFormik.handleChange}
              onBlur={LoginFormik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-500-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {LoginFormik.errors.password && LoginFormik.touched.password ? (
              <div
                className="flex items-center p-3 mb-4 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>{LoginFormik.errors.password}</div>
              </div>
            ) : (
              ""
            )}
          </div>

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer"
          >
            {submitButtonFormIsClicked ? (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            ) : (
              "Login Now"
            )}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
