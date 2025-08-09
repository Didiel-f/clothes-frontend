import { cache } from "react";

// FILTER OPTIONS
const OTHERS = [
  { label: "On Sale", value: "sale" },
  { label: "In Stock", value: "stock" },
  { label: "Featured", value: "featured" }
];


export const getFilters = cache(async () => {
  return {
    others: OTHERS,
  };
});