import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import * as adminService from "@/services/admin";
import * as wilayahService from "@/services/wilayah";

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
  list_role?: Array<string>;
  selected_admin?: any;
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
        toast.warn(error?.response?.data.message, { theme: "colored" });
        throw new Error(error);
      }

      toast.error(JSON.stringify(error.message), { theme: "colored" });
      throw new Error(error);
    }
  }
);

export const updateUserAdmin = createAsyncThunk<{ entities: any; meta: any }, ICreateUser & { id: string }>(
  "admin/create",
  async (payload, dispatch) => {
    try {
      await adminService.updateUserAdmin(payload);
      const response = await adminService.getListUserAdmin();
      return response.data;
    } catch (error: any) {
      if (error?.response?.status < 500) {
        toast.warn(error?.response?.data.message, { theme: "colored" });
        throw new Error(error);
      }

      toast.error(JSON.stringify(error.message), { theme: "colored" });
      throw new Error(error);
    }
  }
);

export const getListUserAdmin = createAsyncThunk<
  { wilayah: any; listAdmin: any; listOfRole: Array<string> },
  adminService.GetListUserAdminDto
>("admin/get", async (payload, dispatch) => {
  try {
    const responseWilayah = await wilayahService.getListWilayah();
    const responseListUser = await adminService.getListUserAdmin(payload);
    const responseListOfRole = await adminService.getListOfRole();

    return {
      wilayah: responseWilayah.data,
      listAdmin: responseListUser.data,
      listOfRole: responseListOfRole.data,
    };
  } catch (error: any) {
    toast.error(JSON.stringify(error.message), { theme: "colored" });
    throw new Error(error);
  }
});

export const deleteUserAdmin = createAsyncThunk<{ listAdmin: any }, string>(
  "admin/delete",
  async (payload, dispatch) => {
    try {
      await adminService.deleteUserAdmin(payload);
      const responseListUser = await adminService.getListUserAdmin();

      return {
        listAdmin: responseListUser.data,
      };
    } catch (error: any) {
      toast.error(JSON.stringify(error.message), { theme: "colored" });
      throw new Error(error);
    }
  }
);

export const adminSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    selectAdmin(state, action) {
      state.selected_admin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUserAdmin.fulfilled, (state, action) => {
      state.list_user_admin = action.payload;
    }),
      builder.addCase(getListUserAdmin.fulfilled, (state, action) => {
        state.list_user_admin = action.payload.listAdmin;
        state.list_wilayah = action.payload.wilayah;
        state.list_role = action.payload.listOfRole;
      }),
      builder.addCase(deleteUserAdmin.fulfilled, (state, action) => {
        state.list_user_admin = action.payload.listAdmin;
      });
  },
});

export const { selectAdmin } = adminSlice.actions;
export const adminReducer = (state: RootState) => state.admin;

export default adminSlice.reducer;
