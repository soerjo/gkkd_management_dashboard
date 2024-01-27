import { JwtEnumKey } from "@/common/enum/localstorage.enum";
import { ICreateUser } from "@/common/interfaces/create-user.interface";
import { getLocalStorage } from "@/utils/localstorage.util";
import axios, { AxiosResponse } from "axios";

const axiosInstace = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

export type GetListUserAdminDto = {
  page?: number;
  take?: number;
  search?: string;
};

export const getListUserAdmin = async (payload?: GetListUserAdminDto) => {
  try {
    const jwt = getLocalStorage(JwtEnumKey.JWT);
    const currentUser = getLocalStorage(JwtEnumKey.PAYLOAD);

    const response = await axiosInstace.get("/api/admin", {
      params: {
        page: payload?.page || 1,
        take: payload?.take || 10,
        search: payload?.search || "",
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const createUserAdmin = async (payload: ICreateUser) => {
  try {
    const jwt = getLocalStorage(JwtEnumKey.JWT);
    const currentUser = getLocalStorage(JwtEnumKey.PAYLOAD);

    const response = await axiosInstace.post(
      "/api/admin",
      {
        name: payload.name,
        email: payload.email,
        role: [payload.role],
        password: "Asdf1234.",
        regions_ids: [payload.regions_ids],
        jemaat_id: payload.jemaat_id,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateUserAdmin = async (payload: ICreateUser & { id: string }) => {
  try {
    const jwt = getLocalStorage(JwtEnumKey.JWT);
    const currentUser = getLocalStorage(JwtEnumKey.PAYLOAD);

    const response = await axiosInstace.patch(
      "/api/admin/" + payload.id,
      {
        name: payload.name,
        email: payload.email,
        role: [payload.role],
        password: "Asdf1234.",
        regions_ids: [payload.regions_ids],
        jemaat_id: payload.jemaat_id,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getListOfRole = async () => {
  try {
    const jwt = getLocalStorage(JwtEnumKey.JWT);
    const currentUser = getLocalStorage(JwtEnumKey.PAYLOAD);

    const response = await axiosInstace.get("/api/lov/role", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteUserAdmin = async (userId: string) => {
  try {
    const jwt = getLocalStorage(JwtEnumKey.JWT);
    const currentUser = getLocalStorage(JwtEnumKey.PAYLOAD);

    const response = await axiosInstace.delete("/api/admin/" + userId, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
