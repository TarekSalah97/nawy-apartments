import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { debounce } from "lodash";
import { useEffect, useMemo, useRef } from "react";
import Iconify from "./iconify";

type IProps = {
  onInputChange: (input: string) => void;
  onType?: boolean;
};

type Props = IProps & TextFieldProps;

export default function SearchField(props: Props) {
  const { placeholder, onInputChange, onType, sx, ...others } = props;
  const inputRef = useRef<any>(null);

  const changeHandler = (event: any) => {
    onInputChange(event.target.value);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  return (
    <TextField
      {...others}
      fullWidth
      inputRef={inputRef}
      onChange={onType ? debouncedChangeHandler : undefined}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          if (!onType) {
            onInputChange(inputRef.current?.value);
          }
        }
      }}
      placeholder={placeholder}
      sx={{
        width: { lg: "40%", md: "30%", xs: "30%", sm: "30%" },
        border: "1.501px solid #000",
        transition: 'width 0.3s ease',
        borderRadius: "6px",
        ":hover": {
          width: { lg: "40%", md: "30%", xs: "40%", sm: "40%" },
        },
        ...sx
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <Iconify
              icon={"eva:search-fill"}
              sx={{
                color: "black",
                width: 20,
                height: 20,
                cursor: "pointer",
              }}
              onClick={() => {
                onInputChange(inputRef.current?.value);
              }}
            />
          </InputAdornment>
        ),
      }}
    />
  );
}
