import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function Notfound() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">
          저런, 여기는 올바르지 않은 길이에요
        </h1>
        <img
          src="https://http.cat/404"
          alt="404"
          className="w-1/2 mx-auto mt-4"
        />
        <button
          onClick={() => navigate("/")}
          className="text-sm text-white mt-4 hover:underline cursor-pointer"
        >
          대신 귀여운 고양이를 드립니다.
        </button>
      </div>
    </Layout>
  );
}
