import { AnswerConfigEntity } from "./answerConfig";

export interface AnswerDTO {
  id: string;
  order?: number;
  step?: number;
  question: string;
  answer: string;
  answerConfig: AnswerConfigEntity | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAnswerDTO {
  order?: number;
  step?: number;
  question: string;
  answer: string;
  answerConfigId?: string;
}

export interface UpdateAnswerDTO {
  order?: number;
  step?: number;
  question?: string;
  answer?: string;
  answerConfigId?: string;
}
