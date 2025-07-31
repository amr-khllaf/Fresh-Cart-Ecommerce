import { motion } from "framer-motion";
import { ThreeDots } from "react-loader-spinner";

function LazyLoading({ message = "Loading...", fullPage = false }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${
        fullPage ? "fixed inset-0 z-50" : "relative w-full h-full"
      } bg-white/85 backdrop-blur-sm flex justify-center items-center`}
    >
      <div className="flex flex-col items-center">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <p className="mt-4 text-lg text-gray-700 font-medium animate-pulse">
          {message}
        </p>
      </div>
    </motion.div>
  );
}

export default LazyLoading;
