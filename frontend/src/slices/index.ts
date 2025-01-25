import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../helper/api_helper";

// Example Counter
// import CounterReducer from "./Counter/reducer";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,

  // Example Counter
  //   Counter: CounterReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
