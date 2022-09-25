import { useFormik } from "formik";
import React, { useEffect } from "react";
import { object, string } from "yup";
import { editUser } from "../../controllers/users";
import { UserEdit, UserListItem } from "../../types";
import Button from "../Button";
import Checkbox from "../Checkbox";
import Modal from "../Modal";
import TextInput from "../TextInput";
import "./styles.css";

// user edit validation schema
const userEditSchema = object({
  username: string().required("Username is required"),
  first_name: string(),
  last_name: string(),
});

interface Props {
  user: UserEdit;
  onEditSuccess: (user: UserListItem) => void;
  handleClose: () => void;
}

// user edit modal
const EditUserModal = ({ user, onEditSuccess, handleClose }: Props) => {
  // formik initialization
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      username: "",
      first_name: "",
      last_name: "",
      is_active: false,
    } as UserEdit,
    validationSchema: userEditSchema,
    onSubmit: async (values) => {
      const onEditError = (errors: { [key: string]: Array<string> }) => {
        Object.keys(errors).forEach((key) => {
          formik.setFieldError(key, errors[key][0]);
        });
      };
      editUser(values, onEditSuccess, onEditError);
    },
  });

  const handleIsActiveChange = () => {
    formik.setFieldValue("is_active", !formik.values.is_active);
  };

  // initialize formik values when user props becomes availible
  useEffect(() => {
    if (user) {
      formik.setValues(user);
    }
  }, [user]);

  return (
    <Modal handleClose={handleClose}>
      <h3>Edit user</h3>
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
          error={formik.touched.last_name ? formik.errors.last_name : undefined}
        />
        <Checkbox
          title="Is active"
          checked={formik.values.is_active}
          changeChecked={handleIsActiveChange}
        />
        <Button disabled={!formik.isValid} title="Save changes" />
      </form>
    </Modal>
  );
};

export default EditUserModal;
