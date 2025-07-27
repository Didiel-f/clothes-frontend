import { PropsWithChildren } from "react";
// MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

export default function Footer1({ children }: PropsWithChildren) {
  return (
    <Box component="footer" bgcolor="#222935" mb={{ sm: 0, xs: 7 }}>
      <Container sx={{ color: "white", overflow: "hidden", py: { sm: 10, xs: 4 } }}>
        <Grid container spacing={3}>
          {children}
        </Grid>
      </Container>
    </Box>
  );
}

Footer1.Brand = function ({ children }: PropsWithChildren) {
  return <Grid size={{ lg: 4, sm: 6, xs: 12 }}>{children}</Grid>;
};

Footer1.Widget1 = function ({ children }: PropsWithChildren) {
  return <Grid size={{ lg: 2, sm: 6, xs: 12 }}>{children}</Grid>;
};

Footer1.Widget2 = function ({ children }: PropsWithChildren) {
  return <Grid size={{ lg: 3, sm: 6, xs: 12 }}>{children}</Grid>;
};

Footer1.Contact = function ({ children }: PropsWithChildren) {
  return <Grid size={{ lg: 3, sm: 6, xs: 12 }}>{children}</Grid>;
};
