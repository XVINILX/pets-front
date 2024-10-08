import {
  Animal,
  AnimalType,
  CreateAnimal,
  ListAnimals,
} from "domain/entities/Animals";
import { callForApiClient } from "./apiClient";

export const getAllAnimals = async (
  items: number,
  page: number,
  search: string
): Promise<ListAnimals> => {
  const response = await callForApiClient.jsonService.get("/animals/list", {
    params: { items, page, search },
  });
  return response.data;
};

export const getAllAnimalsCompanyId = async (
  companyId: string,
  items: number,
  page: number,
  search: string
): Promise<ListAnimals> => {
  const response = await callForApiClient.jsonService.get(
    "/animals/list-by-companyId",
    {
      params: { items, page, search, companyId },
    }
  );
  return response.data;
};

export const getAllAnimalsAuth = async (
  items: number,
  page: number,
  search: string
): Promise<ListAnimals> => {
  const response = await callForApiClient.jsonService.get(
    "/animals/list/auth",
    {
      params: { items, page, search },
    }
  );
  return response.data;
};

export const getBreedsByType = async (
  type: string
): Promise<{ breeds: string[] }> => {
  const response = await callForApiClient.jsonService.get(
    `/animals/type=${type}`
  );
  return response.data;
};

export const getAnimalByIdAuth = async (id: string): Promise<Animal> => {
  const response = await callForApiClient.jsonService.get(
    `/animals/auth?id=${id}`
  );
  return response.data;
};

export const getAnimalById = async (id: string): Promise<Animal> => {
  const response = await callForApiClient.jsonService.get(`/animals?id=${id}`);
  return response.data;
};

export const getAnimalBySlug = async (slug: string): Promise<Animal> => {
  const response = await callForApiClient.jsonService.get(
    `/animals/slug=${slug}`
  );
  return response.data;
};

export const createAnimal = async (
  user: CreateAnimal
): Promise<CreateAnimal> => {
  const response = await callForApiClient.jsonService.post("/animals", user);
  return response.data;
};

export const updateAnimal = async (user: Partial<Animal>): Promise<Animal> => {
  const response = await callForApiClient.jsonService.put(
    `/animals/${user.id}`,
    user
  );
  return response.data;
};

export const deleteAnimal = async (id: string): Promise<Animal> => {
  const response = await callForApiClient.jsonService.delete(`/animals/${id}`);
  return response.data;
};
