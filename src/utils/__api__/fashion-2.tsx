import { cache } from "react";
import Blog from "models/Blog.model";
import { IProduct } from "models/Product.model";
import Service from "models/Service.model";
import { IMainCarousel } from "models/Market-1.model";
import { articles, serviceList, products, mainCarouselData, brandList } from "__server__/__db__/fashion-2/data";

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  documentId: string;
  image: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    url: string;
    width?: number;
    height?: number;
    formats?: any;
    mime?: string;
    size?: number;
    createdAt?: string;
    updatedAt?: string;
  };
  parent: ICategory[];       // Puede ser [] o una lista si soportas multijerarquía
  children: ICategory[] | null;
  products: any[];          // Puedes tipar esto como Product[] si tienes ese modelo
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}


export const getCategories = async (): Promise<ICategory[]> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=*`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 3600 }, // opcional: cachear 1 hora
    });

    if (!response.ok) throw new Error(`Error ${response.status}`);

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("❌ Error al obtener categorías:", error);
    return [];
  }
};

export const getCarouselData = cache(async (): Promise<IMainCarousel[]> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/main-carousels?populate=*`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("❌ Error al obtener carousel:", error);
    return [];
  }
});

export const getFeatureProductsData = cache(async (): Promise<IProduct[]> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    return [];
  }
});

const getFeatureProducts = cache(async (): Promise<any[]> => {
  return products.filter((item) => item.for.type === "featured-products");
});

const getProducts = cache(async (): Promise<any[]> => {
  return products.filter((item) => item.for.type === "best-selling-product");
});

const getSaleProducts = cache(async (): Promise<any[]> => {
  return products.filter((item) => item.for.type === "sale-products");
});

const getPopularProducts = cache(async (): Promise<any[]> => {
  return products.filter((item) => item.for.type === "popular-products");
});

const getLatestProducts = cache(async (): Promise<any[]> => {
  return products.filter((item) => item.for.type === "latest-products");
});

const getBestWeekProducts = cache(async (): Promise<any[]> => {
  return products.filter((item) => item.for.type === "best-week-products");
});

const getBlogs = cache(async (): Promise<Blog[]> => {
  return articles;
});

const getServices = cache(async (): Promise<Service[]> => {
  return serviceList;
});

const getMainCarouselData = cache(async (): Promise<any[]> => {
  return mainCarouselData;
});

const getBrands = cache(async (): Promise<any[]> => {
  return brandList;
});

export default {
  getBlogs,
  getBrands,
  getProducts,
  getServices,
  getSaleProducts,
  getLatestProducts,
  getPopularProducts,
  getFeatureProducts,
  getBestWeekProducts,
  getMainCarouselData
};
