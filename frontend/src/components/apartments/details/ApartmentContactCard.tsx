// components/apartments/details/ApartmentContactCard.tsx
"use client";

import { Card, CardContent, Stack, Typography, Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { IApartment } from "../../../../models/Apartment";

const formatPrice = (n: number, locale = "en-EG", currency = "EGP") =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);

export default function ApartmentContactCard({
  apartment: a,
}: {
  apartment: IApartment;
}) {
  const onContact = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Card sx={{ position: { md: "sticky" }, top: { md: 96 } }}>
      <CardContent>
        <Stack spacing={1.5}>
          <Typography variant="h6" fontWeight={900}>
            {formatPrice(a.price)}
          </Typography>
          <Stack direction="row" gap={1}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<PhoneIcon />}
              onClick={onContact}
            >
              Call
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<EmailIcon />}
              onClick={onContact}
            >
              Email
            </Button>
          </Stack>
          <Typography variant="caption" color="text.secondary">
            Ref #{a.referenceNumber}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
