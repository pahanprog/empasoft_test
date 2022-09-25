import React from "react";
import { UserListItem } from "../../types";
import "./styles.css";

interface Props {
  user: UserListItem;
  onClick: (user: UserListItem) => void;
}

// user list item component
const User = ({ user, onClick }: Props) => {
  const handleClick = () => {
    if (!user.is_superuser) {
      onClick(user);
    }
  };

  return (
    <div
      className={`user_container ${user.is_superuser ? "not_allowed" : ""}`}
      onClick={handleClick}
    >
      <div className="header">
        <div
          className={`user_active_indicator ${
            user.is_active ? "active" : "inactive"
          }`}
        />
        <div>{user.username}</div>
        {user.is_superuser && <div className="super">Super</div>}
      </div>
      <div className="fullname">
        {user.first_name && <div>{user.first_name}</div>}
        {user.last_name && <div>{user.last_name}</div>}
      </div>
      <div className="last_login">
        {new Date(user.last_login).toLocaleDateString()}
      </div>
    </div>
  );
};

export default User;
