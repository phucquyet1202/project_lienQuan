import { SetMetadata } from '@nestjs/common';
import { UploadImageInterceptorOptions } from 'src/interceptor/convertData';

export const UploadImageOptions = (options: UploadImageInterceptorOptions) =>
  SetMetadata('uploadImageOptions', options);
