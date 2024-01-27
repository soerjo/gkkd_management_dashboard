import { JwtEnumKey } from "@/common/enum/localstorage.enum";
import { getLocalStorage } from "@/utils/localstorage.util";
import axios from "axios";

const axiosInstace = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

export const getBlesscomn = async () => {
  try {
    const jwt = getLocalStorage(JwtEnumKey.JWT);
    const currentUser = getLocalStorage(JwtEnumKey.PAYLOAD);

    const response = await axiosInstace.get("/api/blesscomn", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export type GetReportBlesscomnDto = {
  page?: number;
  take?: number;
  search?: string;
  date_start?: Date;
  date_end?: Date;
};

export const getReportBlesscomn = async (payload?: GetReportBlesscomnDto) => {
  try {
    const jwt = getLocalStorage(JwtEnumKey.JWT);
    const currentUser = getLocalStorage(JwtEnumKey.PAYLOAD);

    const response = await axiosInstace.get("/api/blesscomn-report", {
      params: {
        page: payload?.page || 1,
        take: payload?.take || 10,
        date_start: payload?.date_start || null,
        date_end: payload?.date_end || null,
        // region_id: payload?.region_id || null ,?
        search: payload?.search || "",
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log({ response });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
