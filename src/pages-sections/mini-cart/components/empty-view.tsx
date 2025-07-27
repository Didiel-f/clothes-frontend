import Image from "next/image";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";

export default function EmptyCartView() {
  return (
    <FlexBox
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      height="calc(100% - 74px)">
      <Image width={90} height={100} alt="banner" src="/assets/images/logos/shopping-bag.svg" />

      <Typography
        variant="body1"
        sx={{
          mt: 2,
          maxWidth: 200,
          color: "grey.600",
          textAlign: "center"
        }}>
        Your shopping bag is empty. Start shopping
      </Typography>
    </FlexBox>
  );
}
