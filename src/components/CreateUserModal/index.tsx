import { useFormik } from "formik";
import React, { useState } from "react";
import { register } from "../../controllers/auth";
import { UserAuth, UserAuthValues, UserListItem } from "../../types";
import { userSignUpSchema } from "../../validationSchemas/UserSignUp";
import Button from "../Button";
import Modal from "../Modal";
import Plus from "../svgs/Plus";
import TextInput from "../TextInput";
import "./styles.css";

interface Props {
  onCreateSuccess: (user: UserListItem) => void;
}

// create user modal
const CreateUserModal = ({ onCreateSuccess }: Props) => {
  // modal state
  const [modalHidden, setModalHidden] = useState(true);

  // fromik initialization
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
      const onSuccess = (user: UserListItem) => {
        onCreateSuccess(user);
        handleClose();
      };

      const onEditError = (errors: { [key: string]: Array<string> }) => {
        Object.keys(errors).forEach((key) => {
          formik.setFieldError(key, errors[key][0]);
        });
      };

      register(
        { ...values, is_active: true } as UserAuth,
        onSuccess,
        onEditError
      );
    },
  });

  const handleCreateClick = () => {
    setModalHidden(false);
  };

  const handleClose = () => {
    setModalHidden(true);
  };

  return (
    <>
      <div className="user_create" onClick={handleCreateClick}>
        <Plus />
      </div>
      <Modal handleClose={handleClose} hidden={modalHidden}>
        <h3>Create user</h3>
        <form onSubmit={formik.handleSubmit}>
          <TextInput
            id="username"
            label="Username*"
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
            label="Password*"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password ? formik.errors.password : undefined}
            password
          />
          <TextInput
            id="password_confirm"
            label="Confirm password*"
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
          <Button disabled={!formik.isValid} title="Create user" />
        </form>
      </Modal>
    </>
  );
};

export default CreateUserModal;
