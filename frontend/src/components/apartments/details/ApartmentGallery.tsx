// components/apartments/details/ApartmentGallery.tsx
import { Box, ImageList, ImageListItem } from "@mui/material";

export default function ApartmentGallery({ images = [] as string[] }) {
  const list = images.length ? images : ["/placeholder.jpg"];
  return (
    <Box sx={{ my: 2 }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {list.map((src, i) => (
          <ImageListItem key={`${src}-${i}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${src}`}
              alt={`Apartment image ${i + 1}`}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
