import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducer/main.reducer";
import paginationReducer from "../reducer/pagination.reducer";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    items: paginationReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
