import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../validation/SignupSchema";
import client from "../api/client";
import { ApiRoutes } from "../helpers/ApiRoutes";
import { LocalStorageKeys } from "../helpers/LocalStorageKeys";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  FormControl,
  FormLabel,
  TextField,
  Button,
} from "@mui/material";
import { SignUpContainer, StyledSignupCard } from "../styles/SignupStyles";
import { AuthHelperText } from "../components/AuthHelperText";

type SignUpForm = {
  email: string;
  name: string;
  password: string;
};

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    setLoading(true);
    try {
      const res = await client.post(ApiRoutes.signup, data);
      localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, res.data.accessToken);
      navigate("/welcome");
    } catch (error: any) {
      alert(error.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignUpContainer direction="column" justifyContent="space-between">
      <StyledSignupCard variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="name">Full name</FormLabel>
            <TextField
              fullWidth
              id="name"
              {...register("name")}
              placeholder="Jon Snow"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              fullWidth
              id="email"
              {...register("email")}
              placeholder="your@email.com"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              fullWidth
              id="password"
              type="password"
              {...register("password")}
              placeholder="••••••"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </FormControl>

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={loading}
          >
            Sign up
          </LoadingButton>
          <AuthHelperText
            navigateTo="/signin"
            buttonText="Sign in"
            questionText="Already have an account?"
          />
        </Box>
      </StyledSignupCard>
    </SignUpContainer>
  );
}
