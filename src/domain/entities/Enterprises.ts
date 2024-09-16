import { Animal } from "./Animals";
import { User } from "./user";
import { PageConfigDTO } from "./PageConfig";

// Enum for the status of the enterprise
export type EnterpriseStatus = "active" | "inactive";

// DTO for creating an enterprise
export interface CreateEnterpriseDTO {
  razaoSocial: string; // Corporate name (Razão Social)
  nomeFantasia: string; // Trade name (Nome Fantasia)
  cnpj: string; // CNPJ (Brazilian company ID)
  regional: string; // Regional location
  city: string; // City of the enterprise
  state: string; // State of the enterprise
  street: string; // Street of the enterprise
  description: string;
  zipCode: string; // Zip code of the enterprise
  openingDate?: Date; // Date of opening (optional)
  activate?: boolean; // Is enterprise active (default to true)
  especialidades?: string[]; // Specialties (optional)
  userId: string; // User ID for One-to-One relation
  pageConfigId?: string; // Page config ID for One-to-One relation (optional)
}

// DTO for updating an existing enterprise
export interface UpdateEnterpriseDTO {
  razaoSocial?: string; // Optional corporate name update
  nomeFantasia?: string; // Optional trade name update
  cnpj?: string; // Optional CNPJ update
  regional?: string; // Optional regional location update
  city?: string; // Optional city update
  state?: string; // Optional state update
  street?: string; // Optional street update
  zipCode?: string; // Optional zip code update
  openingDate?: Date; // Optional date of opening update
  activate?: boolean; // Optional status update
  description: string;
  especialidades?: string[]; // Optional specialties update
  userId?: string; // Optional user ID for One-to-One relation update
  pageConfigId?: string; // Optional page config ID for One-to-One relation update
}

// DTO for the response when fetching an enterprise
export interface EnterpriseDTO {
  id: string; // Enterprise ID
  razaoSocial: string; // Corporate name
  nomeFantasia: string; // Trade name
  cnpj: string; // CNPJ (Brazilian company ID)
  regional: string; // Regional location
  city: string; // City of the enterprise
  state: string; // State of the enterprise
  street: string; // Street of the enterprise
  zipCode: string; // Zip code of the enterprise
  openingDate: Date; // Date of opening
  activate: boolean; // Is enterprise active
  description: string;
  especialidades: string[]; // Specialties
  createdAt: Date; // Date of creation
  updatedAt: Date; // Date of last update
  animals: Animal[]; // One-to-Many relation (Animals)
  user: User; // One-to-One relation (User)
  pageConfig: PageConfigDTO; // One-to-One relation (PageConfig)
}

// DTO for listing multiple enterprises
export interface ListEnterpriseDTO {
  data: EnterpriseDTO[]; // Array of EnterpriseDTOs
  total: number; // Total count of enterprises
}
