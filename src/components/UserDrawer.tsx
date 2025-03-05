import { useNavigate } from "react-router-dom";
import { useUserData } from "../hooks/useUserData";
import { Drawer } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";

export default function UserDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { user } = useUserData();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      closeIcon={<AiOutlineClose className="text-white text-2xl" />}
      style={{ backgroundColor: "#1A1A1A" }}
      className="text-white"
    >
      <div className="flex flex-col items-center justify-center w-full gap-5">
        {user ? (
          <div className="flex flex-col items-center justify-center bg-[#282828] w-full p-5 rounded-lg shadow-md">
            <img
              src={
                user?.avatarUrl ||
                "https://cdn.discordapp.com/embed/avatars/0.png"
              }
              alt="avatar"
              className="w-24 h-24 rounded-full"
            />
            <p className="text-2xl mt-3 font-semibold">{user?.nickname}</p>
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <p className="text-sm">{user?.level} 레벨</p>
              <div className="w-1 h-1 bg-gray-500 rounded-full" />
              <p className="text-sm">{user?.xp} XP</p>
            </div>
            <p className="text-sm text-gray-400">
              {user?.point?.toLocaleString()}P
            </p>
            <button
              className="hover:text-[#bbbaba] text-red-500 transition-all duration-150 cursor-pointer mt-4"
              onClick={() => navigate("/auth/logout")}
            >
              로그아웃
            </button>
          </div>
        ) : (
          <button
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="/logo.png" alt="logo" className="w-10 h-10" />
            <h1 className="text-2xl font-semibold">DevBench</h1>
          </button>
        )}

        <div className="flex flex-col items-center justify-center w-full gap-5">
          <button
            className="hover:text-[#bbbaba] transition-all duration-150 text-xl font-bold cursor-pointer"
            onClick={() => handleNavigate("/leaderboard")}
          >
            리더보드
          </button>
          <button
            className="hover:text-[#bbbaba] transition-all duration-150 text-xl font-bold cursor-pointer"
            onClick={() => handleNavigate("/store")}
          >
            포인트 상점
          </button>
          {user && (
            <button
              className="hover:text-[#bbbaba] transition-all duration-150 text-xl font-bold cursor-pointer"
              onClick={() => handleNavigate("/purchase")}
            >
              결제 내역
            </button>
          )}
          <button
            className="text-[#8c95f7] text-xl font-semibold cursor-pointer items-center gap-2 hidden md:flex"
            onClick={() =>
              (window.location.href = "https://discord.gg/devbench")
            }
          >
            <FaDiscord />
            디스코드
          </button>
        </div>
      </div>
    </Drawer>
  );
}
