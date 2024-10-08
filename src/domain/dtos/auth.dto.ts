import { UserType } from "domain/entities/user";

export interface LoginResponseDto {
  email: string;
  accessToken: string;
  userType: UserType;
  id: string;
}

export interface LoginAdminDto {
  email: string;
  password: string;
}

export interface LoginEmployeeDto {
  loginIdentification: string;
}
