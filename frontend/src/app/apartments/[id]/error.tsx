// app/apartments/[id]/error.tsx
"use client";

import { Button, Container, Stack, Typography } from "@mui/material";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h5">Couldn’t load apartment</Typography>
        <Typography color="text.secondary">
          Please try again. If the issue persists, check the backend API.
        </Typography>
        <Button onClick={reset} variant="contained">
          Retry
        </Button>
      </Stack>
    </Container>
  );
}
