"use client";

import {
  Box,
  Button,
  Slider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { IFilterState, SortByOptions } from "../../../../helpers/filters/types";
import { TextWithIconButton } from "@/components/TextWithIconButton";
import { SortOptionsPopOver } from "./SortOptions";
import ClearAllRoundedIcon from "@mui/icons-material/ClearAllRounded";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";

export interface IFilterButtons {
  filterData: IFilterState;
  setFilterData: (value: SetStateAction<IFilterState>) => void;
  onClear: () => void;
  onPatchQuery: (
    patch: Record<string, string | number | null | undefined>
  ) => void;
}

const PRICE_MIN = 0;
const PRICE_MAX = 10_000_000;
const PRICE_STEP = 50_000;

const fmtEGP = new Intl.NumberFormat("en-EG", {
  style: "currency",
  currency: "EGP",
  maximumFractionDigits: 0,
});

export function FilterButtons({
  filterData,
  setFilterData,
  onClear,
  onPatchQuery,
}: IFilterButtons) {
  const onClickSort = (event: React.MouseEvent<HTMLElement>) => {
    setFilterData((prev) => ({
      ...prev,
      sortPopoverOpen: filterData.sortPopoverOpen ? null : event.currentTarget,
    }));
  };

  const handleBedrooms = (_: any, val: number | null) => {
    const bedrooms = val ?? undefined;
    setFilterData((prev) => ({ ...prev, bedrooms, page: 1 }));
    onPatchQuery({ bedrooms: bedrooms ?? null, page: 1 });
  };

  // ----- Price slider (local, commits on release) -----
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filterData.minPrice ?? PRICE_MIN,
    filterData.maxPrice ?? PRICE_MAX,
  ]);

  useEffect(() => {
    setPriceRange([
      filterData.minPrice ?? PRICE_MIN,
      filterData.maxPrice ?? PRICE_MAX,
    ]);
  }, [filterData.minPrice, filterData.maxPrice]);

  const onPriceChange = (_: any, val: number | number[]) =>
    setPriceRange(val as [number, number]);

  const onPriceCommit = (_: any, val: number | number[]) => {
    const [min, max] = val as [number, number];
    setFilterData((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
      page: 1,
    }));
    onPatchQuery({
      minPrice: min > PRICE_MIN ? min : null,
      maxPrice: max < PRICE_MAX ? max : null,
      page: 1,
    });
  };
  const hasActiveFilters =
    !!filterData.text ||
    filterData.minPrice != null ||
    filterData.maxPrice != null ||
    filterData.bedrooms != null ||
    (filterData.sortBy != null && filterData.sortBy !== SortByOptions.NEWEST);
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 1.5, md: 2, lg: 3 }}
      pt={{ xs: 0, sm: "16px", md: 0 }}
      alignItems={{ xs: "stretch", md: "center" }}
      useFlexGap
      flexWrap="wrap"
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ width: { xs: "100%", md: "auto" } }}
      >
        <BedOutlinedIcon fontSize="small" />
        <ToggleButtonGroup
          size="small"
          color="primary"
          exclusive
          value={filterData.bedrooms ?? null}
          onChange={handleBedrooms}
          aria-label="Bedrooms"
          sx={{
            width: { xs: "100%", md: "auto" },
            flexWrap: "wrap",
            rowGap: 0.5,
            columnGap: 0.5,
            "& .MuiToggleButton-root": {
              flex: { xs: "1 1 calc(25% - 6px)", md: "0 0 auto" },
              minWidth: { xs: 0, md: 48 },
              py: 0.5,
            },
          }}
        >
          <ToggleButton value={null as unknown as number}>Any</ToggleButton>
          <ToggleButton value={1}>1</ToggleButton>
          <ToggleButton value={2}>2</ToggleButton>
          <ToggleButton value={3}>3+</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Box sx={{ width: { xs: "100%", md: 340 }, px: { xs: 0, md: 1 } }}>
        <Typography
          variant="caption"
          fontWeight={700}
          sx={{ display: "block", mb: 0.5 }}
        >
          Price
        </Typography>
        <Slider
          value={priceRange}
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={PRICE_STEP}
          onChange={onPriceChange}
          onChangeCommitted={onPriceCommit}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => fmtEGP.format(v)}
          getAriaLabel={() => "Price range"}
        />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="caption" color="text.secondary">
            {fmtEGP.format(priceRange[0])}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {fmtEGP.format(priceRange[1])}
          </Typography>
        </Stack>
      </Box>
      <Stack
        direction="row"
        spacing={{ xs: 1, md: 2 }}
        justifyContent={{ xs: "space-between", md: "flex-end" }}
        alignItems="center"
        sx={{ width: { xs: "100%", md: "auto" }, ml: { md: "auto" } }}
      >
        <TextWithIconButton
          text={"Sort by"}
          icon={
            filterData.sortPopoverOpen
              ? "ep:arrow-up-bold"
              : "ep:arrow-down-bold"
          }
          onClick={onClickSort}
          textProps={{ fontSize: { xs: "14px", md: "20px" } }}
        />

        <Button
          variant="text"
          onClick={onClear}
          disabled={!hasActiveFilters}
          startIcon={<ClearAllRoundedIcon />}
          sx={{
            textTransform: "none",
            fontSize: { xs: 14, md: 20 },
            color: "text.primary",
          }}
        >
          Clear
        </Button>
      </Stack>
      <SortOptionsPopOver
        setFilterData={setFilterData}
        filterData={filterData}
      />
    </Stack>
  );
}
