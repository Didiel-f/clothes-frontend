import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENTS
import FlexBetween from "components/flex-box/flex-between";
// STYLED COMPONENTS
import { StyledButton, ContentWrapper, StyledContainer } from "./styles";
// IMPORT IMAGES
import drone from "../../../../public/assets/images/products/drone-2.png";
import iphone14 from "../../../../public/assets/images/products/iphone-14.png";
import iphone12 from "../../../../public/assets/images/products/iphone-12.png";
import nikonCamera from "../../../../public/assets/images/products/nikon-camera.png";
import appleAirPod from "../../../../public/assets/images/products/apple-airpod.png";
import headphone from "../../../../public/assets/images/products/beat-headphone.png";
import appleWatch from "../../../../public/assets/images/products/apple-watch-4.png";

export default function Section1() {
  return (
    <StyledContainer>
      <Grid container spacing={3}>
        {/* IPHONE 14 PRO */}
        <Grid size={{ lg: 4, sm: 6, xs: 12 }}>
          <ContentWrapper>
            <Box padding={4} pb={0}>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xl: 20, md: 18, xs: 16 } }}>
                Blast Past Fast.
              </Typography>

              <Typography
                variant="h2"
                sx={{ mb: 2, lineHeight: 1.2, fontSize: { xl: 40, md: 32, xs: 28 } }}>
                IPhone 14 Pro <br />
                It’s A Leap Year
              </Typography>

              <StyledButton>Shop By Category</StyledButton>
            </Box>

            <Image
              alt="Iphone 14"
              src={iphone14}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </ContentWrapper>
        </Grid>

        {/* NIKON CAMERA */}
        <Grid size={{ lg: 4, sm: 6, xs: 12 }}>
          <ContentWrapper hasGradient>
            <Image
              alt="Nikon Camera"
              src={nikonCamera}
              style={{ width: "100%", height: "auto", marginTop: -70 }}
            />

            <Box px={4} py={2}>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { md: 20, xs: 18 } }}>
                Enrich your everyday life.
              </Typography>

              <Typography
                variant="h2"
                sx={{ mb: 2, lineHeight: 1.2, fontSize: { xl: 55, md: 42, sm: 36, xs: 28 } }}>
                Nikon DSLR <br />
                D-8000
              </Typography>

              <StyledButton>Shop By Category</StyledButton>
            </Box>
          </ContentWrapper>
        </Grid>

        {/* DJI MINI 3 DRONE */}
        <Grid size={{ lg: 4, sm: 6, xs: 12 }}>
          <ContentWrapper>
            <Box padding={4} pb={{ xl: 6, lg: 5, md: 3, xs: 0 }}>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xl: 20, md: 18, xs: 16 } }}>
                Fly more time
              </Typography>

              <Typography
                variant="h2"
                sx={{ mb: 2, lineHeight: 1.2, fontSize: { xl: 40, md: 32, xs: 28 } }}>
                DJI Mini 3 Drone <br /> Fly More
              </Typography>

              <StyledButton>Shop By Category</StyledButton>
            </Box>

            <Image
              src={drone}
              alt="Dji mini drone"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </ContentWrapper>
        </Grid>

        {/* APPLE AIR POD PRO 2 */}
        <Grid size={{ lg: 4, sm: 6, xs: 12 }}>
          <ContentWrapper sx={{ bgcolor: "grey.700" }}>
            <Box padding={4} pb={2}>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xl: 20, md: 18, xs: 16 } }}>
                Wireless to the fullest.
              </Typography>

              <Typography
                variant="h2"
                sx={{ mb: 2, lineHeight: 1.2, fontSize: { xl: 45, md: 32, xs: 28 } }}>
                Apple Airpods <br /> Pro 2
              </Typography>

              <StyledButton>Shop By Category</StyledButton>
            </Box>

            <Box px={8}>
              <Image
                alt="Iphone 14"
                src={appleAirPod}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </Box>
          </ContentWrapper>
        </Grid>

        {/* BEATS & APPLE  */}
        <Grid size={{ lg: 5, md: 7, xs: 12 }}>
          <Stack height="100%" direction="column" spacing={3}>
            <FlexBetween height="100%" borderRadius={3} bgcolor="grey.300" position="relative">
              <Box padding={4} position="relative" zIndex={1}>
                <Typography variant="body1" sx={{ mb: 1, fontSize: { xl: 20, md: 18, xs: 16 } }}>
                  Blast Past Fast.
                </Typography>

                <Typography
                  variant="h2"
                  sx={{ mb: 2, lineHeight: 1.2, fontSize: { xl: 35, md: 32, xs: 28 } }}>
                  Beats H12 <br /> Wireless
                </Typography>

                <StyledButton isWhite>Shop By Category</StyledButton>
              </Box>

              <Box right={0} maxHeight="100%" position="absolute" maxWidth={{ md: 450, xs: 350 }}>
                <Image
                  src={headphone}
                  alt="Beats Headphone"
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
            </FlexBetween>

            <ContentWrapper
              sx={{
                display: "flex",
                position: "relative",
                alignItems: "center",
                bgcolor: "primary.main"
              }}>
              <Box padding={4} position="relative" zIndex={1}>
                <Typography variant="body1" sx={{ mb: 1, fontSize: { xl: 20, md: 18, xs: 16 } }}>
                  The speed of life.
                </Typography>

                <Typography
                  variant="h2"
                  sx={{ mb: 2, lineHeight: 1.2, fontSize: { xl: 35, md: 32, xs: 28 } }}>
                  Apple Watch <br /> Series 9
                </Typography>

                <StyledButton>Shop By Category</StyledButton>
              </Box>

              <Box
                maxWidth={{ xl: 300, xs: 250 }}
                top={0}
                right={0}
                bottom={0}
                display="flex"
                maxHeight="100%"
                position="absolute"
                alignItems="center"
                justifyContent="center">
                <Image
                  alt="Apple Watch"
                  src={appleWatch}
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
            </ContentWrapper>
          </Stack>
        </Grid>

        {/* IPHONE 12 FOR YOU */}
        <Grid size={{ lg: 3, md: 5, xs: 12 }}>
          <ContentWrapper
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
            <Box padding={4} pb={0}>
              <Typography variant="body1" sx={{ mb: 1, fontSize: { xl: 20, md: 18, xs: 16 } }}>
                Blast Past Fast.
              </Typography>

              <Typography
                variant="h2"
                sx={{ mb: 2, lineHeight: 1.2, fontSize: { xl: 35, md: 32, xs: 28 } }}>
                IPhone 12 <br /> For You
              </Typography>

              <StyledButton>Shop By Category</StyledButton>
            </Box>

            <Image
              alt="Iphone 12"
              src={iphone12}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </ContentWrapper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}
