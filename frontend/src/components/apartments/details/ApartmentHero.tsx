// components/apartments/details/ApartmentHero.tsx
import { Box, Chip, Stack, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  IApartment,
  ApartmentSaleType,
  ApartmentAvailabilityStatus,
  ApartmentFinishingType,
} from "../../../../models/Apartment";

const formatPrice = (n: number, locale = "en-EG", currency = "EGP") =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);

export default function ApartmentHero({
  apartment: a,
}: {
  apartment: IApartment;
}) {
  const saleLabel =
    a.saleType === ApartmentSaleType.RESALE
      ? "Resale"
      : a.saleType === ApartmentSaleType.DEVELOPER_SALE
      ? "Developer Sale"
      : undefined;

  const availLabel =
    a.availabilityStatus === ApartmentAvailabilityStatus.AVAILABLE
      ? "Available"
      : a.availabilityStatus === ApartmentAvailabilityStatus.RENTED
      ? "Rented"
      : "Off Market";

  const finishingLabel =
    a.finishingType === ApartmentFinishingType.FINISHED
      ? "Finished"
      : a.finishingType === ApartmentFinishingType.NOT_FINISHED
      ? "Not Finished"
      : undefined;

  return (
    <Stack spacing={1.25}>
      <Typography variant="h4" fontWeight={800}>
        {a.unitName}
      </Typography>

      {(a.address || a.city || a.country) && (
        <Stack
          direction="row"
          gap={1}
          alignItems="center"
          color="text.secondary"
        >
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2">
            {[a.address, a.city, a.country].filter(Boolean).join(", ")}
          </Typography>
        </Stack>
      )}

      <Stack direction="row" gap={1} flexWrap="wrap" alignItems="center">
        {saleLabel && <Chip label={saleLabel} size="small" color="primary" />}
        <Chip
          label={availLabel}
          size="small"
          color={
            a.availabilityStatus === ApartmentAvailabilityStatus.AVAILABLE
              ? "success"
              : a.availabilityStatus === ApartmentAvailabilityStatus.RENTED
              ? "warning"
              : "default"
          }
        />
        {finishingLabel && (
          <Chip label={finishingLabel} size="small" variant="outlined" />
        )}
        <Box sx={{ ml: "auto" }}>
          <Typography variant="h5" fontWeight={900}>
            {formatPrice(a.price)}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}
