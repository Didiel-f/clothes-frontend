"use client";

import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// MUI ICON COMPONENTS
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
// LOCAL CUSTOM COMPONENT
import TableRow from "../table-row";
// CUSTOM DATA MODEL
import Address from "models/Address.model";

// ==============================================================
type Props = { address: Address };
// ==============================================================

export default function AddressListItem({ address }: Props) {
  const { title, street, city, phone, id } = address;

  // HANDLE ADDRESS DELETE
  const handleAddressDelete = (id: string) => {
    console.log(id);
  };

  return (
    <Link href={`/address/${id}`}>
      <TableRow>
        <Typography noWrap variant="body1">
          {title}
        </Typography>

        <Typography noWrap variant="body1">
          {`${street}, ${city}`}
        </Typography>

        <Typography noWrap variant="body1">
          {phone}
        </Typography>

        <Typography noWrap variant="body1" sx={{ color: "grey.600" }}>
          <IconButton>
            <Edit fontSize="small" color="inherit" />
          </IconButton>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleAddressDelete(id);
            }}>
            <Delete fontSize="small" color="inherit" />
          </IconButton>
        </Typography>
      </TableRow>
    </Link>
  );
}
