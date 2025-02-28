import { useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useQueryClient } from "@tanstack/react-query";

export default function Logout() {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["accessToken"]);
  const queryClient = useQueryClient();

  useEffect(() => {
    setCookie("accessToken", "", {
      path: "/",
      secure: false,
      maxAge: 0,
      httpOnly: false,
    });

    queryClient.resetQueries({
      queryKey: ["user"],
    });

    navigate("/", {
      replace: true,
      flushSync: true,
    });
  }, [navigate, queryClient, setCookie]);

  return (
    <div className="w-full h-screen bg-[#1A1A1A] text-white font-plus-jakarta-sans">
      <div className="flex items-center justify-center h-full">
        <div>
          <div>
            <p className="text-right text-sm">개발자들을 위한 쉼터</p>
            <div className="flex items-center">
              <img src="/logo.png" alt="logo" className="w-10 h-10" />
              <h1 className="text-3xl">DevBench</h1>
            </div>
          </div>

          <div className="flex items-center justify-center mt-10 text-xl">
            <AiOutlineLoading className="animate-spin  w-10 h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
