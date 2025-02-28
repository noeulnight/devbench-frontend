import { useMutation } from "@tanstack/react-query";
import { AuthDto, AuthResponse } from "../../types/auth";
import { axiosClient } from "../../utils/axios";
import { queryClient } from "../../main";

const loginCallback = async (authDto: AuthDto) => {
  const { data } = await axiosClient.post<AuthResponse>(
    "/auth/callback",
    authDto
  );
  return data;
};

export const useLoginCallback = () => {
  return useMutation({
    mutationFn: loginCallback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
