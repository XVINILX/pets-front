import { EnterpriseDTO } from "./Enterprises";
import { QuestionDTO } from "./Questions";

export interface QuestionnairyConfigDTO {
  id: string;
  type: string;
  questions: QuestionDTO[];
  enterprise: EnterpriseDTO | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListQuestionnairyConfigDto {
  total: number;
  data: QuestionnairyConfigDTO[];
}

export interface CreateQuestionnairyConfigDTO {
  type: string;
  questions?: QuestionDTO[];
  enterpriseId?: string;
}

export interface UpdateQuestionnairyConfigDTO {
  type?: string;
  questions?: QuestionDTO[];
  enterpriseId?: string;
}
