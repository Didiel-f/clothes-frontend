import Link from "next/link";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import East from "@mui/icons-material/East";
import { format } from "date-fns/format";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
// CUSTOM DATA MODEL
import Ticket from "models/Ticket.model";

// ==============================================================
type Props = { ticket: Ticket };
// ==============================================================

export default function TicketCard({ ticket }: Props) {
  const { id, slug, title, type, status, date, category } = ticket;

  return (
    <Link href={`/support-tickets/${slug}`} key={id}>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: 2.5,
          paddingBlock: 2,
          marginBottom: 2
        }}>
        <div>
          <Typography variant="body1" sx={{ mb: 1.5 }}>
            {title}
          </Typography>

          <FlexBox alignItems="center" flexWrap="wrap" gap={1}>
            <Chip label={type} size="small" color={type === "Urgent" ? "error" : "info"} />
            <Chip label={status} size="small" color="success" />

            <Typography variant="body1" className="pre" sx={{ color: "grey.600" }}>
              {format(new Date(date), "MMM dd, yyyy")}
            </Typography>

            <Typography variant="body1" sx={{ color: "grey.600" }}>
              {category}
            </Typography>
          </FlexBox>
        </div>

        <IconButton>
          <East
            fontSize="small"
            sx={{ color: "grey.500", ":dir(rtl)": { transform: "rotate(180deg)" } }}
          />
        </IconButton>
      </Card>
    </Link>
  );
}
