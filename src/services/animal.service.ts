import { Animal, CreateAnimal, ListAnimals } from "domain/entities/Animals";
import { callForApiClient } from "./apiClient";

export const getAllAnimals = async (
  itemsPerPage: number,
  page: number,
  search: string
): Promise<ListAnimals> => {
  const response = await callForApiClient.jsonService.get("/animals/list", {
    params: { itemsPerPage, page, search },
  });
  return response.data;
};

export const getAnimalById = async (id: string): Promise<Animal> => {
  const response = await await callForApiClient.jsonService.get(
    `/animals?id=${id}`
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
