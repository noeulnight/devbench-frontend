import Layout from "../../components/Layout";
import { useUserData } from "../../hooks/useUserData";
import { useProduct } from "../../hooks/quries/useProduct";
import { AiOutlineLoading } from "react-icons/ai";
import { ProductNode } from "../../types/product";
import { useState } from "react";
import PurchaseDrawer from "../../components/PurchaseDrawer";

function ProductItem({
  item,
  able,
  handleOpen,
}: {
  item: ProductNode;
  able: number;
  handleOpen: (item: ProductNode) => void;
}) {
  return (
    <div className={`flex w-full p-3 rounded-lg shadow-md bg-[#282828]`}>
      <div className="flex md:flex-row flex-col items-center gap-4 justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="flex md:flex-row flex-col text-center md:text-left items-center gap-1">
            <img
              src={item.productImageUrl}
              alt={`${item.name}`}
              className="w-30 h-30 rounded-lg"
            />
            <div className="ml-3">
              <p className="text-lg font-bold">{item.name}</p>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold">
            {item.price.toLocaleString("ko-KR")}P
          </p>
          <button
            disabled={able < item.price}
            className="bg-[#8C95F7] hover:bg-blue-900 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors duration-200"
            onClick={() => handleOpen(item)}
          >
            구매
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const { user } = useUserData();
  const { data, isLoading } = useProduct();
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<ProductNode | null>(null);

  const handleOpen = (item: ProductNode) => {
    setOpen(true);
    setItem(item);
  };

  return (
    <>
      <PurchaseDrawer open={open} onClose={() => setOpen(false)} item={item} />
      <Layout>
        <h1 className="text-3xl font-bold">포인트 상점</h1>
        <p className="text-sm text-gray-400 whitespace-pre-line mt-2">
          포인트를 사용하여 디벤치에서 제공하는 다양한 상품을 구매할 수
          있습니다.
        </p>
        <div className="flex flex-col gap-4 mt-10 w-full">
          {user && (
            <div className="flex flex-col">
              <p className="text-sm text-gray-400">사용 가능한 포인트</p>
              <p className="text-2xl font-bold">
                {user?.point.toLocaleString()}P
              </p>
            </div>
          )}
          <div className="flex flex-col gap-3">
            {isLoading && (
              <div className="flex justify-center items-center h-40">
                <AiOutlineLoading className="w-6 h-6 animate-spin" />
              </div>
            )}
            {data &&
              !isLoading &&
              data.nodes.map((item) => (
                <ProductItem
                  key={item.id}
                  item={item}
                  able={user?.point ?? 0}
                  handleOpen={handleOpen}
                />
              ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
