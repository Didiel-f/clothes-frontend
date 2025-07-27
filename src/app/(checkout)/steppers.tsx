"use client";

import { Fragment, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
// MUI
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

// STYLED COMPONENT
const StyledRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down("sm")]: { display: "none" }
}));

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "active"
})<{ active: boolean }>(({ theme, active }) => ({
  fontSize: "14px",
  fontWeight: "500",
  marginBlock: "4px",
  padding: "0.5rem 1rem",
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.light,
  "&:hover:not(:disabled)": {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  ...(active && {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  })
}));

const STEPPER_LIST = [
  { title: "Cart", disabled: false },
  { title: "Details", disabled: false },
  { title: "Payment", disabled: false },
  { title: "Review", disabled: true }
];

export default function Steppers() {
  const [selectedStep, setSelectedStep] = useState(0);

  const router = useRouter();
  const pathname = usePathname();

  const handleStepChange = (step: number) => {
    const routes = ["/cart", "/checkout", "/payment", "/orders"];
    if (routes[step]) router.push(routes[step]);
  };

  useEffect(() => {
    const pathToStep: Record<string, number> = {
      "/cart": 0,
      "/orders": 3,
      "/payment": 2,
      "/checkout": 1
    };

    setSelectedStep(pathToStep[pathname] || 0);
  }, [pathname]);
  return (
    <StyledRoot>
      {STEPPER_LIST.map((step, ind) => (
        <Fragment key={step.title}>
          <StyledChip
            disabled={step.disabled}
            active={ind <= selectedStep}
            label={`${ind + 1}. ${step.title}`}
            onClick={() => handleStepChange(ind)}
          />

          {ind < STEPPER_LIST.length - 1 && (
            <Box
              width="50px"
              height="4px"
              bgcolor={ind < selectedStep ? "primary.main" : "primary.light"}
            />
          )}
        </Fragment>
      ))}
    </StyledRoot>
  );
}
