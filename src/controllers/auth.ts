import axios from "axios";
import { UserAuth, UserListItem } from "../types";

// authorization controller for register and logout operations

const register = async (
  user: UserAuth,
  onSuccess: (user: UserListItem) => void,
  onError: (errors: { [key: string]: Array<string> }) => void
) => {
  axios({
    method: "post",
    url: "",
    data: {
      ...user,
    },
  })
    .then((res) => {
      onSuccess(res.data);
    })
    .catch((err) => {
      onError(err.response.data);
    });
};

const logout = async (
  user: UserListItem,
  onSuccess: () => void,
  onError: (errors: { [key: string]: Array<string> }) => void
) => {
  axios({
    method: "patch",
    url: user.id + "/",
    data: {
      is_active: false,
    },
  })
    .then((res) => {
      onSuccess();
    })
    .catch((err) => {
      onError(err.response.data);
    });
};

export { register, logout };
