import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../utils/axios";
import { LeaderboardResponse } from "../../types/leaderboard";

const fetchLeaderboard = async () => {
  const { data } = await axiosClient.get<LeaderboardResponse>(
    "/leaderboard?pageSize=100&page=1"
  );
  return data;
};

export const useLeaderboard = () => {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard,
    retry: false,
    staleTime: 0,
  });
};
