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
  const { countyName, regionName, streetName, streetNumber, houseApartment } = address;

  // HANDLE ADDRESS DELETE
  const handleAddressDelete = (id: string) => {
    console.log(id);
  };

  return (
    <Link href={`/address/${houseApartment}`}>
      <TableRow>
        <Typography noWrap variant="body1">
          {regionName}
        </Typography>

        <Typography noWrap variant="body1">
          {`${streetName}, ${countyName}`}
        </Typography>

        <Typography noWrap variant="body1">
          {streetNumber}
        </Typography>

        <Typography noWrap variant="body1" sx={{ color: "grey.600" }}>
          <IconButton>
            <Edit fontSize="small" color="inherit" />
          </IconButton>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleAddressDelete(houseApartment);
            }}>
            <Delete fontSize="small" color="inherit" />
          </IconButton>
        </Typography>
      </TableRow>
    </Link>
  );
}
