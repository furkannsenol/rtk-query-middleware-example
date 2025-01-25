import { apiSlice } from "../../helper/api_helper";
import * as url from "../../helper/url_helper";
import { ICategory, IProduct } from "../../types/productTypes";

const BASE_URL = process.env.REACT_APP_BASEURL;

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: BASE_URL + url.PRODUCT,
        method: "GET",
      }),
      keepUnusedDataFor: 0.000001,
    }),
    getCategories: builder.query<ICategory[], void>({
      query: () => ({
        url: BASE_URL + url.CATEGORY,
        method: "GET",
      }),
      keepUnusedDataFor: 0.000001,
    }),
  }),
});

export const { useGetProductsQuery, useGetCategoriesQuery } = productsApiSlice;
