import FlexRowCenter from "components/flex-box/flex-row-center";
import BoxLink from "./box-link";

export default function RegisterBottom() {
  return (
    <FlexRowCenter gap={1} mt={3}>
      Already have an account?
      <BoxLink title="Login" href="/login" />
    </FlexRowCenter>
  );
}
