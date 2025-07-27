import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";

export default function HeaderLogin() {
  return (
    <IconButton LinkComponent={Link} href="/login">
      <AccountCircleOutlined sx={{ color: "grey.600" }} />
    </IconButton>
  );
}
