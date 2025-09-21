"use client";

import { Stack, Typography } from "@mui/material";
import MenuPopover from "../../../components/menu-popover";
import { SetStateAction } from "react";
import { BottomDrawerComponent } from "../../../components/BottomDrawer";
import { SortBottomDrawer } from "./SortDrawer";
import { IFilterState, SortByOptions } from "../../../../helpers/filters/types";
import useResponsive from "../../../../hooks/useResponsive";
import { SortOptions } from "../../../../helpers/sorting/SortingOptions";
import { SortPopOverLine } from "./SortPopoverItem";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export interface ISortOptionsPopOver {
  filterData: IFilterState;
  setFilterData: (value: SetStateAction<IFilterState>) => void;
}
export function SortOptionsPopOver({
  filterData,
  setFilterData,
}: ISortOptionsPopOver) {
  const isDesktop = useResponsive("up", "md");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const onClick = (key: SortByOptions) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("sortBy", String(key));
    router.push(`${pathname}?${params.toString()}`);
    setFilterData((prev) => ({
      ...prev,
      sortPopoverOpen: null,
      sortBy: key,
    }));
  };

  const onClose = () => {
    setFilterData((prev) => ({
      ...prev,
      sortPopoverOpen: null,
    }));
  };

  return (
    <>
      {isDesktop ? (
        <MenuPopover
          open={filterData.sortPopoverOpen ?? null}
          onClose={onClose}
          sx={{
            px: { xs: "15px", md: "20px" },
            py: { xs: "12px", md: "16px" },
          }}
        >
          <Stack spacing={1}>
            {SortOptions.map((sortOption, index) => (
              <SortPopOverLine
                key={sortOption.key}
                text={sortOption.text}
                optionKey={sortOption.key}
                onClick={onClick}
                selected={filterData.sortBy === sortOption.key}
              />
            ))}
          </Stack>
        </MenuPopover>
      ) : (
        <SortBottomDrawer
          filterData={filterData}
          setFilterData={setFilterData}
        />
      )}
    </>
  );
}
