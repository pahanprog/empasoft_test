import React from "react";
import AuthProvider from "./AuthContext";

interface Props {
  children?: React.ReactNode;
}

// context provider that puts all context together
const ContextProvider = ({ children }: Props) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ContextProvider;
