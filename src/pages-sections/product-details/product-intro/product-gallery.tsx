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
        <Image
          src={images[currentImage].url}
          alt="product"
          width={500}
          height={500}
          sizes="(min-width: 1200px) 500px, (min-width: 900px) 420px, (min-width: 600px) 370px, 90vw"
          style={{ width: "100%", height: "auto" }}
        />
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
