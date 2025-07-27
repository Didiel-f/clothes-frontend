import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { format } from "date-fns/format";

// ==============================================================
type Props = { date: string; title: string };
// ==============================================================

export default function BlogCard({ title, date }: Props) {
  return (
    <Card sx={{ backgroundColor: "grey.100", padding: 2 }}>
      <Typography variant="body1" sx={{ mb: 1 }}>
        {format(new Date(date), "dd MMMM, yyyy")}
      </Typography>

      <Typography variant="h3" sx={{ fontSize: 21 }}>
        {title}
      </Typography>

      <LinearProgress
        value={50}
        color="info"
        variant="determinate"
        sx={{ my: 3, borderRadius: 6 }}
      />

      <Button variant="text" endIcon={<ArrowForward fontSize="small" />}>
        Read More
      </Button>
    </Card>
  );
}
