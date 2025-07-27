"use client";

import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";

export const StyledRoot = styled(Container)(({ theme }) => ({
  marginTop: "6rem",
  position: "relative",

  "& .content": {
    maxWidth: 550,
    textAlign: "center",
    marginInline: "auto",
    marginBottom: "6rem",

    "& .title": {
      fontSize: 40,
      fontWeight: 700,
      marginBottom: "1.5rem",
      "& span": { lineHeight: 1.2, display: "block", color: theme.palette.primary.main }
    },

    "& .subtitle": {
      fontSize: 18,
      marginInline: "auto",
      marginBottom: "1.5rem"
    },

    "& .feature-list": {
      gap: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "2.5rem",
      [theme.breakpoints.down("sm")]: { flexDirection: "column" },

      "& .feature-item": {
        gap: "0.25rem",
        display: "flex",
        alignItems: "center",
        marginBlock: "0.5rem",
        color: theme.palette.grey[900]
      }
    },

    "& .buttons": {
      gap: "1rem",
      display: "flex",
      justifyContent: "center",
      marginBottom: "1.5rem"
    },

    "& .info": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      "& .info-title": {
        textDecoration: "underline",
        color: theme.palette.text.secondary
      },

      "& .help-icon": {
        fontSize: 18,
        marginInlineStart: ".25rem",
        color: theme.palette.grey[500],
        "&:hover": { color: theme.palette.grey[800] }
      }
    }
  }
}));
