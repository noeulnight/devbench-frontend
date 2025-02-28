export interface PurchasesResponse {
  nodes: PurchaseResponse[];
  totalCount: number;
}

export interface PurchaseResponse {
  id: string;
  price: number;
  status: string;
  productId: number;
  userId: string;
  transactionId: number;
  createdAt: string;
  updatedAt: string;
  product: {
    id: number;
    name: string;
    price: number;
    productImageUrl: string;
    description: string;
    isHidden: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export enum PurchaseStatus {
  PENDING = "지급 대기",
  PROCESSING = "지급 처리중",
  COMPLETED = "지급 완료",
  FAILED = "지급 오류",
}
