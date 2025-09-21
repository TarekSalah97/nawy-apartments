import { Drawer, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import Iconify from "../iconify";

export interface IBottomDrawerComponent {
  children: JSX.Element;
  open: boolean;
  onClose: () => void;
  title?: string;
  closeIcon?: boolean;
}
export function BottomDrawerComponent({
  children,
  open,
  onClose,
  title,
  closeIcon,
}: IBottomDrawerComponent) {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { py: "20px", px: "24px", borderRadius: "20px 20px 0px 0px" },
      }}
    >
      <Stack spacing={"22px"}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          {title && (
            <Typography alignSelf={"center"} fontSize={"16px"} fontWeight={600}>
              {title}
            </Typography>
          )}

          {closeIcon && (
            <IconButton onClick={onClose}>
              <Iconify color={"black"} icon={"gg:close"} />
            </IconButton>
          )}
        </Stack>
        {children}
      </Stack>
    </Drawer>
  );
}
