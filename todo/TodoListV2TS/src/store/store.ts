import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

let store = configureStore({
    reducer: {
        profile: apiSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store