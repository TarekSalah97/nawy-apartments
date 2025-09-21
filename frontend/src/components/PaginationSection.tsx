// src/components/PaginationSection.tsx
"use client";

import { SetStateAction } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter, usePathname, useSearchParams } from "next/navigation"; // ✅ App Router hooks
import Iconify from "./iconify";
import { IFilterState } from "../../helpers/filters/types";

export interface IPagination {
  filterData: IFilterState;
  setFilterData: (value: SetStateAction<IFilterState>) => void;
}

export function PaginationSection({ filterData, setFilterData }: IPagination) {
  const currentPage = filterData.pageInfo
    ? Number(filterData.pageInfo.page)
    : Number(filterData.page);

  const totalPages = Number(filterData.pageInfo?.totalPages ?? 1);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChange = (offset: number) => {
    const newPage = Math.min(Math.max(1, currentPage + offset), totalPages);

    // Preserve existing query params and update `page`
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("page", String(newPage));

    // App Router navigation (no `shallow` option needed here)
    router.push(`${pathname}?${params.toString()}`);

    // Local UI state
    setFilterData((prev) => ({ ...prev, page: newPage }));
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  };

  const onClickPrev = () => onChange(-1);
  const onClickNext = () => onChange(1);

  const noPages = filterData.apartments.length === 0;

  return (
    <Stack direction="row" justifyContent="space-around" alignItems="center">
      <ButtonItem
        text="Previous"
        icon="system-uicons:arrow-left"
        disabled={currentPage === 1 || noPages}
        onClick={onClickPrev}
        reverse
      />

      <Stack direction="row" spacing={2}>
        <Typography>Page</Typography>
        <Typography fontWeight={700} sx={{ textDecoration: "underline" }}>
          {filterData.pageInfo?.page ?? filterData.page}
        </Typography>
        <Typography>{`of ${totalPages}`}</Typography>
      </Stack>

      <ButtonItem
        text="Next"
        icon="system-uicons:arrow-right"
        disabled={currentPage >= totalPages || noPages}
        onClick={onClickNext}
      />
    </Stack>
  );
}

interface IButtonItem {
  text: string;
  icon: string;
  disabled: boolean;
  onClick: () => void;
  reverse?: boolean;
}

function ButtonItem({ text, icon, disabled, reverse, onClick }: IButtonItem) {
  return (
    <Button
      sx={{
        p: "8px",
        px: { xs: "10px", md: "20px", lg: "40px" },
        border: "0.5px solid #000",
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <Stack direction={reverse ? "row-reverse" : "row"} spacing={1}>
        <Typography color="black">{text}</Typography>
        <Iconify icon={icon} color="black" />
      </Stack>
    </Button>
  );
}
