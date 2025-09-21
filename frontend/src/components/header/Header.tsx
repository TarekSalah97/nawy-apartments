"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import ApartmentSearchField from "../ApartmentSearchField";
import { Stack } from "@mui/material";
import Link from "next/link";

interface Props {
  window?: () => Window;
  children?: React.ReactElement<unknown>;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

function ApplicationHeader() {
  return (
    <HideOnScroll>
      <AppBar
        id="appBar"
        sx={{
          backgroundColor: "white",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          boxShadow: 0,
          borderBottom: "1px solid rgba(0, 0, 0, 0.20)",
          px: { xs: 2, md: 5 },
        }}
      >
        {/* <LoadingIndicator /> */}
        <Stack spacing={8}>
          <Stack
            direction="row"
            sx={{ py: "15px" }}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Link
              href="/apartments"
              aria-label="Go to apartments"
              style={{ display: "inline-flex" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nawy.svg"
                alt="Nawy"
                style={{ height: 32, cursor: "pointer" }}
              />
            </Link>
            <ApartmentSearchField onClick={() => {}} />
          </Stack>
          {/* {searchDataOptions && (
            <SearchDataAppBar
              open={searchDataOptions}
              onClose={onCloseSearch}
            />
          )} */}
        </Stack>
      </AppBar>
    </HideOnScroll>
  );
}
export default ApplicationHeader;
