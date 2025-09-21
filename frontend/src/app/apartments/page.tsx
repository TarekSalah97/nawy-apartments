import * as React from "react";
import Layout from "@/components/Layout";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  IconButton,
  Container,
} from "@mui/material";
import { ListWithFilters } from "@/components/apartments/ListWithFilters";

export const metadata = { title: "Apartments" };
export default function Apartments({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  return (
    <Layout>
      <Container
        disableGutters
        maxWidth={false}
        sx={{ px: { xs: "24px", md: "60px" }, mb: 10 }}
      >
        <ListWithFilters query={searchParams} />
      </Container>
    </Layout>
  );
}
