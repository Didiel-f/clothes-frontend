import { PropsWithChildren } from "react";
import Container from "@mui/material/Container";
import Layout1 from "../fashion-2/layout";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Layout1>
      <Container className="mt-2 mb-2">
        {children}
      </Container>
    </Layout1>
  );
}
