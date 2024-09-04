export interface PreSignedUrl {
  url: string;
  key: string;
}

export interface FileEntity {
  id: string;
  url: string;
  filename: string;
  size?: number;
  mimeType?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFile {
  url: string;
  filename: string;
  size?: number;
  mimeType?: string;
  description?: string;
}

export interface UpdateFile {
  url?: string;
  filename?: string;
  size?: number;
  mimeType?: string;
  description?: string;
}

export interface ListFiles {
  data: File[];
  total: number;
}
