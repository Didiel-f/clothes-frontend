import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Link as Scroll } from "react-scroll";
// MUI ICON COMPONENTS
import HelpIcon from "@mui/icons-material/Help";
import DoneIcon from "@mui/icons-material/Done";
// CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// STYLED COMPONENT
import { StyledRoot } from "./styles";

export default function Section1() {
  return (
    <StyledRoot>
      <div className="content">
        <Typography variant="h1" className="title">
          Build your online store with
          <span>Bazaar</span>
        </Typography>

        <Typography variant="body1" className="subtitle">
          SEO friendly Next.js Ecommerce Template. <br /> Helps you to build performant online store
          faster.
        </Typography>

        <div className="feature-list">
          <div className="feature-item">
            <DoneIcon color="success" fontSize="small" />
            SSR
          </div>

          <div className="feature-item">
            <DoneIcon color="success" fontSize="small" />
            Rest API
          </div>

          <div className="feature-item">
            <DoneIcon color="success" fontSize="small" />
            Multi vendor Support
          </div>
        </div>

        <div className="buttons">
          <Scroll to="get" duration={400} offset={-72 - 16} smooth={true}>
            <Button variant="outlined" color="primary" size="large">
              What&apos;s inside
            </Button>
          </Scroll>

          <Scroll to="demos" duration={400} offset={-72 - 16} smooth={true}>
            <Button variant="contained" color="primary" size="large">
              View Demos
            </Button>
          </Scroll>
        </div>

        <div className="info">
          <Typography variant="body1" className="info-title">
            <a href="https://getbazaar.io/" target="_blank" rel="noreferrer">
              I need server integration
            </a>
          </Typography>

          <Tooltip
            placement="right"
            title={
              <Typography variant="body1">
                Bazaar Pro has REST API integrated with mock/fake server. Click here if you also
                need a real server side solution.
              </Typography>
            }>
            <HelpIcon className="help-icon" />
          </Tooltip>
        </div>

        {/* <a href="https://support.ui-lib.com/headless-commerce/" target="_blank">
            <Image width={300} height={143} src="/assets/images/landing/headless-commerce.jpg" alt="Join waitlist for Headless commerce" />
          </a> */}
      </div>

      <LazyImage
        priority
        alt="cover"
        width={2600}
        height={566}
        quality={100}
        src="/assets/images/landing/page-group-2.png"
        sx={{ display: "grid" }}
      />
    </StyledRoot>
  );
}
