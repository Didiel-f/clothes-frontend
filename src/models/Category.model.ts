export interface Category_old {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  parent: string[];
  featured?: boolean;
  description?: string;
}

export interface CategoryOffer {
  url: string;
  href: string;
  position: "right" | "bottom";
}

export interface CategoryMenuItem {
  href: string;
  title: string;
  icon?: string;
  offer?: CategoryOffer;
  children?: CategoryMenuItem[];
  component?: "Grid" | "List";
}



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
