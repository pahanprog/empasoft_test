import axios from "axios";
import { UserEdit, UserListItem } from "../types";

// users controller for fetching users and editing a user

const getUsers = (
  onSuccess: (users: Array<UserListItem>) => void,
  onError: (errors: { [key: string]: Array<string> }) => void
) => {
  axios({
    method: "get",
    url: "",
  })
    .then((res) => {
      onSuccess(res.data as Array<UserListItem>);
    })
    .catch((err) => {
      onError(err.response.data);
    });
};

const editUser = (
  user: UserEdit,
  onSuccess: (user: UserListItem) => void,
  onError: (errors: { [key: string]: Array<string> }) => void
) => {
  axios({
    method: "PATCH",
    url: user.id + "/",
    data: {
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      is_active: user.is_active,
    },
  })
    .then((res) => {
      onSuccess(res.data as UserListItem);
    })
    .catch((err) => {
      onError(err.response.data);
    });
};

export { getUsers, editUser };
