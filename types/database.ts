// Types for database models used in the public store

export interface DbCategory {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface DbProductImage {
  id: string;
  url: string;
  alt: string | null;
  order: number;
  productId: string;
}

export interface DbProductVariant {
  id: string;
  name: string;
  value: string;
  price: number | null;
  stock: number;
  productId: string;
}

export interface DbProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  price: number;
  salePrice: number | null;
  stock: number;
  active: boolean;
  categoryId: string | null;
  category: DbCategory | null;
  images: DbProductImage[];
  variants?: DbProductVariant[];
  createdAt: string;
  updatedAt: string;
}
