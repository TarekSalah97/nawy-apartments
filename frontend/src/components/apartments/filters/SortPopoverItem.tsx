import { Button, Stack, Typography } from "@mui/material";
import Iconify from "../../../components/iconify";
import { SortByOptions } from "../../../../helpers/filters/types";

export interface ISortPopOverLine {
  text: string;
  optionKey: SortByOptions;
  selected: boolean;
  onClick: (key: SortByOptions) => void;
}

export function SortPopOverLine(props: ISortPopOverLine) {
  const { text, optionKey, selected, onClick } = props;
  return (
    <Button
      onClick={() => onClick(optionKey)}
      sx={{ textTransform: "none", color: "black" }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        width={"100%"}
        spacing={2}
      >
        <Typography>{text}</Typography>
        {selected && <Iconify icon="mdi:tick" />}
      </Stack>
    </Button>
  );
}
