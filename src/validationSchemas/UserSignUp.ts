import { object, ref, string } from "yup";

// yup validation schema for user creation

export const userSignUpSchema = object({
  username: string().required("Username is required"),
  first_name: string(),
  last_name: string(),
  password: string().required("Password is required"),
  password_confirm: string()
    .oneOf([ref("password"), null], "Passwords don't match")
    .required("Confirm password is required"),
});
