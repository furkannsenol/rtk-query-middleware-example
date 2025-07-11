import React from "react";
import { Button } from "reactstrap";
import { IWithRouterProps } from "../types/routerTypes";
import WithRouter from "./WithRouter";

const UnknownError: React.FC<IWithRouterProps> = ({ router }) => {
  const handleBackToHome = () => {
    router.navigate("/");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100 gap-3">
      <h1>Oops! Unknown Error</h1>
      <Button color="dark" onClick={handleBackToHome}>
        Back to Home
      </Button>
    </div>
  );
};

export default WithRouter(UnknownError);
