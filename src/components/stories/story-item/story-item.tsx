import LazyImage from "components/LazyImage";
// STYLED COMPONENT
import { StyledRoot } from "./styles";

// ==============================================================
interface Props {
  image: string;
  handleClick: () => void;
}
// ==============================================================

export default function StoryItem({ image, handleClick }: Props) {
  return (
    <StyledRoot onClick={handleClick}>
      <LazyImage src={image} alt="Story" width={164} height={300} />
    </StyledRoot>
  );
}
