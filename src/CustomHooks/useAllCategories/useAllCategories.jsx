import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useAllCategories() {
  function getAllCategories() {
    // Fetch or retrieve category data here
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const queryResult = useQuery({
    queryKey: ["categoryDetails"], // Unique key for the query
    queryFn: getAllCategories, // Function to fetch data
  });
  return queryResult;
}
