import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { authLogin } from "@/services/auth";

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

export const AuthLoginAsync = createAsyncThunk<any, { usernameOrEmail: string; password: string }>(
  "auth/login",
  async (payload, thunkApi) => {
    try {
      const response = await authLogin(payload.usernameOrEmail, payload.password);
      if (!thunkApi.signal.aborted) return response;
    } catch (error: any) {
      if (error.response.status < 500) throw new Error(error.response.data.message);
      if (!thunkApi.signal.aborted) throw error;
      return thunkApi.rejectWithValue("Fetch aborted");
    }
  }
);

export const abortFetchItems = () => (dispatch: any, getState: () => RootState) => {
  const { abortController } = getState().items;
  if (abortController) abortController.abort();
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AuthLoginAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(AuthLoginAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload ?? state.data;
    });
    builder.addCase(AuthLoginAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message ?? "An error occurred";
    });
  },
});

export default authSlice.reducer;

// Selectors
export const authDataReducer = (state: RootState) => state.auth;
