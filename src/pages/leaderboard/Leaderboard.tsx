import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineLine,
  AiOutlineLoading,
} from "react-icons/ai";
import Layout from "../../components/Layout";
import { useLeaderboard } from "../../hooks/quries/useLeaderboard";
import { LeaderboardNode } from "../../types/leaderboard";
import { useUserData } from "../../hooks/useUserData";
import { UserResponse } from "../../types/user";

function LankDifference({ rankDifference }: { rankDifference: number }) {
  return (
    <p className="flex items-center gap-1">
      {rankDifference !== 0 ? (
        rankDifference > 0 ? (
          <>
            <AiFillCaretUp className="text-green-500" />
            {rankDifference}
          </>
        ) : (
          <>
            <AiFillCaretDown className="text-red-500" />
            {rankDifference}
          </>
        )
      ) : (
        <AiOutlineLine className="text-gray-500" />
      )}
    </p>
  );
}

function LeaderboardItem({
  item,
  userId,
}: {
  item: LeaderboardNode;
  userId?: string;
}) {
  const isMe = userId === item.user.id;

  return (
    <div
      className={`flex w-full p-4 rounded-lg shadow-md ${
        isMe ? "bg-[#38394b]" : "bg-[#282828]"
      }`}
    >
      <div className="flex items-center gap-4 justify-between w-full">
        <div className="flex items-center gap-2">
          <p className="w-8 text-center">{item.currentRank}</p>
          <div className="flex items-center gap-1">
            <img
              src={item.user.avatarUrl}
              alt={`${item.user.nickname}'s profile`}
              className="w-8 h-8 rounded-full"
            />
            <p>{item.user.nickname}</p>
            <div className="md:flex gap-2 items-center text-sm text-gray-400 hidden">
              <p>{item.level} 레벨</p>
              <div className="w-1 h-1 rounded-full bg-white" />
              <p>{item.xp.toLocaleString("ko-KR")}XP</p>
            </div>
          </div>
        </div>
        <LankDifference rankDifference={item.rankDifference} />
      </div>
    </div>
  );
}

function UserLeaderboardItem({ user }: { user: UserResponse }) {
  return (
    <div className="flex w-full p-8 rounded-lg shadow-md bg-[#282828] justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <img
            src={user.avatarUrl}
            alt={`${user.nickname}'s profile`}
            className="w-8 h-8 rounded-full"
          />
          <p className="text-xl md:text-2xl font-semibold">{user.nickname}</p>
        </div>
        <div className="flex gap-2 items-center text-sm md:text-base">
          <p>{user.leaderboard.level} 레벨</p>
          <div className="w-1 h-1 rounded-full bg-white" />
          <p>{user.leaderboard.xp.toLocaleString("ko-KR")}XP</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <p className="text-sm text-gray-400">현재 순위</p>
        <p className="text-2xl font-semibold">
          {user.leaderboard.currentRank}위
        </p>
      </div>
    </div>
  );
}

export default function Leaderboard() {
  const { data, isLoading } = useLeaderboard();
  const { user } = useUserData();

  if (!data && !isLoading) {
    return <div>No data</div>;
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold">리더보드</h1>
      <p className="text-sm text-gray-400 whitespace-pre-line mt-2">
        100위까지 디벤치 활동을 기반으로 랭킹이 결정됩니다.
        <br />매 5분마다 리더보드가 갱신됩니다.
      </p>
      <div className="flex flex-col gap-4 mt-10 w-full">
        <p className="text-sm">
          마지막 갱신:{" "}
          {data?.nodes && data.nodes.length > 0
            ? new Date(data?.nodes[0]?.updatedAt)?.toLocaleString("ko-KR")
            : "N/A"}
        </p>
        {user && (
          <>
            <UserLeaderboardItem user={user} />
            <div className="w-full h-[1px] bg-white" />
          </>
        )}
        {isLoading && (
          <div className="flex justify-center items-center w-full h-full">
            <AiOutlineLoading className="w-6 h-6 animate-spin" />
          </div>
        )}
        {data &&
          !isLoading &&
          data.nodes?.map((item) => (
            <LeaderboardItem key={item.user.id} item={item} userId={user?.id} />
          ))}
      </div>
    </Layout>
  );
}
