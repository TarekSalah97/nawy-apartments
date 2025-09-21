import {
  IconButton,
  Stack,
  SxProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import Iconify from "./iconify";

export interface ITextWithIconButton {
  text: string;
  icon: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  stackSx?: SxProps;
  textProps?: TypographyProps;
  iconSx?: SxProps;
  sx?: SxProps;
}
export function TextWithIconButton({
  text,
  icon,
  onClick,
  disabled,
  stackSx,
  textProps,
  iconSx,
  sx,
}: ITextWithIconButton) {
  return (
    <IconButton onClick={onClick} sx={sx} disabled={disabled}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={{ xs: "5px", sm: "6px", md: "8px", lg: "14px" }}
        sx={stackSx}
      >
        <Typography
          color="black"
          fontSize={{ xs: "14px", sm: "14px", md: "18px", lg: "24px" }}
          {...textProps}
        >
          {text}
        </Typography>
        <Iconify
          icon={icon}
          color="black"
          sx={{
            ...iconSx,
          }}
        />
      </Stack>
    </IconButton>
  );
}
