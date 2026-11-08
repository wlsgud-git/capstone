import axios from "axios";

export const axiosError = (error) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data.message;
  }
};
