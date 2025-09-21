// components/apartments/details/ApartmentKeyFacts.tsx
import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { IApartment } from "../../../../models/Apartment";

export default function ApartmentKeyFacts({
  apartment: a,
}: {
  apartment: IApartment;
}) {
  const rows: Array<[string, string | number | undefined]> = [
    ["Reference #", a.referenceNumber],
    ["Unit number", a.unitNumber],
    ["Project", a.projectName],
    ["Finishing", a.finishingType?.replace(/_/g, " ")],
    ["Availability", a.availabilityStatus?.replace(/_/g, " ")],
    ["Sale type", a.saleType?.replace(/_/g, " ")],
    ["Floor", a.floor],
    ["Year built", a.yearBuilt],
    ["Area (m²)", a.areaSqm],
  ];

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={800} gutterBottom>
          Key facts
        </Typography>
        <Stack divider={<Divider flexItem />} spacing={1}>
          {rows.map(([k, v]) => (
            <Stack
              key={k}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              py={1}
            >
              <Typography variant="body2" color="text.secondary">
                {k}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {String(v)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
