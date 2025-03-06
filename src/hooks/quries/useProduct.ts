import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../utils/axios";
import { ProductResponse, SearchProduct } from "../../types/product";

const fetchProduct = async (searchProduct?: SearchProduct) => {
  const { data } = await axiosClient.get<ProductResponse>("/product", {
    params: {
      page: 1,
      pageSize: 10,
      ...searchProduct,
    },
  });
  return data;
};

export const useProduct = (searchProduct?: SearchProduct) => {
  return useQuery({
    queryKey: ["product", searchProduct],
    queryFn: () => fetchProduct(searchProduct),
  });
};
