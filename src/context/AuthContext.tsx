import React, { createContext, useEffect, useState } from "react";
import { UserListItem } from "../types";

// context that globally stores current user state

export const AuthContext = createContext({} as AuthContextProps);

interface AuthContextProps {
  user: UserListItem | null;
  setUser: (user: UserListItem) => void;
  logout: () => void;
}

interface Props {
  children?: React.ReactNode;
}

// context provider that also saves current user state to local storage to reset this state after reloading

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserListItem | null>(null);

  // restoring user state if there is an item in local storage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser) as UserListItem;
      setUser(parsed);
    }
  }, []);

  // saving state to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // deleting state from local storage for logout functionality
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
