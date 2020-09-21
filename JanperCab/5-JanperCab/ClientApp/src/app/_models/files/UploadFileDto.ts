export abstract class UploadFileDto {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  file: File;
}
