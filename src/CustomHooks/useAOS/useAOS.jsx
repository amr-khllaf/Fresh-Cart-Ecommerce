import Aos from "aos";
import { useEffect } from "react";

export default function useAOS(options = {}, dependencies = []) {
  // Default settings
  const defaultOptions = {
    duration: 1000,
    mirror: true,
    easing: "ease-in-out",
    delay: 100,
  };

  // Initialize AOS on mount with merged options
  useEffect(() => {
    Aos.init({ ...defaultOptions, ...options });
  }, []);

  // Refresh AOS when dependencies change
  useEffect(() => {
    Aos.refresh();
  }, dependencies);
}
