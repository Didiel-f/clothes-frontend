import { IProduct } from "models/Product.model";


export const getDiscount = (
    product: IProduct
  ): { isDiscountAvailable: boolean; discount: number } => {
    const productDiscount = product.discount ?? 0;
    const categoryDiscount = product.category?.discount ?? 0;
  
    const maxDiscount = Math.max(productDiscount, categoryDiscount);
  
    return {
      isDiscountAvailable: maxDiscount > 0,
      discount: maxDiscount,
    };
  };
  