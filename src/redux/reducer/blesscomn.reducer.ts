import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import * as blesscomnService from "@/services/blesscomn";
import { ICreateReportBlesscomn } from "@/common/interfaces/create-report-blesscomn.interface";

export interface IBlesscomnReducer {
  list_blesscomn?: {
    entities: Array<any>;
    meta: any;
  };
  list_report?: {
    entities: Array<any>;
    meta: any;
  };
  chart_blesscomn?: {
    lable: Array<string>;
    value: Array<number>;
  };
}

const initialState: IBlesscomnReducer = {
  list_blesscomn: undefined,
  list_report: undefined,
  chart_blesscomn: undefined,
};

let setTimeoutId: NodeJS.Timeout;

export const createBlesscomn = createAsyncThunk<void, ICreateReportBlesscomn>(
  "blesscomn/create",
  async (payload, dispatch) => {
    const {} = payload;
  }
);

export const getBlesscomn = createAsyncThunk<{ entities: any; meta: any }>("blesscomn/get", async (_, dispatch) => {
  const response = await blesscomnService.getBlesscomn();
  return response.data;
});

export const createReportBlesscomn = createAsyncThunk<void, ICreateReportBlesscomn>(
  "report-blesscomn/create",
  async (payload, dispatch) => {
    const {} = payload;
  }
);
export const getReportBlesscomn = createAsyncThunk<
  { entities: any; meta: any },
  blesscomnService.GetReportBlesscomnDto
>("report-blesscomn/get", async (payload, dispatch) => {
  const response = await blesscomnService.getReportBlesscomn(payload);
  return response.data;
});

export const blesscomnSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBlesscomn.fulfilled, (state, action) => {
      state.list_blesscomn = action.payload;
    }),
      builder.addCase(getReportBlesscomn.fulfilled, (state, action) => {
        state.list_report = action.payload;
      });
  },
});

export const blesscomnReducer = (state: RootState) => state.blesscomn;

export default blesscomnSlice.reducer;
