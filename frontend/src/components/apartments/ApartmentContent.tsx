// components/apartments/ApartmentCard.tsx
"use client";

import * as React from "react";
import {
  CardContent,
  Chip,
  Stack,
  Typography,
  Tooltip,
  Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";

import {
  IApartment,
  ApartmentFinishingType,
} from "../../../models/Apartment";
import ApartmentSpecification from "./ApartmentSpecifications";

type Props = {
  apartment: IApartment;
  currency?: string;
  locale?: string;
};

const formatPrice = (n: number, locale = "en-EG", currency = "EGP") =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);

const finishingLabel = (f?: ApartmentFinishingType) => {
  switch (f) {
    case ApartmentFinishingType.FINISHED:
      return "Finished";
    case ApartmentFinishingType.NOT_FINISHED:
      return "Not Finished";
    default:
      return undefined;
  }
};

export default function ApartmentCardContent({
  apartment: a,
  currency,
  locale,
}: Props) {
  const finishing = finishingLabel(a.finishingType);

  return (
    <CardContent sx={{ flexGrow: 1 }}>
      <Stack spacing={1.25}>
        {/* Title + price */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
        >
          <Typography variant="h6" fontWeight={800} noWrap title={a.unitName}>
            {a.unitName}
          </Typography>
          <Typography variant="subtitle1" fontWeight={800} whiteSpace="nowrap">
            {formatPrice(a.price, locale, currency)}
          </Typography>
        </Stack>

        {/* Location */}
        {(a.address || a.city || a.country) && (
          <Stack
            direction="row"
            gap={1}
            alignItems="center"
            color="text.secondary"
          >
            <LocationOnIcon fontSize="small" />
            <Typography
              variant="body2"
              noWrap
              title={`${a.address ?? ""} ${a.city ?? ""} ${a.country ?? ""}`}
            >
              {[a.address, a.city, a.country].filter(Boolean).join(", ")}
            </Typography>
          </Stack>
        )}

        <ApartmentSpecification apartment={a} />

        {/* Finishing + Developer */}
        <Stack direction="row" gap={1} flexWrap="wrap">
          {finishing && (
            <Chip label={finishing} size="small" variant="outlined" />
          )}
          {a.developer?.name && (
            <Chip
              label={`By ${a.developer.name}`}
              size="small"
              variant="outlined"
              icon={<BusinessIcon fontSize="small" />}
            />
          )}
          <Chip
            label={`Ref #${a.referenceNumber}`}
            size="small"
            variant="outlined"
            sx={{ ml: "auto" }}
          />
        </Stack>

        {!!a.amenities?.length && (
          <>
            <Divider />
            <Stack direction="row" gap={1} flexWrap="wrap">
              {a.amenities.slice(0, 4).map((am) => (
                <Tooltip key={am.id} title={am.name}>
                  <Chip
                    size="small"
                    variant="outlined"
                    sx={{ px: 1 }}
                    icon={<img src={am.icon} width={16} height={16} />}
                    label={am.name}
                  />
                </Tooltip>
              ))}
              {a.amenities.length > 4 && (
                <Chip
                  size="small"
                  variant="outlined"
                  label={`+${a.amenities.length - 4} more`}
                />
              )}
            </Stack>
          </>
        )}
      </Stack>
    </CardContent>
  );
}
