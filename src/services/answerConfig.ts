import {
  AnswerConfigEntity,
  CreateAnswerConfigDTO,
} from "domain/entities/answerConfig";
import { callForApiClient } from "./apiClient";
import { CreateAnswerDTO } from "domain/entities/Answers";

export const createAnswer = async (
  answer: CreateAnswerDTO
): Promise<CreateAnswerDTO> => {
  const response = await callForApiClient.jsonService.post(
    "/answerConfig/answer",
    answer
  );
  return response.data;
};

export const createAnswerConfig = async (
  answerConfig: CreateAnswerConfigDTO
): Promise<AnswerConfigEntity> => {
  const response = await callForApiClient.jsonService.post(
    "/answerConfig",
    answerConfig
  );
  return response.data;
};

export const getAnswerConfigById = async (
  id: string
): Promise<AnswerConfigEntity> => {
  const response = await callForApiClient.jsonService.get(
    `/answerConfig/id=${id}`
  );
  return response.data;
};

export const deleteAnswerConfig = async (
  id: string
): Promise<AnswerConfigEntity> => {
  const response = await callForApiClient.jsonService.delete(
    `/answerConfig/${id}`
  );
  return response.data;
};
