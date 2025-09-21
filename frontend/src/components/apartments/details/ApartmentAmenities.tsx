// components/apartments/details/ApartmentAmenities.tsx
import { Chip, Stack, Typography, Tooltip } from "@mui/material";
import Iconify from "@/components/iconify";
import { IApartmentAmenities } from "../../../../models/Amenity";

export default function ApartmentAmenities({
  amenities,
}: {
  amenities: IApartmentAmenities[];
}) {
  if (!amenities?.length) return null;
  return (
    <Stack spacing={1.25} sx={{ mt: 2 }}>
      <Typography variant="h6" fontWeight={800}>
        Amenities
      </Typography>
      <Stack direction="row" gap={1} flexWrap="wrap">
        {amenities.map((am) => (
          <Tooltip key={am.id} title={am.name} sx={{ px: 1 }}>
            <Chip
              label={am.name}
              size="small"
              variant="outlined"
              icon={<img src={am.icon} width={16} height={16} />}
            />
          </Tooltip>
        ))}
      </Stack>
    </Stack>
  );
}
