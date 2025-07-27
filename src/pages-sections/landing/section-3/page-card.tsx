import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
// MUI
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// MUI ICON
import Visibility from "@mui/icons-material/Visibility";
// STYLED COMPONENTS
import { TitleBadge, Wrapper, StatusChip, StyledFlex } from "./styles";

// =========================================================
interface PageCardProps {
  no?: number;
  title: string;
  imgUrl: string;
  status?: string;
  previewUrl: string;
  disabled?: boolean;
}
// =========================================================

export default function PageCard(props: PageCardProps) {
  const { title, imgUrl, previewUrl, disabled, status, no } = props;

  return (
    <Fragment>
      <Wrapper>
        <Card
          elevation={3}
          sx={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          }}>
          <Image
            priority
            alt="cover"
            sizes="100%"
            src={imgUrl}
            width={1175}
            height={1000}
            style={{
              width: "100%",
              height: "auto",
              display: "flex",
              objectFit: "contain",
              objectPosition: "top center"
            }}
          />
        </Card>

        {status && <StatusChip>{status}</StatusChip>}

        {!disabled && (
          <Link href={previewUrl} target="_blank">
            <StyledFlex className="overlay">
              <IconButton sx={{ bgcolor: "white", "&:hover": { bgcolor: "white" } }}>
                <Visibility fontSize="small" />
              </IconButton>
            </StyledFlex>
          </Link>
        )}
      </Wrapper>

      <Typography component="h3" sx={{ textAlign: "center", lineHeight: 1, fontWeight: 600 }}>
        {title} {no ? <TitleBadge>({no})</TitleBadge> : null}
      </Typography>
    </Fragment>
  );
}
