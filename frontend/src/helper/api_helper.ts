import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getIsOnline } from "./networkStatus_helper";
import * as url from "./url_helper";

let isRefreshing = false;
let refreshPromise: any = null;

export const getLoggedinUser = () => {
  const user = localStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: "",
  credentials: "omit",
  prepareHeaders: (headers, { getState }: { getState: () => any }) => {
    const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");
    const token = authUser ? authUser.token : null;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      headers.set("Access-Control-Allow-Origin", "*");
    }
    return headers;
  },
});

const baseQueryWithReauthMiddleware = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  let result: any = await baseQuery(args, api, extraOptions);
  let message: any;

  if (!getIsOnline()) {
    throw new Error("No Internet connection");
  }

  if (result.error && result.error.status) {
    switch (result.error.status) {
      case 503:
        message =
          result.error?.data?.error ||
          "The service is currently unavailable, please try again later";
        break;
      case 500:
        message =
          result.error?.data?.error ||
          "An error occurred on the server, please try again later";
        break;
      case 404:
        message =
          result.error?.data?.error ||
          "Sorry! the data you are looking for could not be found";
        break;
      case 403:
        message =
          result.error?.data?.error ||
          "You do not have permission to access this resource";
        break;
      case 400:
        message = result.error?.data?.error || "Invalid request message";
        break;
      case 401:
        if (!isRefreshing) {
          isRefreshing = true;
          const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");
          const refreshToken = authUser ? authUser.refreshToken : null;
          refreshPromise = Promise.resolve(
            baseQuery(
              {
                url: process.env.REACT_APP_BASEURL + url.REFRESH_TOKEN,
                method: "POST",
                body: { refreshToken },
              },
              api,
              extraOptions
            )
          )
            .then((refreshResult) => {
              if (refreshResult.data) {
                const refreshTokenResult = refreshResult.data as any;
                const updatedAuthUser: any = {
                  ...authUser,
                  token: refreshTokenResult.token,
                  refreshToken: refreshTokenResult.refreshToken,
                };
                localStorage.setItem(
                  "authUser",
                  JSON.stringify(updatedAuthUser)
                );
                // console.log(refreshResult, "token");
                isRefreshing = false;
                return refreshTokenResult;
              } else {
                isRefreshing = false;
                localStorage.setItem(
                  "timeoutRefreshToken",
                  JSON.stringify({ visible: "true" })
                );
                window.location.href = "/logout";
              }
              return null;
            })
            .catch((error: any) => {
              console.error("Error refreshing token", error);
              isRefreshing = false;
              window.location.href = "/logout";
            });
        }
        await refreshPromise;
        result = await baseQueryWithReauthMiddleware(args, api, extraOptions);
        break;

      default:
        message =
          result.error?.data?.error ||
          "Sorry! something went wrong, please contact our support team";
    }
    //console.log(message, "messageLog");
    if (message) {
      throw new Error(message);
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "token",
  baseQuery: baseQueryWithReauthMiddleware,
  endpoints: (builder) => ({}),
});
