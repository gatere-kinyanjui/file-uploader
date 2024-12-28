export interface IImageUpload {
  name: string;
  size: number;
  type: string;
  extension: string;
  content: ArrayBuffer;
}

export interface IUploadedFile {
  path: string;
}

export interface IFileUpload {
  upload: (files: File[]) => Promise<IUploadedFile[]>;
}

export interface IFileUploader {
  upload: (
    files: File | File[]
  ) => Promise<IUploadedFile | IUploadedFile[] | undefined>;
}

export interface TopLevel {
  name: string;
  data: Data;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
}

export interface Data {
  type: string;
  data: any[];
}
