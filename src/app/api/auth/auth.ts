/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post("http://localhost:4000/auth/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
