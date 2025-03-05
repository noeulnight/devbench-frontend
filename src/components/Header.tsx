import { useNavigate } from "react-router-dom";
import { FaDiscord } from "react-icons/fa";
import { useUserData } from "../hooks/useUserData";
import { useState } from "react";
import UserDrawer from "./UserDrawer";
import { AiOutlineMenu } from "react-icons/ai";

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useUserData();
  const navigate = useNavigate();

  return (
    <>
      <UserDrawer open={isOpen} onClose={() => setIsOpen(false)} />
      <div className="flex items-center justify-between h-[50px] sticky top-0 z-10 bg-[#1a1a1a] w-full p-3">
        <div className="flex items-center gap-8">
          <button
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="/logo.png" alt="logo" className="w-7 h-7" />
            <h1>DevBench</h1>
          </button>
          <div className="hidden md:flex items-center gap-5">
            <button
              className="hover:text-[#bbbaba] transition-all duration-150 cursor-pointer"
              onClick={() => navigate("/leaderboard")}
            >
              리더보드
            </button>
            <button
              className="hover:text-[#bbbaba] transition-all duration-150 cursor-pointer"
              onClick={() => navigate("/store")}
            >
              포인트 상점
            </button>
            {user && (
              <button
                className="hover:text-[#bbbaba] transition-all duration-150 cursor-pointer"
                onClick={() => navigate("/purchase")}
              >
                결제 내역
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="text-[#8c95f7] px-4 py-2 font-semibold cursor-pointer items-center gap-2 hidden md:flex"
            onClick={() =>
              (window.location.href = "https://discord.gg/devbench")
            }
          >
            <FaDiscord />
            디스코드
          </button>
          {!user && (
            <button
              className="text-white font-semibold cursor-pointer"
              onClick={() => (window.location.href = "/api/auth/login")}
            >
              로그인
            </button>
          )}
          {user && (
            <button
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <img
                src={
                  user.avatarUrl ||
                  "https://cdn.discordapp.com/embed/avatars/0.png"
                }
                alt="avatar"
                className="w-6 h-6 rounded-full"
              />
              <span>{user.nickname}</span>
            </button>
          )}
          <button
            className="text-white font-semibold cursor-pointer md:hidden block"
            onClick={() => setIsOpen(true)}
          >
            <AiOutlineMenu className="text-xl" />
          </button>
        </div>
      </div>
    </>
  );
}
