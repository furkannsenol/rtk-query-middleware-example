import React, { useEffect } from "react";
import WithRouter from "../../../wrapper/WithRouter";
import { IWithRouterProps } from "../../../types/routerTypes";

const Logout: React.FC<IWithRouterProps> = ({ router }) => {
  useEffect(() => {
    localStorage.removeItem("authUser");

    const timeout = setTimeout(() => {
      router.navigate("/login");
    }, 1000);

    return () => clearTimeout(timeout);
  }, [router]);

  return <div className="p-1">Signing out, please wait...</div>;
};

export default WithRouter(Logout);
