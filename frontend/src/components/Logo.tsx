import React from 'react';
import { Stack } from '@mui/material';
import Link from 'next/link';
type LogoProps = {
  body: string[];
  paddingBottom?: string;
  paddingTop?: string;
  paddingLeft?: string;
  sx?: any;
  width?: string;
};
const Logo = (props: LogoProps) => {
  const logo = props.body.map((text) => <img key={text} style={{ width: props.width }} src={text} alt="Logo"/>);
  return (
    <Link href="/" style={props.sx}>
      <Stack
        sx={{ paddingLeft: props.paddingLeft, paddingTop: props.paddingTop, paddingBottom: props.paddingBottom }}
        direction="row"
      >
        {logo}
      </Stack>
    </Link>
  );
};

export default Logo;
