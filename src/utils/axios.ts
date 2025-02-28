import axios, { CreateAxiosDefaults } from "axios";

export const axiosOptions: CreateAxiosDefaults = {
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 10000,
};

const axiosClient = axios.create(axiosOptions);

export { axiosClient };
