import { LeaderboardNode } from "./leaderboard";

export interface UserResponse {
  id: string;
  nickname: string;
  avatarUrl: string;
  level: number;
  point: number;
  xp: number;
  leaderboard: LeaderboardNode;
}
