import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../utils/axios";
import { ProductResponse } from "../../types/product";

const fetchProduct = async () => {
  const { data } = await axiosClient.get<ProductResponse>(
    "/product?pageSize=100"
  );
  return data;
};

export const useProduct = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: fetchProduct,
  });
};
