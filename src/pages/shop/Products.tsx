import Layout from "../../components/Layout";
import { useUserData } from "../../hooks/useUserData";
import { useProduct } from "../../hooks/quries/useProduct";
import { AiOutlineLoading } from "react-icons/ai";
import {
  ProductNode,
  ProductType,
  ProductTypeLabel,
  SearchProduct,
} from "../../types/product";
import { useState } from "react";
import PurchaseDrawer from "../../components/PurchaseDrawer";
import { Pagination, Tag } from "antd";
import useDebounce from "../../hooks/useDebounce";

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
              <Tag color={item.type === ProductType.ROLE ? "blue" : "default"}>
                {ProductTypeLabel[item.type]}
              </Tag>
              <p className="text-lg font-bold mt-1">{item.name}</p>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:items-end items-center gap-2 md:w-44 w-auto">
          <p className="text-lg font-bold">
            {item.price.toLocaleString("ko-KR")}P
          </p>
          <button
            disabled={able < item.price}
            className="bg-[#8C95F7] hover:bg-blue-900 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed font-semibold text-white px-3 py-2 rounded-lg transition-colors duration-200"
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
  const [search, setSearch] = useState<SearchProduct>({});
  const debouncedSearch = useDebounce<SearchProduct>(search, 500);
  const { data, isLoading } = useProduct(debouncedSearch);
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
            <div className="flex gap-2">
              <select
                className="rounded-lg p-2 bg-[#282828] text-white focus:outline-none w-min"
                onChange={(e) =>
                  setSearch({ ...search, type: e.target.value as ProductType })
                }
              >
                <option value={undefined}>전체</option>
                {Object.values(ProductType).map((type) => (
                  <option key={type} value={type}>
                    {ProductTypeLabel[type]}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="w-full rounded-lg p-2 bg-[#282828] text-white focus:outline-none"
                placeholder="상품 검색"
                onChange={(e) =>
                  setSearch({ ...search, query: e.target.value ?? undefined })
                }
              />
            </div>
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
          <Pagination
            style={{ display: "flex", justifyContent: "center" }}
            pageSize={10}
            showSizeChanger={false}
            showPrevNextJumpers={false}
            current={search.page}
            total={data?.totalCount}
            onChange={(page) => setSearch({ ...search, page })}
          />
        </div>
      </Layout>
    </>
  );
}
