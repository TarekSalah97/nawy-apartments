"use client";

import { Drawer, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { IFilterState, SortByOptions } from "../../../helpers/filters/types";
import useResponsive from "../../../hooks/useResponsive";
import { PaginationSection } from "../PaginationSection";

export interface IListWithFilters {
  query: any;
}

export function ListWithFilters(props: IListWithFilters) {
  const { minPrice, maxPrice, text, page, bedrooms } = props.query;
  const isDesktop = useResponsive("up", "md");

  const [filterData, setFilterData] = useState<IFilterState>({
    apartments: [],
    loading: true,
    text: text ? (typeof text === "string" ? text : undefined) : undefined,
    page: page ?? 1,
    sortPopoverOpen: null,
    filterDrawerOpen: isDesktop ? true : false,
    selectedSort: SortByOptions.NEWEST,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    bedrooms: bedrooms ? Number(bedrooms) : undefined,
  });

  const componentProps = {
    filterData,
    setFilterData,
  };
  const isLgOrMdScreen = useResponsive("up", "md");

  useEffect(() => {
    if (props.query.text && props.query.text !== filterData.text) {
      setFilterData((prev: any) => ({ ...prev, text: props.query.text }));
    }
  }, [props.query]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setFilterData((prev) => ({ ...prev, loading: true }));
        const res = await fetch("http://localhost:4000/api/v1/apartments/", {
          credentials: "include",
        });
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
    filterData.selectedSort,
    filterData.page,
    filterData.text,
    filterData.bedrooms,
    filterData.minPrice,
    filterData.maxPrice,
  ]);

  return (
    <Stack spacing={{ xs: "20px", md: "10px" }} mb={{ xs: "60px", md: 0 }}>
      <Grid
        container
        columnSpacing={2}
        rowSpacing={2}
        alignItems={"center"}
        pt={{ xs: 2, md: 0 }}
      >
        {/* {isLgOrMdScreen ? (
          checkSelectedFilterExistence(filterData) ? (
            <SelectedFilterButtonSameLine {...componentProps} />
          ) : (
            <TitleButtonSameLine {...componentProps} />
          )
        ) : (
          <TitleButtonSameLine {...componentProps} />
        )} */}
      </Grid>

      {/* <ProductList
        products={filterData.products}
        isScrollable={false}
        loading={filterData.loading}
        addedComponentToList={
          filterData.filterDrawerOpen && isLgOrMdScreen ? (
            <Filters {...componentProps} />
          ) : undefined
        }
      /> */}

      <Drawer
        open={!isLgOrMdScreen && filterData.filterDrawerOpen}
        onClose={() =>
          setFilterData((prev) => ({ ...prev, filterDrawerOpen: false }))
        }
      >
        {/* <Filters {...componentProps} /> */}
      </Drawer>
      {!filterData.loading &&
        filterData.pageInfo &&
        filterData.apartments.length > 0 &&
        filterData.pageInfo.totalPages > 1 && (
          <PaginationSection {...componentProps} />
        )}
    </Stack>
  );
}
