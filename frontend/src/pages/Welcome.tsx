import { Box, Button } from "@mui/material";
import { SignUpContainer, StyledSignupCard } from "../styles/SignupStyles";

const Welcome = () => {
  const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/signin";
  };

  return (
    <SignUpContainer direction="column" justifyContent="space-between">
      <StyledSignupCard variant="outlined">
        <h1>Welcome to the application</h1>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Button type="submit" fullWidth variant="contained" onClick={logout}>
            Logout
          </Button>
        </Box>
      </StyledSignupCard>
    </SignUpContainer>
  );
};
export default Welcome;
