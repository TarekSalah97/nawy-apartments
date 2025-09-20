import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().min(3).required(),
  password: yup
    .string()
    .min(8)
    .matches(/[A-Za-z]/, "At least one letter")
    .matches(/\d/, "At least one number")
    .matches(/[@$!%*?&]/, "At least one special character")
    .required(),
});
