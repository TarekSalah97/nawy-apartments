import { useState } from "react";

import { TextWithIconButton } from "@/components/TextWithIconButton";
import { SortOptionsPopOver } from "./SortOptions";

export default function SortByFilter({ filterData, setFilterData }: any) {
  const onClickSort = (event: React.MouseEvent<HTMLElement>) => {
    setFilterData((prev: any) => ({
      ...prev,
      sortPopoverOpen: filterData.sortPopoverOpen ? null : event.currentTarget,
    }));
  };
  return (
    <>
      <TextWithIconButton
        text={"Sort by"}
        icon={
          filterData?.sortPopoverOpen
            ? "ep:arrow-up-bold"
            : "ep:arrow-down-bold"
        }
        onClick={onClickSort}
        textProps={{
          fontSize: { xs: "12px", md: "20px" },
        }}
      />
      <SortOptionsPopOver
        setFilterData={setFilterData}
        filterData={filterData}
      />
    </>
  );
}
