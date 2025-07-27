import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { NavLink2 } from "components/nav-link";
// STYLED COMPONENT
import { StyledCard } from "./styles";

export default function Section6() {
  return (
    <Container className="mt-4">
      <StyledCard>
        <div className="content">
          <h2 className="title">Build Your Own Youtube Studio Save Upto 70%</h2>
          <p className="description">Everything you need to create your youtube studio</p>
          <NavLink2 title="DISCOVER EQUIPMENTS" url="#" />
        </div>
      </StyledCard>
    </Container>
  );
}
