import { Fragment } from "react";
import Place from "@mui/icons-material/Place";
// LOCAL CUSTOM COMPONENT
import Pagination from "../../pagination";
import AddressListItem from "../address-item";
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import Address from "models/Address.model";

// =======================================================
type Props = { addressList: Address[]; totalPages: number };
// =======================================================

export default function AddressPageView({ addressList, totalPages }: Props) {
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader Icon={Place} title="My Addresses" />

      {/* ALL ADDRESS LIST AREA */}
      {addressList.map((address) => (
        <AddressListItem key={address.id} address={address} />
      ))}

      {/* PAGINATION AREA */}
      <Pagination count={totalPages} />
    </Fragment>
  );
}
