// { options, message, close }: { options: string, message: string, close: () => void }
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Options = "success" | "error" | "info";

interface AlerState {
  options: Options;
  message: string;
  isOpen: boolean;
}

const initialState: AlerState = {
  options: "success",
  message: "",
  isOpen: false,
};

let setTimeoutId: NodeJS.Timeout;

export const alertOpenAsync = createAsyncThunk<
  { options: Options; message: string },
  { options: Options; message: string }
>("alert/open", async (payload, { dispatch }) => {
  clearTimeout(setTimeoutId);
  setTimeoutId = setTimeout(() => dispatch({ type: "alert/close" }), 10000);
  return { options: payload.options, message: payload.message };
});

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    openAlert: (state, action: PayloadAction<{ options: Options; message: string }>) => {
      state.options = action.payload.options;
      state.message = action.payload.message;
      state.isOpen = true;
    },
    closeAlert: (state) => {
      state.isOpen = false;
    },
    resetAlert: (state) => {
      clearTimeout(setTimeoutId);

      state.options = "success";
      state.message = "";
      state.isOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(alertOpenAsync.fulfilled, (state, action) => {
      state.options = action.payload.options;
      state.message = action.payload.message;
      state.isOpen = true;
    });
    builder.addCase("alert/close", (state, action) => {
      state.isOpen = false;
    });
  },
});

// Selectors
export const { openAlert, closeAlert, resetAlert } = alertSlice.actions;
export const alertReducer = (state: RootState) => state.alert;

export default alertSlice.reducer;
