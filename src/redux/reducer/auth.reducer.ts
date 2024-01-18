import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { authLogin } from "@/services/auth";
import { Options } from "next/dist/server/base-server";

interface ItemsState {
  data: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  abortController?: AbortController;
}

const initialState: ItemsState = {
  data: null,
  status: "idle",
  error: null,
};

export const abortFetchItems = () => (dispatch: any, getState: () => RootState) => {
  const { abortController } = getState().items;
  if (abortController) abortController.abort();
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.data = action.payload;
    },
    clearAuthData: (state) => {
      state.data = null;
    },
  },
});

export default authSlice.reducer;
export const { setAuthData, clearAuthData } = authSlice.actions;

// Selectors
export const authDataReducer = (state: RootState) => state.auth;
