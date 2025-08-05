export interface FurnitureCarouselItem {
  id: string | number;
  title: string;
  imgUrl: string;
  subTitle: string;
  buttonText: string;
  buttonLink: string;
  description: string;
}

export interface GiftCarouselItem {
  id: string | number;
  title: string;
  imgUrl: string;
  subTitle: string;
  buttonText: string;
  buttonLink: string;
}

export interface HealthCarouselItem {
  id: number;
  title: string;
  imgUrl: string;
  buttonText: string;
  buttonLink: string;
}

export interface GroceryTwoCarouselItem {
  id: number;
  title: string;
  imgUrl: string;
  description: string;
  appStoreLink: string;
  playStoreLink: string;
}


export default interface MainCarouselItem {
  title?: string;
  imgUrl?: string;
  buttonLik?: string;
  buttonText?: string;
  description?: string;
}

export interface IMainCarousel {
  id: number;
  documentId: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: Image;
}

export interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}