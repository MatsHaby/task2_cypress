import { ApiResponse, CreateUser, LoginUser, UserType } from "../types";

import axios from "axios";

const BASE_URL = "http://127.0.0.1:5001/api/v1";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});


const post = async <ResponseTypeFromBackend, DataTypeToSend>(url: string, data: DataTypeToSend) => {
  const response = await instance.post<ResponseTypeFromBackend>(url, data);
  const responseData = response.data;

  return responseData;
}

const patch = async <ResponseTypeFromBackend, DataTypeToSend>(url: string, data: DataTypeToSend) => {
  const response = await instance.patch<ResponseTypeFromBackend>(url, data);
  const responseData = response.data;

  return responseData;
}

const deleteAccount = async <ResponseTypeFromBackend>(url: string) => {
  const response = await instance.delete<ResponseTypeFromBackend>(url);
  const responseData = response.data;

  return responseData;
}

export const postLogin = (data: LoginUser) => post<ApiResponse<UserType>, LoginUser>("/user/login", data);
export const postCreateUser = (data: CreateUser) => post < ApiResponse < { data: string }>, LoginUser>("/user", data);
export const patchChangePassword = (data: { password: string }, id: string) => patch<ApiResponse<LoginUser>, { password: string }>(`/user/${id}`, data);
export const deleteUser = (id: string) => deleteAccount<ApiResponse<{ data: string }>>(`/user/${id}`);


