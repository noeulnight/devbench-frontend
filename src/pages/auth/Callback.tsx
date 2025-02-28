import { useEffect, useCallback } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLoginCallback } from "../../hooks/quries/useAuth";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { queryClient } from "../../main";

export default function Callback() {
  const { mutateAsync: loginCallback } = useLoginCallback();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["accessToken"]);

  const code = searchParams.get("code");

  const handleLoginCallback = useCallback(async () => {
    if (!code) return navigate("/");

    try {
      const data = await loginCallback({ code });
      setCookie("accessToken", data.accessToken, {
        path: "/",
        secure: false,
        maxAge: 60 * 60 * 24 * 5,
        httpOnly: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    } catch {
      toast.error("로그인에 실패했습니다.", { icon: "😭" });
    } finally {
      navigate("/");
    }
  }, [code, loginCallback, navigate, setCookie]);

  useEffect(() => {
    handleLoginCallback();
  }, [handleLoginCallback]);

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
