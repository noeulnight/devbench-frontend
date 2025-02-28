export interface ProductResponse {
  nodes: ProductNode[];
  totalCount: number;
}

export interface ProductNode {
  id: number;
  name: string;
  type: ProductType;
  price: number;
  productImageUrl: string;
  description: string;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum ProductType {
  ROLE = "ROLE",
  OTHER = "OTHER",
}

export const ProductTypeLabel: Record<ProductType, string> = {
  [ProductType.ROLE]: "역할",
  [ProductType.OTHER]: "기타",
};
