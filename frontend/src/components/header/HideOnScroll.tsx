import { Slide, useScrollTrigger } from "@mui/material";

export function HideOnScroll({ children, onScrollDown }: any) {
  const trigger = useScrollTrigger();
  if (trigger) {
    if (onScrollDown) {
      onScrollDown();
    }
  }

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
