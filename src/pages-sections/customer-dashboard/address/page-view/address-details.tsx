import { Fragment } from "react";
import Card from "@mui/material/Card";
import Place from "@mui/icons-material/Place";
// LOCAL CUSTOM COMPONENT
import AddressForm from "../address-form";
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import Address from "models/Address.model";

// =============================================================
type Props = { address: Address };
// =============================================================

export default function AddressDetailsPageView({ address }: Props) {
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        Icon={Place}
        href="/address"
        title="Edit Address"
        buttonText="Back to Address"
      />

      {/* FORM AREA */}
      <Card className="p-2">
        <AddressForm address={address} />
      </Card>
    </Fragment>
  );
}
