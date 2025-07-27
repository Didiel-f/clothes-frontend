// GLOBAL CUSTOM COMPONENT
import FlexBox from "components/flex-box/flex-box";
// CUSTOM ICON COMPONENTS
import PlayStore from "icons/PlayStore";
import AppleStore from "icons/AppleStore";
// STYLED COMPONENT
import { AppItem } from "./styles";

// ==============================================================
interface Props {
  playStoreUrl: string;
  appleStoreUrl: string;
}
// ==============================================================

export default function FooterApps({ playStoreUrl, appleStoreUrl }: Props) {
  return (
    <FlexBox flexWrap="wrap" m={-1}>
      <a href={playStoreUrl} target="_blank" rel="noreferrer noopener">
        <AppItem>
          <PlayStore />

          <div>
            <p className="subtitle">Get it on</p>
            <p className="title">Google Play</p>
          </div>
        </AppItem>
      </a>

      <a href={appleStoreUrl} target="_blank" rel="noreferrer noopener">
        <AppItem>
          <AppleStore />

          <div>
            <p className="subtitle">Download on the</p>
            <p className="title">App Store</p>
          </div>
        </AppItem>
      </a>
    </FlexBox>
  );
}
