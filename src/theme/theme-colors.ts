import { alpha } from "@mui/material/styles";

// =================================================================
declare module "@mui/material/styles" {
  interface PaletteColor {
    50?: string;
    100: string;
    200: string;
    300: string;
    500: string;
    400: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface SimplePaletteColorOptions {
    50?: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface Palette {
    gold: SimplePaletteColorOptions;
    dark: SimplePaletteColorOptions;
    paste: SimplePaletteColorOptions;
    marron: SimplePaletteColorOptions;
    orange: SimplePaletteColorOptions;
    bluish: SimplePaletteColorOptions;
  }

  interface PaletteOptions {
    gold: SimplePaletteColorOptions;
    dark: SimplePaletteColorOptions;
    paste: SimplePaletteColorOptions;
    marron: SimplePaletteColorOptions;
    orange: SimplePaletteColorOptions;
    bluish: SimplePaletteColorOptions;
  }
}
// =================================================================

export const grey = {
  900: "#2B3445", // Main Text
  800: "#373F50", // Paragraph
  700: "#4B566B",
  600: "#7D879C", // Low Priority form Title/Text
  500: "#AEB4BE",
  400: "#DAE1E7", // Border
  300: "#E3E9EF",
  200: "#F3F5F9", // Line Stroke
  100: "#F6F9FC"
};

export const primary = {
  100: "#E6F9FF",
  200: "#BFF0FF",
  300: "#99E6FF",
  400: "#66DBFF",
  500: "#2FCBFD", // main base
  600: "#22B2E0",
  700: "#1C9CC7",
  800: "#157DA3",
  900: "#0F5E7A",
  main: "#2FCBFD",
  light: "#E6F9FF",
  dark: "#1C9CC7"
};


export const secondary = {
  100: "#FFEDE6",
  200: "#FFD1BF",
  300: "#FFB399",
  400: "#FF8C66",
  500: "#FD612F", // main base
  600: "#E65320",
  700: "#CC471C",
  800: "#A83A16",
  900: "#7D2B0F",
  main: "#FD612F",
  light: "#FFEDE6",
  dark: "#CC471C"
};


export const error = {
  100: "#FFEAEA",
  200: "#FFCBCB",
  300: "#FFA9A9",
  400: "#FF6D6D",
  500: "#FF5353",
  600: "#FF4C4C",
  700: "#FF4242",
  800: "#FF3939",
  900: "#FF2929",
  main: "#E94560"
};

export const success = {
  100: "#E7F9ED",
  200: "#C2F1D1",
  300: "#99E8B3",
  400: "#52D77E",
  500: "#33D067",
  600: "#2ECB5F",
  700: "#27C454",
  800: "#20BE4A",
  900: "#0b7724",
  main: "rgb(51, 208, 103)"
};

export const blue = {
  50: "#f3f5f9",
  100: "#DBF0FE",
  200: "#B8DEFE",
  300: "#94C9FE",
  400: "#7AB6FD",
  500: "#4E97FD",
  600: "#3975D9",
  700: "#2756B6",
  800: "#183C92",
  900: "#0E2979",
  main: "#4E97FD",
  light: "#DBF0FE",
  contrastText: "#FFFFFF"
};

export const marron = {
  50: "#f3f5f9",
  100: "#F6F2ED",
  200: "#F8DBD1",
  300: "#EBBCB3",
  400: "#D89C98",
  500: "#BE7374",
  600: "#A3545C",
  700: "#883948",
  800: "#6E2438",
  900: "#5B162F",
  main: "#BE7374",
  light: "#F6F2ED",
  contrastText: "#f3f5f9"
};

export const paste = {
  50: "#F5F5F5",
  100: "#DDFBF1",
  200: "#BDF7E8",
  300: "#97E8DA",
  400: "#76D2CA",
  500: "#4BB4B4",
  600: "#36929A",
  700: "#257181",
  800: "#175368",
  900: "#0E3D56",
  main: "#4BB4B4",
  light: "#DDFBF1",
  contrastText: "#FFFFFF"
};

export const orange = {
  50: "#FEE9D2",
  100: "#FDD8AF",
  200: "#FCC487",
  300: "#FCB05F",
  400: "#FB9C37",
  500: "#FA8C16",
  600: "#C86904",
  700: "#A05403",
  800: "#783F03",
  900: "#502A02",
  main: "#FA8C16",
  dark: "#C86904",
  light: "#FDD8AF"
};

export const bluish = {
  50: "#e0f2f3",
  100: "#b2dedf",
  200: "#7fc9ca",
  300: "#4bb4b4",
  400: "#22a4a3",
  500: "#009491",
  600: "#008783",
  700: "#257181",
  800: "#175368",
  900: "#0E3D56",
  main: "#4BB4B4",
  dark: "#36929A",
  light: "#BDF7E8"
};

export const warning = {
  50: "#fff8e4",
  100: "#ffedbb",
  200: "#ffe290",
  300: "#ffd767",
  400: "#ffcd4e",
  500: "#fec544",
  600: "#fdb73f",
  700: "#faa63b",
  800: "#f89738",
  900: "#f67a30",
  main: "#fec544",
  dark: "#faa63b",
  light: "#ffd767"
};

export const gold = {
  50: "#fffae8",
  100: "#fef3c5",
  200: "#fdeca0",
  300: "#fbe57b",
  400: "#f7df60",
  500: "#f5d946",
  600: "#e5c841",
  700: "#d0b23b",
  800: "#BB9C36",
  900: "#98772d",
  main: "#BB9C36",
  light: "#f5d946",
  dark: "#98772d",
  contrastText: "#fffae8"
};

export const dark = {
  50: "#e9edf8",
  100: "#cad4e1",
  200: "#abb7c8",
  300: "#8c9ab0",
  400: "#75859d",
  500: "#5e708b",
  600: "#50627a",
  700: "#404f64",
  800: "#313d4e",
  900: "#1F2937",
  main: "#1F2937",
  contrastText: "#e9edf8"
};

export const themeColors = {
  dark,
  grey,
  gold,
  paste,
  error,
  orange,
  marron,
  bluish,
  warning,
  success,
  secondary,
  info: blue,
  divider: grey[200],
  background: { default: "#f2f2f23b" },
  text: { primary: grey[900], secondary: grey[700], disabled: grey[400] },
  action: {
    focus: alpha(grey[700], 0.12),
    hover: alpha(grey[700], 0.04),
    active: alpha(grey[700], 0.54),
    selected: alpha(grey[700], 0.08),
    disabled: alpha(grey[700], 0.26),
    disabledBackground: alpha(grey[700], 0.12)
  }
};
