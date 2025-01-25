import { apiSlice } from "../../../helper/api_helper";
import * as url from "../../../helper/url_helper";
import { ILoginRequest, ILoginResponse } from "../../../types/AuthTypes";

const BASE_URL_AUTH_SERVICE = process.env.REACT_APP_BASEURL;

export const authsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (body) => ({
        url: BASE_URL_AUTH_SERVICE + url.LOGIN,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = authsApiSlice;

export const logoutUser = () => async (dispatch: any) => {
  try {
    localStorage.removeItem("authUser");
  } catch (error: any) {}
};
