import { Fragment } from "react";
import Image from "next/image";
// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
// IMPORT IMAGES
import googleLogo from "../../../../public/assets/images/icons/google-1.svg";
import facebookLogo from "../../../../public/assets/images/icons/facebook-filled-white.svg";

export default function SocialButtons() {
  return (
    <Fragment>
      {/* DIVIDER */}
      <Box my={3}>
        <Divider>
          <Box lineHeight={1} px={1}>
            or
          </Box>
        </Divider>
      </Box>

      {/* FACEBOOK BUTTON */}
      <Button
        fullWidth
        size="large"
        className="facebookButton"
        sx={{ fontSize: 12 }}
        startIcon={<Image alt="facebook" src={facebookLogo} />}>
        Continue with Facebook
      </Button>

      {/* GOOGLE BUTTON */}
      <Button
        fullWidth
        size="large"
        className="googleButton"
        sx={{ fontSize: 12 }}
        startIcon={<Image alt="google" src={googleLogo} />}>
        Continue with Google
      </Button>
    </Fragment>
  );
}
