import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../utils/axios";
import { UserResponse } from "../../types/user";

const fetchMe = async () => {
  const { data } = await axiosClient.get<UserResponse>("/user/me");

  return data;
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchMe,
    retry: false,
    staleTime: 0,
  });
};
