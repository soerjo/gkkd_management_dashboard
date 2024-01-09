import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchItems } from "@/services/pagination";
import { RootState } from "../store";

interface ItemsState {
  items: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  pageSize: number;
  abortController?: AbortController;
}

const initialState: ItemsState = {
  items: [],
  status: "idle",
  error: null,
  currentPage: 1,
  pageSize: 10,
};

// Create an async thunk for fetching items
export const fetchItemsAsync = createAsyncThunk<Array<any> | void, { page: number; pageSize: number }>(
  "items/fetchItems",
  async (payload, thunkApi) => {
    try {
      const response = await fetchItems(payload.page, payload.pageSize);
      if (!thunkApi.signal.aborted) return response;
    } catch (error) {
      if (!thunkApi.signal.aborted) throw error;
      return thunkApi.rejectWithValue("Fetch aborted");
    }
  }
);

export const abortFetchItems = () => (dispatch: any, getState: () => RootState) => {
  const { abortController } = getState().items;
  if (abortController) abortController.abort();
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItemsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchItemsAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload ?? state.items;
    });
    builder.addCase(fetchItemsAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message ?? "An error occurred";
    });
  },
});

export const { setCurrentPage } = itemsSlice.actions;

export default itemsSlice.reducer;

// Selectors
export const allItems = (state: RootState) => state.items;
