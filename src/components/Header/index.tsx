import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logout as apiLogout } from "../../controllers/auth";
import Button from "../Button";
import "./styles.css";

// header with logout button
const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const onLogoutSuccess = () => {
    logout();
  };

  const onLogoutError = (errors: { [key: string]: Array<string> }) => {
    console.error("unknown error", errors);
  };

  const handleLogout = () => {
    apiLogout(user!, onLogoutSuccess, onLogoutError);
  };

  return (
    <header>
      Authentication{" "}
      {user && (
        <div className="user_logout">
          {user.username}
          <Button title="Logout" className="logout" onClick={handleLogout} />
        </div>
      )}
    </header>
  );
};

export default Header;
