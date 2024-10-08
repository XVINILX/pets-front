import { QuestionnairyConfigDTO } from "./questionnairyConfig";

export interface QuestionDTO {
  id: string;
  question: string;
  type: QuestionType;
  order?: number;
  step?: number;
  questionnairyConfig?: QuestionnairyConfigDTO | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateQuestionDTO {
  question: string;
  type: QuestionType;
  order?: number;
  step?: number;
  questionnairyConfigId?: string;
}

export interface UpdateQuestionDTO {
  question?: string;
  type?: QuestionType;
  order?: number;
  step?: number;
  questionnairyConfigId?: string;
}

export enum QuestionType {
  email = "email",
  tellphone = "tellphone",
  text = "text",
  address = "address",
}
