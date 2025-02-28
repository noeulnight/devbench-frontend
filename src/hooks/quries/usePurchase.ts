import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../utils/axios";
import { PurchaseResponse, PurchasesResponse } from "../../types/purchase";
import { queryClient } from "../../main";

const buyProduct = async (productId: number) => {
  const { data } = await axiosClient.post<PurchaseResponse>(`/purchase`, {
    productId,
  });
  return data;
};

export const useBuyPurchase = (productId: number) => {
  return useMutation({
    mutationFn: () => buyProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

const fetchPurchase = async (purchaseId: string) => {
  const { data } = await axiosClient.get<PurchaseResponse>(
    `/purchase/${purchaseId}`
  );
  return data;
};

export const usePurchase = (purchaseId?: string) => {
  return useQuery({
    queryKey: ["purchase", purchaseId],
    queryFn: () => fetchPurchase(purchaseId ?? ""),
    enabled: !!purchaseId,
  });
};

const fetchPurchases = async () => {
  const { data } = await axiosClient.get<PurchasesResponse>(`/purchase`);
  return data;
};

export const usePurchases = () => {
  return useQuery({
    queryKey: ["purchases"],
    queryFn: fetchPurchases,
  });
};
