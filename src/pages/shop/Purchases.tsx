import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { usePurchases } from "../../hooks/quries/usePurchase";
import { PurchaseResponse, PurchaseStatus } from "../../types/purchase";
import { AiOutlineLoading } from "react-icons/ai";
import toast from "react-hot-toast";

function PurchaseItem({ item }: { item: PurchaseResponse }) {
  const navigate = useNavigate();

  return (
    <div
      className={`flex w-full p-4 rounded-lg shadow-md bg-[#282828] cursor-pointer transition-all duration-150 hover:scale-105`}
      onClick={() => navigate(`/purchase/${item.id}`)}
    >
      <div className="flex items-center gap-4 justify-between w-full">
        <div className="flex flex-col gap-2">
          <p>주문번호: {item.id}</p>
          <p>상품명: {item.product.name}</p>
        </div>
        <p>{PurchaseStatus[item.status as keyof typeof PurchaseStatus]}</p>
      </div>
    </div>
  );
}

export default function Purchases() {
  const { data, isLoading } = usePurchases();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center">
          <AiOutlineLoading className="w-6 h-6 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!isLoading && !data) {
    toast.error("로그인이 필요합니다.");
    navigate("/");
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold">결제 내역</h1>
      <p className="text-sm text-gray-400 whitespace-pre-line mt-2">
        모든 상품의 결제 내역입니다.
      </p>
      <div className="flex flex-col gap-4 mt-10 w-full">
        {data?.nodes.map((item) => (
          <PurchaseItem key={item.id} item={item} />
        ))}
      </div>
    </Layout>
  );
}
