import { Stack, Typography } from "@mui/material";
import { SetStateAction } from "react";
import { BottomDrawerComponent } from "../../../components/BottomDrawer";
import { CheckBoxLine } from "../../../components/BottomDrawer/CheckBoxLine";
import { IFilterState, SortByOptions } from "../../../../helpers/filters/types";
import { SortOptions } from "../../../../helpers/sorting/SortingOptions";

export interface ISortOptionsPopOver {
  filterData: IFilterState;
  setFilterData: (value: SetStateAction<IFilterState>) => void;
}
export function SortBottomDrawer({
  filterData,
  setFilterData,
}: ISortOptionsPopOver) {
  const onClick = (key: SortByOptions) => {
    setFilterData((prev) => ({
      ...prev,
      sortPopoverOpen: null,
      selectedSort: key,
    }));
  };

  const onClose = () => {
    setFilterData((prev) => ({
      ...prev,
      sortPopoverOpen: null,
    }));
  };

  return (
    <BottomDrawerComponent
      title="Sort by"
      open={filterData.sortPopoverOpen ? true : false}
      onClose={onClose}
      closeIcon={true}
      children={
        <Stack spacing={"16px"}>
          {SortOptions.map((sortOption, index) => (
            <CheckBoxLine
              key={sortOption.key}
              optionText={sortOption.text}
              optionKey={sortOption.key}
              onClick={onClick}
              selected={filterData.selectedSort === sortOption.key}
            />
          ))}
        </Stack>
      }
    ></BottomDrawerComponent>
  );
}
