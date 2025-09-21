import { Card, Box } from "@mui/material";

export function ApartmentCardSkeleton() {
  return (
    <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Box sx={{ height: 200, bgcolor: "action.hover" }} />
      <Box p={2}>
        <Box
          sx={{ height: 18, width: "60%", bgcolor: "action.hover", mb: 1 }}
        />
        <Box
          sx={{ height: 16, width: "40%", bgcolor: "action.hover", mb: 1 }}
        />
        <Box sx={{ height: 16, width: "80%", bgcolor: "action.hover" }} />
      </Box>
    </Card>
  );
}
