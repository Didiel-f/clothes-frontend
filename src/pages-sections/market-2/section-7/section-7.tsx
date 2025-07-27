import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import WhiteButton from "components/WhiteButton";
// STYLED COMPONENT
import { BannerWrapper } from "./styles";

export default function Section7() {
  return (
    <Container className="mt-4 mb-4">
      <BannerWrapper>
        <div className="content">
          <h3>
            GIFT <span>50% OFF</span> PERFECT STYLES
          </h3>

          <p>Only until the end of this week. Terms and conditions apply</p>
        </div>

        <WhiteButton size="large">Discover Now</WhiteButton>
      </BannerWrapper>
    </Container>
  );
}
