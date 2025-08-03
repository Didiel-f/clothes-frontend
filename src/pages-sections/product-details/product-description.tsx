import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function ProductDescription({ description }: { description: string }) {
  return (
    <Box sx={{ maxWidth: { xs: '100%', md: 800 }}}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Descripción:
      </Typography>

      <Typography variant="body1" sx={{ whiteSpace: 'pre-line', fontSize: '1.25rem' }}>
        {description}
      </Typography>
    </Box>
  );
}
