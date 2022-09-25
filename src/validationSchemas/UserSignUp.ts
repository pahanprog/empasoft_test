import { object, ref, string } from "yup";

// yup validation schema for user creation

export const userSignUpSchema = object({
  username: string()
    .required("Username is required")
    .matches(/^[\w.@+-]+$/, "Letters, digits and @/./+/-/_ only"),
  first_name: string(),
  last_name: string(),
  password: string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password should be 8+ characters, 1 capital, 1 numeric"
    ),
  password_confirm: string()
    .oneOf([ref("password"), null], "Passwords don't match")
    .required("Confirm password is required"),
});
