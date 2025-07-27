import { useState } from "react";
// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import ButtonBase from "@mui/material/ButtonBase";
// GLOBAL CUSTOM COMPONENTS
import { TextField } from "components/form-hook";
import FlexBox from "components/flex-box/flex-box";

export default function Voucher() {
  const [hasVoucher, setHasVoucher] = useState(false);

  return (
    <Box mb={3}>
      <ButtonBase
        disableRipple
        onClick={() => setHasVoucher((state) => !state)}
        sx={{ color: "primary.main", fontWeight: 500 }}>
        I have a voucher
      </ButtonBase>

      <Collapse in={hasVoucher}>
        <FlexBox mt={2} gap={2} maxWidth={400}>
          <TextField fullWidth name="voucher" placeholder="Enter voucher code here" />
          <Button variant="contained" color="primary" type="button">
            Apply
          </Button>
        </FlexBox>
      </Collapse>
    </Box>
  );
}
