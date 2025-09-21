// app/apartments/[id]/page.tsx
import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Layout from "@/components/Layout";

import { IApartment } from "../../../../models/Apartment";
import ApartmentAmenities from "@/components/apartments/details/ApartmentAmenities";
import ApartmentContactCard from "@/components/apartments/details/ApartmentContactCard";
import ApartmentDescription from "@/components/apartments/details/ApartmentDescription";
import ApartmentDeveloperCard from "@/components/apartments/details/ApartmentDeveloperCard";
import ApartmentGallery from "@/components/apartments/details/ApartmentGallery";
import ApartmentHero from "@/components/apartments/details/ApartmentHero";
import ApartmentKeyFacts from "@/components/apartments/details/ApartmentKeyFacts";
import ApartmentSpecs from "@/components/apartments/details/ApartmentSpecs";

async function getApartment(id: string): Promise<IApartment> {
  const res = await fetch(`http://localhost:4000/api/v1/apartments/${id}`, {
    cache: "no-store",
  });
  if (res.status === 404) notFound();
  if (!res.ok) throw new Error(`Failed to load apartment ${id}`);
  const json = await res.json();

  // Be resilient to API shape
  const apt: IApartment =
    json?.data?.apartment ?? json?.data ?? json?.apartment ?? json;

  if (!apt?.id) notFound();
  return apt;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const apt = await getApartment(params.id);
    const titleParts = [
      apt.unitName,
      apt.city,
      apt.country,
      apt.projectName && `— ${apt.projectName}`,
    ]
      .filter(Boolean)
      .join(" ");
    return {
      title: titleParts || "Apartment Details",
      description:
        apt.description?.slice(0, 150) ||
        `View apartment ${apt.referenceNumber} details.`,
    };
  } catch {
    return { title: "Apartment Details" };
  }
}

export default async function ApartmentPage({
  params,
}: {
  params: { id: string };
}) {
  const apt = await getApartment(params.id);

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ my: { xs: 2, md: 4 } }}>
        <ApartmentHero apartment={apt} />

        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Left column */}
          <Grid size={{ xs: 12, md: 8 }}>
            <ApartmentGallery images={apt.images} />
            <ApartmentSpecs apartment={apt} />
            {apt.description && (
              <ApartmentDescription description={apt.description} />
            )}
            {!!apt.amenities?.length && (
              <ApartmentAmenities amenities={apt.amenities} />
            )}
            <ApartmentKeyFacts apartment={apt} />
          </Grid>

          {/* Right column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <ApartmentContactCard apartment={apt} />
            {apt.developer && (
              <ApartmentDeveloperCard developer={apt.developer} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
