import {
  EnterpriseDTO,
  CreateEnterpriseDTO,
  ListEnterprise,
} from "domain/entities/Enterprises";
import { callForApiClient } from "./apiClient";

export const getAllEnterprises = async (
  itemsPerPage: number,
  page: number,
  search: string
): Promise<ListEnterprise> => {
  const response = await callForApiClient.jsonService.get("/animals/list", {
    params: { itemsPerPage, page, search },
  });
  return response.data;
};

export const getEnterpriseById = async (id: string): Promise<EnterpriseDTO> => {
  const response = await callForApiClient.jsonService.get(`/animals?id=${id}`);
  return response.data;
};

export const createEnterprise = async (
  user: CreateEnterpriseDTO
): Promise<CreateEnterpriseDTO> => {
  const response = await callForApiClient.jsonService.post("/animals", user);
  return response.data;
};

export const updateEnterprise = async (
  user: Partial<EnterpriseDTO>
): Promise<EnterpriseDTO> => {
  const response = await callForApiClient.jsonService.put(
    `/animals/${user.id}`,
    user
  );
  return response.data;
};

export const deleteEnterprise = async (id: string): Promise<EnterpriseDTO> => {
  const response = await callForApiClient.jsonService.delete(`/animals/${id}`);
  return response.data;
};
