import {
  EnterpriseDTO,
  CreateEnterpriseDTO,
  ListEnterpriseDTO,
} from "domain/entities/Enterprises";
import { callForApiClient } from "./apiClient";

export const getAllEnterprises = async (
  itemsPerPage: number,
  page: number,
  search: string
): Promise<ListEnterpriseDTO> => {
  const response = await callForApiClient.jsonService.get("/enterprise/list", {
    params: { itemsPerPage, page, search },
  });
  return response.data;
};

export const getEnterpriseById = async (id: string): Promise<EnterpriseDTO> => {
  const response = await callForApiClient.jsonService.get(
    `/enterprise?id=${id}`
  );
  return response.data;
};

export const getEnterpriseBySlug = async (
  slug: string
): Promise<EnterpriseDTO> => {
  const response = await callForApiClient.jsonService.get(
    `/enterprise?slug=${slug}`
  );
  return response.data;
};
export const createEnterprise = async (
  user: CreateEnterpriseDTO
): Promise<CreateEnterpriseDTO> => {
  const response = await callForApiClient.jsonService.post("/enterprise", user);
  return response.data;
};

export const updateEnterprise = async (
  user: Partial<EnterpriseDTO>
): Promise<EnterpriseDTO> => {
  const response = await callForApiClient.jsonService.put(
    `/enterprise/${user.id}`,
    user
  );
  return response.data;
};

export const deleteEnterprise = async (id: string): Promise<EnterpriseDTO> => {
  const response = await callForApiClient.jsonService.delete(
    `/enterprise/${id}`
  );
  return response.data;
};
