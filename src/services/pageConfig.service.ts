import {
  EnterpriseDTO,
  CreateEnterpriseDTO,
  ListEnterpriseDTO,
} from "domain/entities/Enterprises";
import { callForApiClient } from "./apiClient";
import { CreatePageConfigDTO, PageConfigDTO } from "domain/entities/PageConfig";

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

export const createPageConfig = async (
  pageConfig: CreatePageConfigDTO
): Promise<PageConfigDTO> => {
  const response = await callForApiClient.jsonService.post(
    "/pageConfig",
    pageConfig
  );
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
