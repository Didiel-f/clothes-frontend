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