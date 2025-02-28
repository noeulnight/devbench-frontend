import { useUserData } from "../hooks/useUserData";
import { ConfigProvider, Modal } from "antd";
import { AiFillCaretRight } from "react-icons/ai";
import { ProductNode } from "../types/product";
import { useBuyPurchase } from "../hooks/quries/usePurchase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function PurchaseDrawer({
  open,
  onClose,
  item,
}: {
  open: boolean;
  onClose: () => void;
  item?: ProductNode | null;
}) {
  const { user } = useUserData();
  const { mutateAsync: purchase } = useBuyPurchase(item?.id ?? 0);
  const navigate = useNavigate();

  const handlePurchase = () => {
    toast.promise(purchase(), {
      loading: "구매 중...",
      success: (response) => {
        navigate(`/purchase/${response.id}`);
        return "구매 완료";
      },
      error: "구매 실패",
    });

    onClose();
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#282828",
            headerBg: "#282828",
            footerBg: "#282828",
            titleColor: "rgba(255,255,255,0.88)",
            colorText: "rgba(255,255,255,0.88)",
          },
        },
      }}
    >
      <Modal
        open={open && !!item}
        onClose={onClose}
        onCancel={onClose}
        className="text-white"
        closable={false}
        footer={null}
      >
        <div className="flex flex-col items-center justify-center w-full gap-8 p-5">
          <div className="text-center items-center flex flex-col">
            <img
              src={item?.productImageUrl}
              alt={item?.name}
              className="w-24 h-24 rounded-lg mb-4"
            />
            <h1 className="text-2xl font-bold">{item?.name}</h1>
            <p className="text-sm text-gray-400">
              {item?.name}을 구매하시겠습니까?
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">가격</p>
            <p className="text-2xl font-bold">
              {item?.price.toLocaleString()}P
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-center">
              <p className="text-sm text-gray-400">사용 전 포인트</p>
              <p className="text-2xl font-bold">
                {user?.point.toLocaleString()}P
              </p>
            </div>
            <AiFillCaretRight className="text-2xl animate-pulse" />
            <div className="text-center">
              <p className="text-sm text-gray-400">사용 후 포인트</p>
              <p className="text-2xl font-bold">
                {((user?.point ?? 0) - (item?.price ?? 0)).toLocaleString()}P
              </p>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <button
              className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600"
              onClick={onClose}
            >
              취소
            </button>
            <button
              className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
              onClick={handlePurchase}
            >
              구매
            </button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
