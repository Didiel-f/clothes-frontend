import Typography from "@mui/material/Typography";

// ==============================================================
type Props = { digit: number; title: string };
// ==============================================================

export default function CountBox({ digit = 365, title = "DAYS" }: Props) {
  return (
    <Typography variant="h3">
      {digit}{" "}
      <Typography component="span" sx={{ color: "grey.600", fontSize: 14, fontWeight: 500 }}>
        {title}
      </Typography>
    </Typography>
  );
}
