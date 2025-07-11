import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IWithRouterProps } from "../types/routerTypes";

function WithRouter<P extends object>(
  Component: React.ComponentType<P & IWithRouterProps>
): React.FC<P> {
  function ComponentWithRouterProp(props: P) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

export default WithRouter;
