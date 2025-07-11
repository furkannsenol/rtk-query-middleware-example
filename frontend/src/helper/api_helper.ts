import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getIsOnline } from "./networkStatus_helper";
import * as url from "./url_helper";
import { ILoginResponse, IRefreshToken } from "../types/AuthTypes";

let isRefreshing = false;
let refreshPromise: Promise<IRefreshToken | null> | null = null;

const baseQuery = fetchBaseQuery({
  baseUrl: "",
  credentials: "omit",
  prepareHeaders: (headers, { getState }: { getState: () => any }) => {
    const authUser: Partial<ILoginResponse> = JSON.parse(
      localStorage.getItem("authUser") || "{}"
    );
    const token: string | null = authUser?.token ?? null;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      headers.set("Access-Control-Allow-Origin", "*");
    }
    return headers;
  },
});

const baseQueryWithReauthMiddleware: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  let message: string | undefined;

  if (!getIsOnline()) {
    throw new Error("No Internet connection");
  }

  if (result.error && result.error.status) {
    const errorData = result?.error?.data as { message?: string };

    switch (result.error.status) {
      case 503:
        message =
          errorData?.message ||
          "The service is currently unavailable, please try again later";
        break;
      case 500:
        message =
          errorData?.message ||
          "An error occurred on the server, please try again later";
        break;
      case 404:
        message =
          errorData?.message ||
          "Sorry! the data you are looking for could not be found";
        break;
      case 403:
        message =
          errorData?.message ||
          "You do not have permission to access this resource";
        break;
      case 400:
        message = errorData?.message || "Invalid request message";
        break;
      case 401:
        if (!isRefreshing) {
          isRefreshing = true;
          const authUser: Partial<ILoginResponse> = JSON.parse(
            localStorage.getItem("authUser") || "{}"
          );
          const refreshToken: string | null = authUser?.refreshToken ?? null;

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
                const refreshTokenResult = refreshResult.data as IRefreshToken;
                const updatedAuthUser: Partial<ILoginResponse> = {
                  ...authUser,
                  token: refreshTokenResult.token,
                  refreshToken: refreshTokenResult.refreshToken,
                };
                localStorage.setItem(
                  "authUser",
                  JSON.stringify(updatedAuthUser)
                );

                isRefreshing = false;
                return refreshTokenResult;
              } else {
                isRefreshing = false;
                localStorage.setItem(
                  "timeoutRefreshToken",
                  JSON.stringify({ visible: "true" })
                );
                window.location.href = "/logout";
                return null;
              }
            })
            .catch(() => {
              // console.error("Error refreshing token", error);
              isRefreshing = false;
              window.location.href = "/logout";
              return null;
            });
        }

        const newToken = await refreshPromise;

        if (!newToken) {
          return result;
        }

        // result = await baseQueryWithReauthMiddleware(args, api, extraOptions);
        // break;
        return await baseQueryWithReauthMiddleware(args, api, extraOptions);

      default:
        message =
          errorData?.message ||
          "Sorry! something went wrong, please contact our support team";
    }
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
