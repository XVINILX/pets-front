import { RcFile } from "antd/es/upload";
import { PreSignedUrl } from "../domain/entities/file";
import { CreateFile, FileEntity } from "../domain/entities/file";
import { callForApiClient } from "./apiClient";

export const getPreSignedUrl = async (): Promise<PreSignedUrl> => {
  const response = await callForApiClient.jsonService.get<PreSignedUrl>(
    "/files/presigned-url"
  );
  return response.data;
};

export const uploadFile = async (file: RcFile): Promise<FileEntity> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await callForApiClient.formDataService.post<FileEntity>(
    "/files/upload",
    formData
  );
  return response.data;
};

export const createFileMetadata = async (
  file: CreateFile
): Promise<FileEntity> => {
  const response = await callForApiClient.jsonService.post<FileEntity>(
    "/files",
    file
  );
  return response.data;
};

export const getFileById = async (id: string): Promise<FileEntity> => {
  const response = await callForApiClient.jsonService.get<FileEntity>(
    `/files/${id}`
  );
  return response.data;
};

export const updateFileMetadata = async (
  file: Partial<FileEntity>
): Promise<FileEntity> => {
  const response = await callForApiClient.jsonService.put<FileEntity>(
    `/files/${file.id}`,
    file
  );
  return response.data;
};

export const deleteFile = async (id: string): Promise<FileEntity> => {
  const response = await callForApiClient.jsonService.delete<FileEntity>(
    `/files/${id}`
  );
  return response.data;
};
