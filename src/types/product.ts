export interface ProductResponse {
  nodes: ProductNode[];
  totalCount: number;
}

export interface ProductNode {
  id: number;
  name: string;
  price: number;
  productImageUrl: string;
  description: string;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
}
