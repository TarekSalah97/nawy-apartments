// components/apartments/details/ApartmentDescription.tsx
import { Card, CardContent, Typography } from "@mui/material";

export default function ApartmentDescription({
  description,
}: {
  description: string;
}) {
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={800} gutterBottom>
          Description
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ whiteSpace: "pre-line" }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
