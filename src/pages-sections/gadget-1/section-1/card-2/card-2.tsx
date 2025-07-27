import Link from "next/link";
import Image from "next/image";
// STYLED COMPONENT
import { Wrapper } from "./styles";

// ==========================================================
interface Props {
  badge: string;
  title: string;
  imgUrl: string;
  url?: string;
}
// ==========================================================

export default function CardTwo({ badge, title, imgUrl, url }: Props) {
  return (
    <Link href="/sales-1">
      <Wrapper>
        <Image fill alt={title} sizes="(min-width: 768px) 50vw, 100vw" src={imgUrl} />

        <div className="content">
          <small className="badge">{badge}</small>
          <h2 className="title">{title}</h2>
        </div>
      </Wrapper>
    </Link>
  );
}
