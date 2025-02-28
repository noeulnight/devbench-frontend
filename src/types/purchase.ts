export interface PurchasesResponse {
  nodes: PurchaseResponse[];
  totalCount: number;
}

export interface PurchaseResponse {
  id: string;
  price: number;
  status: PurchaseStatus;
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
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export const PurchaseStatusLabel: Record<PurchaseStatus, string> = {
  [PurchaseStatus.PENDING]: "지급 대기",
  [PurchaseStatus.PROCESSING]: "지급 처리중",
  [PurchaseStatus.COMPLETED]: "지급 완료",
  [PurchaseStatus.FAILED]: "지급 오류",
};
