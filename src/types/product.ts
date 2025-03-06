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
  PERSONAL_CHANNEL = "PERSONAL_CHANNEL",
  ROLE = "ROLE",
  CULTURAL_VOUCHER = "CULTURAL_VOUCHER",
  GIFTICONS = "GIFTICONS",
  EXPERIENCE_BOOST = "EXPERIENCE_BOOST",
  GOODS = "GOODS",
  OTHER = "OTHER",
}

export const ProductTypeLabel: Record<ProductType, string> = {
  [ProductType.PERSONAL_CHANNEL]: "개인 채널",
  [ProductType.ROLE]: "역할",
  [ProductType.CULTURAL_VOUCHER]: "문화 상품권",
  [ProductType.GIFTICONS]: "기프티콘",
  [ProductType.EXPERIENCE_BOOST]: "경험치 부스트",
  [ProductType.GOODS]: "굿즈",
  [ProductType.OTHER]: "기타",
};
