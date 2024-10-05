import { QuestionnairyConfigDTO } from "./questionnairyConfig";

export interface QuestionDTO {
  id: string;
  question: QuestionType;
  type: string;
  order?: number;
  step?: number;
  questionnairyConfig: QuestionnairyConfigDTO | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateQuestionDTO {
  question: string;
  type: string;
  order?: number;
  step?: number;
  questionnairyConfigId?: string;
}

export interface UpdateQuestionDTO {
  question?: string;
  type?: string;
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
