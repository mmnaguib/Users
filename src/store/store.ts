import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import AuthSlice from "./slices/AuthSlice";
const store = configureStore({reducer:{user: UserSlice, auth: AuthSlice}});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;