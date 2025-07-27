import { useController } from "react-hook-form";
// MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// CUSTOM DATA MODEL
import { PaymentCard } from "models/Common";

// ==============================================================
type Props = { cards: PaymentCard[] };
// ==============================================================

export default function CardList({ cards }: Props) {
  const { field } = useController({ name: "card" });

  if (!cards || !cards.length) return null;

  return (
    <Box mb={3}>
      <Typography variant="body1">Saved Cards</Typography>

      <Grid container spacing={3} mt={1.5}>
        {cards.map(({ cardType, last4Digits, name }) => {
          const selected = last4Digits === field.value;

          const handleSelect = () => {
            if (!selected) field.onChange(last4Digits);
            else field.onChange("");
          };

          return (
            <Grid size={{ md: 4, sm: 6, xs: 12 }} key={last4Digits}>
              <Card
                onClick={handleSelect}
                sx={{
                  padding: 2,
                  boxShadow: "none",
                  cursor: "pointer",
                  border: "1px solid",
                  backgroundColor: "grey.100",
                  borderColor: selected ? "primary.main" : "transparent",
                  p: { color: "grey.700" }
                }}>
                <Box height={24} width={36} position="relative" mb={1}>
                  <LazyImage
                    fill
                    alt={name}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    src={`/assets/images/payment-methods/${cardType}.svg`}
                  />
                </Box>

                <Typography variant="body1">**** **** **** {last4Digits}</Typography>
                <Typography variant="body1">{name}</Typography>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
