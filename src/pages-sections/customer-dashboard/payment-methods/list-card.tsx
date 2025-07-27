"use client";

import Link from "next/link";
import Image from "next/image";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// MUI ICON COMPONENTS
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
// LOCAL CUSTOM COMPONENT
import TableRow from "../table-row";

// ==============================================================
interface Props {
  id: string;
  exp: string;
  card_no: string;
  username: string;
  payment_method: string;
}
// ==============================================================

export default function ListCard({ exp, card_no, payment_method, id, username }: Props) {
  return (
    <TableRow>
      <FlexBox alignItems="center" gap={1}>
        <Card sx={{ width: 42, height: 28, borderRadius: 1 }}>
          <Image
            width={42}
            height={30}
            alt={payment_method}
            src={`/assets/images/payment-methods/${payment_method}.svg`}
          />
        </Card>

        <Typography variant="h5">{username}</Typography>
      </FlexBox>

      <p>{card_no}</p>

      <p>{exp}</p>

      <Typography variant="body1" sx={{ color: "grey.600", textAlign: "center" }}>
        <IconButton LinkComponent={Link} href={`/payment-methods/${id}`}>
          <Edit fontSize="small" color="inherit" />
        </IconButton>

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <Delete fontSize="small" color="inherit" />
        </IconButton>
      </Typography>
    </TableRow>
  );
}
