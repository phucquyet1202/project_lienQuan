// import { SetMetadata } from '@nestjs/common';

// export const UploadImageOptions = (options: {
//   isArray: boolean;
//   serviceName: any;
//   fieldName: string;
// }) =>
//   SetMetadata('uploadImageOptions', {
//     isArray: options.isArray,
//     serviceName: options.serviceName, // ✅ Truyền class thay vì lấy .name
//     fieldName: options.fieldName,
//   });
import { SetMetadata } from '@nestjs/common';

export interface UploadImageOption {
  isArray: boolean;
  serviceName: any;
  fieldName: string;
}

export const UploadImageOptions = (options: UploadImageOption[]) =>
  SetMetadata('uploadImageOptions', options);
