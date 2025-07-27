"use client";

import { styled } from "@mui/material/styles";
// // GLOBAL CUSTOM COMPONENTS
// import FlexRowCenter from "components/flex-box/flex-row-center";

// STYLED COMPONENTS
export const RootStyle = styled("div")(({ theme }) => ({
  borderRadius: 8,
  display: "grid",
  padding: "2rem 0",
  border: `1px solid ${theme.palette.grey[200]}`,
  boxShadow: theme.shadows[1],
  gridTemplateColumns: "repeat(4, 1fr)",
  backgroundColor: theme.palette.common.white,

  [theme.breakpoints.down("md")]: {
    gap: 30,
    gridTemplateColumns: "repeat(2, 1fr)"
  },

  [theme.breakpoints.down("sm")]: {
    gap: 30,
    paddingLeft: "2rem",
    paddingRight: "2rem",
    gridTemplateColumns: "1fr"
  }
}));

// export const ServiceItem = styled(FlexRowCenter)(({ theme }) => ({
//   borderRight: `1px solid ${theme.palette.grey[400]}`,
//   ":last-child": { borderRight: 0 },

//   [theme.breakpoints.down("md")]: {
//     ":nth-of-type(even)": { borderRight: 0 }
//   },

//   [theme.breakpoints.down("sm")]: {
//     borderRight: 0,
//     justifyContent: "flex-start"
//   }
// }));
