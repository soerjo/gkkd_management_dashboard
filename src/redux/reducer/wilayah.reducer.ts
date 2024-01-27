import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import * as adminService from "@/services/admin";
import { ICreateUser } from "@/common/interfaces/create-user.interface";
import { toast } from "react-toastify";

export interface IBlesscomnReducer {
  list_user_admin?: {
    entities: Array<any>;
    meta: any;
  };
  list_wilayah?: {
    entities: Array<any>;
    meta: any;
  };
  list_role?: [];
}

const initialState: IBlesscomnReducer = {
  list_user_admin: undefined,
  list_wilayah: undefined,
  list_role: undefined,
};

let setTimeoutId: NodeJS.Timeout;

export const createUserAdmin = createAsyncThunk<{ entities: any; meta: any }, ICreateUser>(
  "admin/create",
  async (payload, dispatch) => {
    try {
      await adminService.createUserAdmin(payload);
      const response = await adminService.getListUserAdmin();
      return response.data;
    } catch (error: any) {
      if (error?.response?.status < 500) {
        toast.warn(error?.response?.data.message[0], { theme: "colored" });
        throw new Error(error);
      }

      toast.error(JSON.stringify(error.message), { theme: "colored" });
      throw new Error(error);
    }
  }
);
export const getListUserAdmin = createAsyncThunk<{ entities: any; meta: any }, adminService.GetListUserAdminDto>(
  "admin/get",
  async (payload, dispatch) => {
    try {
      const response = await adminService.getListUserAdmin(payload);
      return response.data;
    } catch (error: any) {
      toast.error(JSON.stringify(error.message), { theme: "colored" });
      throw new Error(error);
    }
  }
);

export const adminSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUserAdmin.fulfilled, (state, action) => {
      state.list_user_admin = action.payload;
    }),
      builder.addCase(getListUserAdmin.fulfilled, (state, action) => {
        state.list_user_admin = action.payload;
      });
  },
});

export const adminReducer = (state: RootState) => state.admin;

export default adminSlice.reducer;
