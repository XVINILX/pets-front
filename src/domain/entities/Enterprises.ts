import { User } from "./user";

import { Animal } from "./Animals";
import { PageConfigDTO } from "./PageConfig";

// Enum for the status of the enterprise
export type EnterpriseStatus = "active" | "inactive";

// DTO for creating an enterprise
export interface CreateEnterpriseDTO {
  razaoSocial: string; // Corporate name
  nomeFantasia: string; // Trade name
  cnpj: string; // CNPJ (Brazilian company ID)
  regional: string; // Regional location
  openingDate: Date; // Date of opening
  activate?: boolean; // Is enterprise active (default to true)
  especialidades?: string[]; // Specialties (optional)
  userId: string; // User ID for One-to-One relation
  pageConfigId: string; // Page config ID for One-to-One relation
}

// DTO for updating an existing enterprise
export interface UpdateEnterpriseDTO {
  razaoSocial?: string; // Optional corporate name update
  nomeFantasia?: string; // Optional trade name update
  cnpj?: string; // Optional CNPJ update
  regional?: string; // Optional regional location update
  openingDate?: Date; // Optional date of opening update
  activate?: boolean; // Optional status update
  especialidades?: string[]; // Optional specialties update
}

// DTO for the response when fetching an enterprise
export interface EnterpriseDTO {
  id: string; // Enterprise ID
  razaoSocial: string; // Corporate name
  nomeFantasia: string; // Trade name
  cnpj: string; // CNPJ (Brazilian company ID)
  regional: string; // Regional location
  openingDate: Date; // Date of opening
  activate: boolean; // Is enterprise active
  especialidades: string[]; // Specialties
  createdAt: Date; // Date of creation
  updatedAt: Date; // Date of last update
  animals: Animal[]; // One-to-Many relation (Animals)
  user: User; // One-to-One relation (User)
  pageConfig: PageConfigDTO; // One-to-One relation (PageConfig)
}

export interface ListEnterprise {
  data: EnterpriseDTO[];
  total: number;
}
