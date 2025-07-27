import { cache } from "react";
import axios from "utils/axiosInstance";
import Blog from "models/Blog.model";
import Product from "models/Product.model";
import { Banner } from "models/Gadget.model";

const getFeaturedCategories = cache(
  async (): Promise<{ id: number; name: string; icon: string; totalProduct: number }[]> => {
    const response = await axios.get("/api/gadget-1/featured-categories");
    return response.data;
  }
);

const getMostViewedList = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/gadget-1/products?tag=most-viewed");
  return response.data;
});

const getSaleBanner = cache(async (): Promise<Banner[]> => {
  const response = await axios.get("/api/gadget-1/sale-banners");
  return response.data;
});

const getBlogLists = cache(async (): Promise<Blog[]> => {
  const response = await axios.get("/api/gadget-1/blog-lists");
  return response.data;
});

const getTopPicksList = cache(async (): Promise<Product[]> => {
  const response = await axios.get("/api/gadget-1/products?tag=top-picks");
  return response.data;
});

export default {
  getBlogLists,
  getSaleBanner,
  getTopPicksList,
  getMostViewedList,
  getFeaturedCategories
};
