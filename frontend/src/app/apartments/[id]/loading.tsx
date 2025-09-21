// app/apartments/[id]/loading.tsx
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Card, CardContent, Skeleton, Stack } from "@mui/material";

export default function Loading() {
  return (
    <Container maxWidth="lg" sx={{ my: { xs: 2, md: 4 } }}>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Skeleton variant="text" width="60%" height={40} />
        <Skeleton variant="text" width="30%" height={28} />
      </Stack>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Skeleton variant="rectangular" height={360} sx={{ mb: 2 }} />
          <Card>
            <CardContent>
              <Skeleton width="40%" />
              <Skeleton width="70%" />
              <Skeleton width="50%" />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Skeleton width="60%" />
              <Skeleton width="80%" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
