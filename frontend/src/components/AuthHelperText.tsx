import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function AuthHelperText({
  buttonText,
  questionText,
  navigateTo,
}: {
  questionText: string;
  navigateTo: string;
  buttonText: string;
}) {
  const navigate = useNavigate();
  return (
    <Typography sx={{ textAlign: "center", mt: 2 }}>
      {questionText}{" "}
      <Box
        component="span"
        sx={{
          color: "primary.main",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={() => navigate(navigateTo)}
      >
        {buttonText}
      </Box>
    </Typography>
  );
}
