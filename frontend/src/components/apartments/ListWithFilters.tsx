"use client";

import { Drawer, Grid, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { IFilterState, SortByOptions } from "../../../helpers/filters/types";
import useResponsive from "../../../hooks/useResponsive";
import { PaginationSection } from "../PaginationSection";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ApartmentCard from "./ApartmentCard";
import { ApartmentCardSkeleton } from "./ApartmentCardSkeleton";
import { FilterButtons } from "./filters/FilterButtons";

export interface IListWithFilters {
  query: any;
}

const toNum = (v: string | null | undefined) =>
  v != null && v !== "" ? Number(v) : undefined;

export function ListWithFilters(props: IListWithFilters) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlState = useMemo(() => {
    const page = toNum(searchParams.get("page")) ?? 1;
    const text = searchParams.get("text") ?? undefined;
    const minPrice = toNum(searchParams.get("minPrice"));
    const maxPrice = toNum(searchParams.get("maxPrice"));
    const bedrooms = toNum(searchParams.get("bedrooms"));
    const sortBy = searchParams.get("sortBy") ?? undefined;
    return { page, text, minPrice, maxPrice, bedrooms, sortBy };
  }, [searchParams]);

  const isDesktop = useResponsive("up", "md");

  const [filterData, setFilterData] = useState<IFilterState>({
    apartments: [],
    loading: true,
    text: urlState.text,
    page: urlState.page,
    sortPopoverOpen: null,
    filterDrawerOpen: !!isDesktop,
    minPrice: urlState.minPrice,
    maxPrice: urlState.maxPrice,
    bedrooms: urlState.bedrooms,
    sortBy: urlState.sortBy ?? SortByOptions.NEWEST,
  });
  const componentProps = {
    filterData,
    setFilterData,
  };

  useEffect(() => {
    setFilterData((prev) => ({
      ...prev,
      text: urlState.text,
      page: urlState.page,
      minPrice: urlState.minPrice,
      maxPrice: urlState.maxPrice,
      bedrooms: urlState.bedrooms,
      sortBy: urlState.sortBy,
    }));
  }, [
    urlState.page,
    urlState.text,
    urlState.minPrice,
    urlState.maxPrice,
    urlState.sortBy,
    urlState.bedrooms,
  ]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setFilterData((prev) => ({ ...prev, loading: true }));
        setFilterData((prev) => ({ ...prev, loading: true }));
        const qs = new URLSearchParams();
        qs.set("page", String(urlState.page));
        if (urlState.text) qs.set("searchQuery", urlState.text);
        if (urlState.minPrice != null)
          qs.set("minPrice", String(urlState.minPrice));
        if (urlState.maxPrice != null)
          qs.set("maxPrice", String(urlState.maxPrice));
        if (urlState.bedrooms != null)
          qs.set("bedrooms", String(urlState.bedrooms));
        if (urlState.sortBy) qs.set("sortBy", urlState.sortBy);
        const res = await fetch(
          `http://localhost:4000/api/v1/apartments?${qs.toString()}`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        if (ignore) return;
        setFilterData((prev) => ({
          ...prev,
          pageInfo: json.pageInfo,
          apartments: json.data ?? [],
          loading: false,
        }));
      } catch (e) {
        if (!ignore) setFilterData((prev) => ({ ...prev, loading: false }));
        console.error(e);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [
    urlState.page,
    urlState.text,
    urlState.minPrice,
    urlState.maxPrice,
    urlState.bedrooms,
    urlState.sortBy,
  ]);

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    // remove all filter keys you use in URL
    ["text", "minPrice", "maxPrice", "bedrooms", "sortBy"].forEach((k) =>
      params.delete(k)
    );
    params.set("page", "1"); // back to first page

    router.push(`${pathname}?${params.toString()}`);

    setFilterData((prev) => ({
      ...prev,
      text: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      bedrooms: undefined,
      sortBy: SortByOptions.NEWEST,
      page: 1,
    }));
  };

  const onPatchQuery = (
    patch: Record<string, string | number | null | undefined>
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(patch).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "") params.delete(k);
      else params.set(k, String(v));
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Stack spacing={{ xs: "10px", md: "20px" }} mb={{ xs: "60px", md: 0 }}>
      <Grid
        size={{ xs: 6, md: 4, lg: 4 }}
        justifyContent="flex-end"
        style={{ paddingLeft: 0 }}
      >
        <FilterButtons
          {...componentProps}
          onClear={clearFilters}
          onPatchQuery={onPatchQuery}
        />
      </Grid>
      {!filterData.loading && filterData.apartments ? (
        <Grid container spacing={2}>
          {filterData.apartments.map((apt) => (
            <Grid key={apt.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <ApartmentCard
                apartment={apt}
                href={`/apartments/${apt.id}`}
                dense
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((apt) => (
            <Grid key={apt} size={{ xs: 12, md: 6, lg: 4 }}>
              <ApartmentCardSkeleton />
            </Grid>
          ))}
        </Grid>
      )}

      {!filterData.loading &&
        filterData.pageInfo &&
        filterData.apartments.length > 0 &&
        filterData.pageInfo.totalPages > 1 && (
          <PaginationSection {...componentProps} />
        )}
    </Stack>
  );
}
