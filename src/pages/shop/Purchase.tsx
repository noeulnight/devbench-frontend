import Layout from "../../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { usePurchase } from "../../hooks/quries/usePurchase";
import { PurchaseStatus } from "../../types/purchase";
import { AiOutlineLoading } from "react-icons/ai";
import toast from "react-hot-toast";

export default function Purchase() {
  const { purchaseId } = useParams<{ purchaseId: string }>();
  const { data, isLoading } = usePurchase(purchaseId);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
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
      <h1 className="text-3xl font-bold">상품 결제 내역</h1>
      <p className="text-sm text-gray-400 whitespace-pre-line mt-2">
        {data?.product.name} 상품에 대한 결제 내역입니다.
      </p>
      <div className="flex flex-col gap-4 mt-10 w-full">
        <div className="flex flex-col">
          <p className="text-sm text-gray-400">주문 번호</p>
          <p className="text-2xl font-bold break-all">{data?.id}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-400">결제 상품</p>
          <p className="text-2xl font-bold">{data?.product.name}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-400">결제 금액</p>
          <p className="text-2xl font-bold">{data?.price.toLocaleString()}P</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-400">결제 일시</p>
          <p className="text-2xl font-bold">
            {data?.createdAt
              ? new Date(data?.createdAt).toLocaleString("ko-KR")
              : "N/A"}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-400">결제 상태</p>
          <p className="text-2xl font-bold">
            {PurchaseStatus[data?.status as keyof typeof PurchaseStatus]}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-400">결제내역으로 이동</p>
          <button
            className="bg-[#8C95F7] hover:bg-[#8C95F7]/80 text-white px-4 py-2 rounded-md w-24 mt-2 cursor-pointer"
            onClick={() => navigate("/purchase")}
          >
            이동
          </button>
        </div>
      </div>
    </Layout>
  );
}
