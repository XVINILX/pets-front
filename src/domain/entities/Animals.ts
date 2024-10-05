import { UploadFile } from "antd";
import { FileEntity } from "./file";

export type AnimalStatus = "available" | "adopted" | "other";

export type AnimalGenders = "female" | "male";

export type AnimalType = "dog" | "cat";

export interface Animal {
  id: string;
  name: string;
  description: string;
  race: string;
  city: string;
  state: string;
  street: string;
  zipCode: string;
  company: string;
  receiver?: string | null;
  initialDateAtDonation?: Date | null;
  status: AnimalStatus;
  principalPictureUuid: FileEntity;
  imagesList: FileEntity[];
  adoptedAt?: Date | null;
  gender: AnimalGenders;
  slug: string;
  birthday: Date;
  specialTreatment?: string;
  healthHistory?: string;
  activate: boolean;
  createdAt: Date;
  updatedAt: Date;
  type: AnimalType;
  castrated: boolean;
}

export interface AnimalListImage {
  imageUuid: string;

  order: number;
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
  initialDateAtDonation?: Date | null;
  gender: AnimalGenders;
  status: AnimalStatus;
  principalPictureUuid: string;
  imagesList: AnimalListImage[];
  specialTreatment?: string;
  healthHistory?: string;
  adoptedAt?: Date | null;
  birthday: Date | null;
  activate?: boolean;
  weight?: number;
  type: AnimalType;
  castrated: boolean;
}

export interface CreateAnimalForm {
  name: string;
  description: string;
  race: string;
  city: string;
  state: string;
  gender: AnimalGenders;
  street: string;
  zipCode: string;
  company: string;
  specialTreatment?: string;
  healthHistory?: string;
  slug: string;
  receiver?: string | null;
  initialDateAtDonation?: Date | null;
  status: AnimalStatus;
  principalPictureUuid: any;
  imagesList: UploadFile[];
  adoptedAt?: Date | null;
  birthday: Date;
  activate?: boolean;
  weight?: number;
  type: AnimalType;
  castrated: boolean;
}

export interface UpdateAnimal {
  name?: string;
  description?: string;
  race?: string;
  city?: string;
  state?: string;
  slug: string;
  gender: AnimalGenders;
  street?: string;
  zipCode?: string;
  specialTreatment?: string;
  healthHistory?: string;
  company?: string;
  receiver?: string | null;
  initialDateAtDonation?: Date | null;
  status?: AnimalStatus;
  principalPictureUuid?: string;
  imagesList?: string[];
  adoptedAt?: Date | null;
  birthday?: Date;
  activate?: boolean;
  type: AnimalType;
  castrated: boolean;
}

export interface ListAnimals {
  data: Animal[];
  total: number;
}
