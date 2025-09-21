// components/apartments/details/ApartmentDeveloperCard.tsx
import { Card, CardContent, Stack, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import { IDeveloper } from "../../../../models/Developer";

export default function ApartmentDeveloperCard({
  developer,
}: {
  developer: IDeveloper;
}) {
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Stack direction="row" gap={1} alignItems="center" mb={1}>
          <BusinessIcon fontSize="small" />
          <Typography variant="h6" fontWeight={800}>
            Developer
          </Typography>
        </Stack>
        <Typography variant="body2" fontWeight={700}>
          {developer.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
