import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { format } from "date-fns/format";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
// CUSTOM DATA MODEL
import { Message } from "models/Ticket.model";

// ==============================================================
type Props = { message: Message };
// ==============================================================

export default function ConversationCard({ message }: Props) {
  const { imgUrl, name, date, text } = message;

  return (
    <FlexBox gap={2} mb={4}>
      <Avatar variant="rounded">
        <Image fill src={imgUrl} alt={name} sizes="(40px, 40px)" />
      </Avatar>

      <div>
        <Typography variant="h5">{name}</Typography>

        <Typography variant="body1" sx={{ color: "grey.600" }}>
          {format(new Date(date), "hh:mm:a | dd MMM yyyy")}
        </Typography>

        <Typography
          variant="body1"
          borderRadius={2}
          sx={{
            backgroundColor: "grey.100",
            padding: "1rem",
            marginTop: "1rem",
            lineHeight: 1.7,
            textAlign: "justify"
          }}>
          {text}
        </Typography>
      </div>
    </FlexBox>
  );
}
