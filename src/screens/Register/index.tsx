import { useFormik } from "formik";
import React, { useContext } from "react";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import "./styles.css";
import { UserAuth, UserAuthValues, UserListItem } from "../../types";
import { register } from "../../controllers/auth";
import { AuthContext } from "../../context/AuthContext";
import { userSignUpSchema } from "../../validationSchemas/UserSignUp";

// register screen

const Register = () => {
  const { setUser } = useContext(AuthContext);

  // formik initialization
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      username: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirm: "",
    } as UserAuthValues,
    validationSchema: userSignUpSchema,
    onSubmit: async (values) => {
      const onSuccessAuth = (user: UserListItem) => {
        setUser(user);
      };

      const onErrorAuth = (errors: { [key: string]: Array<string> }) => {
        Object.keys(errors).forEach((key) => {
          formik.setFieldError(key, errors[key][0]);
        });
      };

      register(
        { ...values, is_active: true } as UserAuth,
        onSuccessAuth,
        onErrorAuth
      );
    },
  });

  return (
    <div className="screen grid_center">
      <div className="flex_center_vertical login">
        <h1>Welcome</h1>
        <h2>Sign up</h2>
        <form onSubmit={formik.handleSubmit}>
          <TextInput
            id="username"
            label="Username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username ? formik.errors.username : undefined}
          />
          <TextInput
            id="first_name"
            label="First name"
            placeholder="First name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.first_name ? formik.errors.first_name : undefined
            }
          />
          <TextInput
            id="last_name"
            label="Last name"
            placeholder="Last name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.last_name ? formik.errors.last_name : undefined
            }
          />
          <TextInput
            id="password"
            label="Password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password ? formik.errors.password : undefined}
            password
          />
          <TextInput
            id="password_confirm"
            label="Confirm password"
            placeholder="Confirm password"
            value={formik.values.password_confirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password_confirm
                ? formik.errors.password_confirm
                : undefined
            }
            password
            disablePaste
          />
          <Button disabled={!formik.isValid} title="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default Register;
