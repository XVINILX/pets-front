import { CreateQuestionDTO, QuestionDTO } from "domain/entities/Questions";
import { callForApiClient } from "./apiClient";
import {
  CreateQuestionnairyConfigDTO,
  ListQuestionnairyConfigDto,
  QuestionnairyConfigDTO,
} from "domain/entities/questionnairyConfig";

export const createQuestion = async (
  question: CreateQuestionDTO
): Promise<QuestionDTO> => {
  const response = await callForApiClient.jsonService.post(
    "/questionConfig/question",
    question
  );
  return response.data;
};

export const listQuestionsWithPagination = async (
  page: number,
  items: number,
  search: string
): Promise<ListQuestionnairyConfigDto> => {
  const response = await callForApiClient.jsonService.get(
    `/questionConfig/items=${items}/page=${page}/search=${search}`
  );
  return response.data;
};

export const selectQuestionsList =
  async (): Promise<ListQuestionnairyConfigDto> => {
    const response = await callForApiClient.jsonService.get(
      "/questionConfig/select"
    );
    return response.data;
  };

export const createQuestionConfig = async (
  config: CreateQuestionnairyConfigDTO
): Promise<QuestionnairyConfigDTO> => {
  const response = await callForApiClient.jsonService.post(
    "/questionConfig",
    config
  );
  return response.data;
};
