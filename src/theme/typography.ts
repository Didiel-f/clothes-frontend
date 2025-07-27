import { publicSans } from "app/layout";

export const fontSize = 14;
const fw600 = 600;
const fw500 = 500;

export const typography = {
  fontSize,
  htmlFontSize: 16,
  fontFamily: publicSans.style.fontFamily,
  body1: { fontSize },
  body2: { fontSize },
  h1: { fontSize: 30, fontWeight: fw600, lineHeight: 1.5 },
  h2: { fontSize: 25, fontWeight: fw600, lineHeight: 1.5 },
  h3: { fontSize: 20, fontWeight: fw600, lineHeight: 1.5 },
  h4: { fontSize: 17, fontWeight: fw500 },
  h5: { fontSize: 16, fontWeight: fw500, lineHeight: 1 },
  h6: { fontSize, fontWeight: fw500 }
};
