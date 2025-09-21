// components/apartments/ApartmentCard.tsx
"use client";

import * as React from "react";
import {
  Card,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Box,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  IApartment,
  ApartmentAvailabilityStatus,
  ApartmentFinishingType,
  ApartmentSaleType,
} from "../../../models/Apartment";
import ApartmentCardContent from "./ApartmentContent";

type Props = {
  apartment: IApartment;
  onView?: () => void;
  onContact?: () => void;
  href?: string; // if you prefer linking to a details page
  locale?: string;
  currency?: string;
  dense?: boolean; // smaller height variant
};

const availabilityColor = (s: ApartmentAvailabilityStatus) => {
  switch (s) {
    case ApartmentAvailabilityStatus.AVAILABLE:
      return "success";
    case ApartmentAvailabilityStatus.RENTED:
      return "warning";
    case ApartmentAvailabilityStatus.OFF_MARKET:
    default:
      return "default";
  }
};

const saleTypeLabel = (s?: ApartmentSaleType) => {
  switch (s) {
    case ApartmentSaleType.RESALE:
      return "Resale";
    case ApartmentSaleType.DEVELOPER_SALE:
      return "Developer Sale";
    default:
      return undefined;
  }
};

export default function ApartmentCard({
  apartment: a,
  onView,
  onContact,
  href,
  locale,
  currency,
  dense,
}: Props) {
  const [fav, setFav] = React.useState(false);

  const imgSrc = a.images?.[0] ?? "/placeholder.jpg";
  const saleType = saleTypeLabel(a.saleType);

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box position="relative">
        <CardMedia
          component="img"
          image={imgSrc}
          alt={a.unitName}
          sx={{ height: dense ? 160 : 200, objectFit: "cover" }}
          loading="lazy"
        />

        {saleType && (
          <Chip
            label={saleType}
            size="small"
            color={a.saleType === ApartmentSaleType.RESALE ? "info" : "primary"}
            sx={{ position: "absolute", top: 12, left: 12, fontWeight: 700 }}
          />
        )}

        {a.availabilityStatus && (
          <Chip
            label={
              a.availabilityStatus === ApartmentAvailabilityStatus.AVAILABLE
                ? "Available"
                : a.availabilityStatus === ApartmentAvailabilityStatus.RENTED
                ? "Rented"
                : "Off Market"
            }
            size="small"
            color={availabilityColor(a.availabilityStatus) as any}
            sx={{ position: "absolute", top: 12, right: 12, fontWeight: 700 }}
          />
        )}

        <IconButton
          aria-label="favorite"
          onClick={() => setFav((f) => !f)}
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            bgcolor: "white",
            "&:hover": { bgcolor: "white" },
          }}
        >
          {fav ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      <ApartmentCardContent apartment={a} currency={currency} locale={locale} />

      {/* Actions */}
      <Stack direction="row" gap={1} p={2} pt={0}>
        {href ? (
          <Button fullWidth variant="contained" href={href}>
            View Details
          </Button>
        ) : (
          <Button fullWidth variant="contained" onClick={onView}>
            View Details
          </Button>
        )}
        <Button fullWidth variant="outlined" onClick={onContact}>
          Contact
        </Button>
      </Stack>
    </Card>
  );
}
