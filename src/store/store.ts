import { configureStore } from "@reduxjs/toolkit";
import { dataState } from "./reducers/dataReducer";
import { loginState } from "./reducers/loginReducer";
import { apiState } from "./reducers/apiReducer";

export const store = configureStore({
    reducer : {
        data : dataState.reducer,
        loginData : loginState.reducer,
        apiData : apiState.reducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;