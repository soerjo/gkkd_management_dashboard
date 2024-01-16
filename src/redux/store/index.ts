import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducer/main.reducer";
import mainReducer from "../reducer/main.reducer";
import paginationReducer from "../reducer/pagination.reducer";
import authReducer from "../reducer/auth.reducer";
import alertReducer from "../reducer/alert.reducer";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    main: mainReducer,
    items: paginationReducer,
    auth: authReducer,
    alert: alertReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
