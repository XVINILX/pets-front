import {
  LoginAdminDto,
  LoginEmployeeDto,
  LoginResponseDto,
} from "domain/dtos/auth.dto";

import { callForApiClient } from "./apiClient";

export const loginAdminDto = async (
  login: LoginAdminDto
): Promise<LoginResponseDto> => {
  const response = await callForApiClient.jsonService.post(
    `/auth/login`,
    login
  );
  return response.data;
};

export const loginGoogle = async (): Promise<LoginResponseDto> => {
  const response = await callForApiClient.jsonService.get(`/auth`);
  return response.data;
};

export const loginEmployee = async (
  login: LoginEmployeeDto
): Promise<LoginResponseDto> => {
  const response = await callForApiClient.jsonService.post(
    "/auth/employee",
    login
  );
  return response.data;
};

export const refreshToken = async (): Promise<LoginResponseDto> => {
  const response = await callForApiClient.jsonService.get("/auth/me");
  return response.data;
};
