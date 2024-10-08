import { UploadFile } from "antd";
import { FileEntity } from "./file";

export interface CreatePageConfigDTO {
  whatsApp: string;
  instagram: string;
  facebook: string;
  donationLink: string;
  backgroundImage: string;
  aboutMe: string;
  avatarImage: string;
  colorInfo: string;
  enterpriseId: string;
}

export interface CreatePageConfigFormDTO {
  whatsApp: string;
  instagram: string;
  facebook: string;
  donationLink: string;
  backgroundImage: any;
  aboutMe: string;
  avatarImage: any;
  colorInfo: string;
  enterpriseId: string;
}

export interface UpdatePageConfigDTO {
  whatsApp?: string;
  instagram?: string;
  facebook?: string;
  donationLink?: string;
  backgroundImage?: string;
  aboutMe?: string;
  avatarImage?: string;
  colorInfo?: string;
}

export interface PageConfigDTO {
  id: string;
  whatsApp: string;
  instagram: string;
  facebook: string;
  donationLink: string;
  backgroundImage: FileEntity;
  aboutMe: string;
  avatarImage: FileEntity;
  colorInfo: string;
  createdAt: Date;
  updatedAt: Date;
  enterpriseId: string;
}
