import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

export const authLogin = async (usernameOrEmail: string, password: string) => {
  try {
    const response = await instance.post("/api/auth/login", {
      usernameOrEmail,
      password,
    });

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
