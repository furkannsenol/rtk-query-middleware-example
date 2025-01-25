import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Logout = lazy(() => import("../pages/Authentication/logout/Logout"));
const Login = lazy(() => import("../pages/Authentication/login/Login"));
const Home = lazy(() => import("../pages/home/Home"));
const NotFound = lazy(() => import("../pages/notFound/NotFound"));
const ProductList = lazy(() => import("../pages/products/ProductList"));

const authProtectedRoutes = [
  { path: "/", component: <Home /> },
  { path: "/home", component: <Home /> },
  { path: "/product-list", component: <ProductList /> },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/404", component: <NotFound /> },
  { path: "*", component: <Navigate to="/404" /> },
];

export { authProtectedRoutes, publicRoutes };
