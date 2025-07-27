import Link from "next/link";
// MUI
import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// LOCAL CUSTOM COMPONENTS
import ColumnList from "./column-list";
// CUSTOM DATA MODEL
import { CategoryMenuItem, CategoryOffer } from "models/Category.model";

// =========================================================
interface Props {
  minWidth?: string;
  banner?: CategoryOffer;
  data: CategoryMenuItem[];
}
// =========================================================

export default function MegaMenu1({ banner, data }: Props) {
  return (
    <ColumnList list={data} banner={banner}>
      {banner?.position === "bottom" ? (
        <Link href={banner.href}>
          <Box position="relative" height={150} width="100%">
            <LazyImage
              fill
              alt="banner"
              src={banner.url}
              sizes="(max-width: 768px) 100vw, 100vw"
              sx={{ objectFit: "cover", objectPosition: "center center" }}
            />
          </Box>
        </Link>
      ) : null}
    </ColumnList>
  );
}
