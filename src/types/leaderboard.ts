export interface LeaderboardResponse {
  nodes: LeaderboardNode[];
  totalCount: number;
}

export interface LeaderboardNode {
  xp: number;
  level: number;
  currentRank: number;
  previousRank: number;
  rankDifference: number;
  updatedAt: string;
  user: {
    id: string;
    nickname: string;
    avatarUrl: string;
  };
}
