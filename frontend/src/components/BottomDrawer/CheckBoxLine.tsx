import { Checkbox, Stack, Typography } from "@mui/material";

export interface ICheckBoxLine {
  selected: boolean;
  optionText: string;
  optionKey: string;
  onClick: (optionKey: any) => void;
}

export function CheckBoxLine({
  selected,
  onClick,
  optionKey,
  optionText,
}: ICheckBoxLine) {
  return (
    <Stack direction={"row"} spacing={"14px"} alignItems={'center'}>
      <Checkbox
        sx={{
          "&.Mui-checked": {
            color: "black",
          },
          p: 0
        }}
        checked={selected}
        onChange={(event, checked) => {
          if (selected && !checked) return;
          onClick(optionKey);
        }}
      />
      <Typography color={'black'} fontSize={"12px"} fontWeight={400}>
        {optionText}
      </Typography>
    </Stack>
  );
}
