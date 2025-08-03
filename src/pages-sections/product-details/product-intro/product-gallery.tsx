"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
// STYLED COMPONENTS
import { PreviewImage, ProductImageWrapper } from "./styles";
import { IImage } from "models/Product.model";

export default function ProductGallery({ images }: { images: IImage[] }) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <Fragment>
      <ProductImageWrapper>
        <Image fill alt="product" src={images[currentImage].url} sizes="(400px 400px)" />
      </ProductImageWrapper>

      <div className="preview-images">
        {images.map((img, ind) => (
          <PreviewImage
            key={ind}
            onClick={() => setCurrentImage(ind)}
            selected={currentImage === ind}>
            <Image fill alt="product" src={img.url} sizes="(48px 48px)" />
          </PreviewImage>
        ))}
      </div>
    </Fragment>
  );
}
