import { UploadFile } from "antd";

export type AnimalStatus = "available" | "adopted" | "donated";

export interface Animal {
  id: string;
  name: string;
  description: string;
  race: string;
  city: string;
  state: string;
  street: string;
  zipCode: string;
  company: string; // Assuming this references the company's ID
  receiver?: string | null; // Assuming this references the user's ID
  donatedAt?: Date | null;
  status: AnimalStatus;
  principalPictureUuid: string;
  listOfPictures: string[];
  adoptedAt?: Date | null;
  slug: string;
  birthday: Date;
  activate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAnimal {
  name: string;
  description: string;
  race: string;
  city: string;
  state: string;
  street: string;
  zipCode: string;
  company: string;
  slug: string;
  receiver?: string | null;
  donatedAt?: Date | null;
  status: AnimalStatus;
  principalPictureUuid: string;
  listOfPictures: string[];
  adoptedAt?: Date | null;
  birthday: Date;
  activate?: boolean;
}

export interface CreateAnimalForm {
  name: string;
  description: string;
  race: string;
  city: string;
  state: string;
  street: string;
  zipCode: string;
  company: string;
  slug: string;
  receiver?: string | null;
  donatedAt?: Date | null;
  status: AnimalStatus;
  principalPictureUuid: UploadFile;
  listOfPictures: UploadFile[];
  adoptedAt?: Date | null;
  birthday: Date;
  activate?: boolean;
}

export interface UpdateAnimal {
  name?: string;
  description?: string;
  race?: string;
  city?: string;
  state?: string;
  slug: string;
  street?: string;
  zipCode?: string;
  company?: string;
  receiver?: string | null;
  donatedAt?: Date | null;
  status?: AnimalStatus;
  principalPictureUuid?: string;
  listOfPictures?: string[];
  adoptedAt?: Date | null;
  birthday?: Date;
  activate?: boolean;
}

export interface ListAnimals {
  data: Animal[];
  total: number;
}
