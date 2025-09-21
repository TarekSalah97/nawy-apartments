import React from "react";
import { Stack } from "@mui/material";
import ApplicationHeader from "./header/Header";
type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <Stack spacing={10} mb={5}>
      <ApplicationHeader />
      {children}
    </Stack>
  );
};

export default Layout;
