import { Link } from "react-router-dom";
import Apple from "../../assets/images/Apple.png";
import PlayStore from "../../assets/images/play-store.png";
import Visa from "../../assets/images/Visa.png";
import MasterCard from "../../assets/images/MasterCard.png";
import PayPal from "../../assets/images/PayPal.png";
import Amazon from "../../assets/images/Amazon.png";
function Footer() {
  return (
    <footer className="bg-gray-100 shadow-md mt-8">
      <div className="container mx-auto py-4">
        <div className="top-footer">
          <h2>Get The Fresh Cart App</h2>
          <p className="text-sm text-gray-600/75">
            We Will Send You a Link Open It On Your Phone To Download The App{" "}
          </p>
          {/* Group input and button in a flex row with gap */}
          <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-5">
            <input
              type="email"
              placeholder="Enter Your Email ..."
              className="p-2 rounded border border-gray-300 w-full md:w-[75%] focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="w-full md:w-[20%] bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300 cursor-pointer">
              Share App Link
            </button>
          </div>
        </div>
        <div className="bottom-footer mt-8 py-6 border-t border-b border-gray-300 flex flex-col md:flex-row justify-between items-center">
          <div className="left-bottom flex items-center gap-4">
            <p>Payment Partners</p>
            <ul className="flex gap-2 items-center">
              <li>
                <Link to="#">
                  <img
                    className="w-8 h-8 object-contain"
                    src={Visa}
                    alt="Visa Card Payment Method"
                  />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <img
                    className="w-8 h-8 object-contain"
                    src={MasterCard}
                    alt="MasterCard Payment Method"
                  />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <img
                    className="w-8 h-8 object-contain"
                    src={PayPal}
                    alt="PayPal Payment Method"
                  />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <img
                    className="w-8 h-8 object-contain"
                    src={Amazon}
                    alt="Amazon Payment Method"
                  />
                </Link>
              </li>
            </ul>
          </div>
          <div className="right-bottom mt-4 md:mt-0 flex items-center gap-4">
            <p>Get Delivers With Fresh Cart</p>
            <div className="flex gap-4">
              <a
                href="https://www.apple.com/app-store/"
                className="block"
                target="_blank"
              >
                <div className="app-store bg-black flex items-center rounded hover:bg-gray-800 transition duration-300 px-6 py-2">
                  <img
                    className="w-8 h-8 object-contain cursor-pointer"
                    src={Apple}
                    alt="Apple Store"
                  />
                  <div className="flex flex-col justify-center items-start ml-3">
                    <p className="text-[8px] text-zinc-200/50 text-center">
                      Available On The
                    </p>
                    <p className="text-sm text-white">Apple Store</p>
                  </div>
                </div>
              </a>
              <a
                href="https://play.google.com/store"
                className="block"
                target="_ blank"
              >
                {" "}
                <div className="google-play bg-black flex items-center rounded hover:bg-gray-800 transition duration-300 px-3 py-2">
                  <img
                    className="w-8 h-8 object-contain cursor-pointer"
                    src={PlayStore}
                    alt="Google Play Store"
                  />
                  <div className="flex flex-col justify-center items-start ml-3">
                    <p className="text-[8px] text-zinc-200/50 text-center">
                      Available On The
                    </p>
                    <p className="text-xs text-white">Google Play Store</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-4 text-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Fresh Cart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
