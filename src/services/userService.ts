import { CreateUser, ListUsers, User } from "../domain/entities/user";
import { callForApiClient } from "./apiClient";

export const getAllUsers = async (
  itemsPerPage: number,
  page: number,
  search: string
): Promise<ListUsers> => {
  const response = await await callForApiClient.jsonService.get("/users/list", {
    params: { itemsPerPage, page, search },
  });
  return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await await callForApiClient.jsonService.get(
    `/users?id=${id}`
  );
  return response.data;
};

export const createUser = async (user: CreateUser): Promise<CreateUser> => {
  const response = await await callForApiClient.jsonService.post(
    "/users",
    user
  );
  return response.data;
};

export const updateUser = async (user: Partial<User>): Promise<User> => {
  const response = await await callForApiClient.jsonService.put(
    `/users/${user.id}`,
    user
  );
  return response.data;
};

export const deleteUser = async (id: string): Promise<User> => {
  const response = await await callForApiClient.jsonService.delete(
    `/users/${id}`
  );
  return response.data;
};
