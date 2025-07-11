import { Location, NavigateFunction, Params } from "react-router-dom";

export interface IWithRouterProps {
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
}
