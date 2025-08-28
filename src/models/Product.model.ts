import Review from "./Review.model";
import Shop from "./Shop.model";

export default interface Product {
  unit?: any;
  slug: string;
  price: number;
  title: string;
  rating: number;
  discount: number;
  thumbnail: string;
  description?: string;
  id: string;
  shop?: Shop;
  brand?: string;
  size?: string[];
  status?: string;
  colors?: string[];
  images?: string[];
  categories: any[];
  reviews?: Review[];
  published?: boolean;
}


export interface IProduct {
  id: number;
  documentId: string;
  name: string;
  shortDescription: string;
  slug: string;
  price: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  discount?: number;
  brand: IBrand;
  category: ICategory;
  images: IImage[];
  variants: IVariant[];
  productKind: IProductKind;
}

export interface IProductKind {
  documentId: string;
  name: string;
  weight: number;
  note: string | null;
  dimension: IDimension
}

export interface IDimension {
  id?: number | string;
  length: number; // cm
  width: number;  // cm
  height: number; // cm
}

export interface IBrand {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ICategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  discount?: number;
}

export interface IImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: IImageFormat;
    medium?: IImageFormat;
    small?: IImageFormat;
    thumbnail?: IImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface IImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
}

export interface IVariant {
  documentId: string;
  isShoe: boolean;
  shoesSize: string | null;
  clotheSize: string | null;
  stock: number;
}
