import { Animal } from "./Animals";
import { AnswerDTO } from "./Answers";

export interface AnswerConfigEntity {
  id: string;
  animal: Animal | null;
  answers: AnswerDTO[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAnswerConfigDTO {
  animalId?: string;
  answers?: AnswerDTO[];
}

export interface UpdateAnswerConfigDTO {
  animalId?: string;
  answers?: AnswerDTO[];
}
