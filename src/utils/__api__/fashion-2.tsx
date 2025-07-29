import { cache, useEffect, useState } from "react";
import axios from "utils/axiosInstance";
import Blog from "models/Blog.model";
import Brand from "models/Brand.model";
import Product from "models/Product.model";
import Service from "models/Service.model";
import MainCarouselItem from "models/Market-1.model";

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

const getProducts = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/fashion-shop-2/products");
  return response.data;
});

const getFeatureProducts = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/fashion-shop-2/products?tag=feature");
  return response.data;
});

const getSaleProducts = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/fashion-shop-2/products?tag=sale");
  return response.data;
});

const getPopularProducts = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/fashion-shop-2/products?tag=popular");
  return response.data;
});

const getLatestProducts = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/fashion-shop-2/products?tag=latest");
  return response.data;
});

const getBestWeekProducts = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/fashion-shop-2/products?tag=best-week");
  return response.data;
});

const getBlogs = cache(async (): Promise<Blog[]> => {
  const response = await axios.get("/api/fashion-shop-2/blogs");
  return response.data;
});

const getServices = cache(async (): Promise<Service[]> => {
  const response = await axios.get("/api/fashion-shop-2/service");
  return response.data;
});

export const getCategories = cache(async (): Promise<ICategory[]> => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=*`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    } 
  })
  console.log('response getCategories', response)
  const json = await response.json()
  console.log('jsooon', json)
  return json.data;
});

const getMainCarouselData = cache(async (): Promise<MainCarouselItem[]> => {
  const response = await axios.get("/api/fashion-shop-2/main-carousel");
  return response.data;
});

const getBrands = cache(async (): Promise<Brand[]> => {
  const response = await axios.get("/api/fashion-shop-2/brands");
  return response.data;
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
