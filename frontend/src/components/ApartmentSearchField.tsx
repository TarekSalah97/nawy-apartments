"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SxProps } from "@mui/material";
import SearchField from "./SearchField";

export interface IProductSearchField {
  sx?: SxProps;
  onClick?: () => void;
}
export default function ApartmentSearchField({
  sx,
  onClick,
}: IProductSearchField) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <SearchField
      placeholder={`Search`}
      onClick={onClick}
      onInputChange={(value: string) => {
        if (value != "") {
          const params = new URLSearchParams(searchParams?.toString() ?? "");
          params.set("text", String(value));
          router.push(`${pathname}?${params.toString()}`);
        }
      }}
      size="small"
      sx={sx}
    />
  );
}
