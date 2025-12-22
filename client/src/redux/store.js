import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./featuers/userSlice";
import memoReducer from "./featuers/memoSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        memo: memoReducer,
    },
});
