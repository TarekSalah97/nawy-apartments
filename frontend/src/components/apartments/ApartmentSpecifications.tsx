import * as React from "react";
import {
  Stack,
  Typography,
} from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StairsIcon from "@mui/icons-material/Stairs";

import {
  IApartment,
} from "../../../models/Apartment";

type Props = {
  apartment: IApartment;
};

export default function ApartmentSpecification({ apartment: a }: Props) {
  return (
    <Stack direction="row" gap={2} alignItems="center" flexWrap="wrap">
      <Spec icon={<BedIcon fontSize="small" />} label={`${a.bedrooms} bd`} />
      <Spec
        icon={<BathtubIcon fontSize="small" />}
        label={`${a.bathrooms} ba`}
      />
      <Spec
        icon={<SquareFootIcon fontSize="small" />}
        label={`${a.areaSqm} m²`}
      />
      {a.floor != null && (
        <Spec
          icon={<StairsIcon fontSize="small" />}
          label={`Floor ${a.floor}`}
        />
      )}
      {a.yearBuilt != null && (
        <Spec
          icon={<CalendarMonthIcon fontSize="small" />}
          label={`${a.yearBuilt}`}
        />
      )}
      {a.projectName && (
        <Spec icon={<BusinessIcon fontSize="small" />} label={a.projectName} />
      )}
    </Stack>
  );
}

function Spec({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Stack direction="row" gap={0.5} alignItems="center">
      {icon}
      <Typography variant="body2">{label}</Typography>
    </Stack>
  );
}
