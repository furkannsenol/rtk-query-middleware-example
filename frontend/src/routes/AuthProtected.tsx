import React from "react";
import { Navigate } from "react-router-dom";

interface AuthProtectedProps {
  children?: React.ReactNode;
}

const AuthProtected: React.FC<AuthProtectedProps> = (props) => {
  if (!localStorage.getItem("authUser")) {
    return <Navigate to={{ pathname: "/login" }} />;
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default AuthProtected;
