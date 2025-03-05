import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { promises as fs } from 'fs';
import { ModuleRef, Reflector } from '@nestjs/core';
import { CloudinaryService } from 'src/utils/cloundinary/cloudinary.service';

export interface UploadImageInterceptorOptions {
  isArray: boolean;
  serviceName: any;
  fieldName?: string; // optional field name for images in request body
}

@Injectable()
export class UploadImageInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    @Inject(CloudinaryService)
    private readonly cloudinaryService: CloudinaryService,
    @Inject(ModuleRef) private readonly moduleRef: ModuleRef,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const optionsArray = this.reflector.get<UploadImageInterceptorOptions[]>(
      'uploadImageOptions',
      context.getHandler(),
    );

    console.log('✅ Full optionsArray:', JSON.stringify(optionsArray, null, 2));
    console.log('✅ Số phần tử trong optionsArray:', optionsArray?.length || 0);

    if (!optionsArray || optionsArray.length === 0) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();

    for (const options of optionsArray) {
      console.log('🚀 Đang xử lý options:', options);

      let serviceInstance;
      try {
        serviceInstance = this.moduleRef.get(options.serviceName, {
          strict: false,
        });
        if (!serviceInstance || typeof serviceInstance.findOne !== 'function') {
          throw new InternalServerErrorException(
            `Service '${options.serviceName}' không hợp lệ`,
          );
        }
      } catch (err) {
        console.error('❌ Lỗi khi lấy service:', err);
        throw err;
      }

      const fieldName = options.fieldName || 'image';
      console.log({ request: request?.files });
      let files = request.files?.[options.fieldName] || request.files;
      console.log({ files });
      if (options.isArray) {
        files = Array.isArray(files) ? files : [files];
      } else {
        files = Array.isArray(files) ? files[0] : files;
      }

      console.log(`📸 Kiểm tra files cho ${fieldName}:`, files);

      if (request.method === 'POST') {
        if (
          !files ||
          (options.isArray && Array.isArray(files) && files.length === 0)
        ) {
          throw new BadRequestException(
            `Ảnh cho '${fieldName}' không được để trống`,
          );
        }

        if (options.isArray) {
          const uploadPromises = await Promise.all(
            (Array.isArray(files) ? files : [files]).map((file) =>
              this.cloudinaryService.uploadImage(file),
            ),
          );
          request.body[fieldName] = uploadPromises.map((result) => ({
            url: result.secure_url,
            uri: result.public_id,
          }));
        } else {
          const uploadResult = await this.cloudinaryService.uploadImage(
            files as Express.Multer.File,
          );
          request.body[fieldName] = {
            url: uploadResult.secure_url,
            uri: uploadResult.public_id,
          };
        }
      } else if (request.method === 'PATCH') {
        const existingItem = await serviceInstance.findOne(request.params.id);
        if (!existingItem) {
          throw new BadRequestException('Item not found');
        }

        const imagesToKeep = request.body[fieldName] ?? null;
        let newImages = [];

        if (
          files &&
          (options.isArray ? Array.isArray(files) && files.length > 0 : files)
        ) {
          const uploadResults = options.isArray
            ? await Promise.all(
                (Array.isArray(files) ? files : [files]).map((file) =>
                  this.cloudinaryService.uploadImage(file),
                ),
              )
            : [
                await this.cloudinaryService.uploadImage(
                  files as Express.Multer.File,
                ),
              ];

          newImages = uploadResults.map((result) => ({
            url: result.secure_url,
            uri: result.public_id,
          }));
        }

        if (options.isArray) {
          // Trường hợp lưu ảnh dưới dạng mảng
          if (newImages.length > 0 && imagesToKeep !== null) {
            const imagesToDelete = existingItem?.data[fieldName]?.filter(
              (img) => !imagesToKeep.includes(img.uri),
            );
            await Promise.all(
              imagesToDelete.map((img) =>
                this.cloudinaryService.deleteImage(img.uri),
              ),
            );

            request.body[fieldName] = [
              ...(existingItem?.data[fieldName]?.filter((img) =>
                imagesToKeep.includes(img.uri),
              ) || []),
              ...newImages,
            ];
          } else if (imagesToKeep === null && newImages.length > 0) {
            request.body[fieldName] = [
              ...(existingItem?.data[fieldName] || []),
              ...newImages,
            ];
          } else if (
            Array.isArray(imagesToKeep) &&
            imagesToKeep.length === 0 &&
            newImages.length > 0
          ) {
            await Promise.all(
              (existingItem?.data[fieldName] || []).map((img) =>
                this.cloudinaryService.deleteImage(img.uri),
              ),
            );
            request.body[fieldName] = newImages;
          } else {
            request.body[fieldName] = existingItem?.data[fieldName];
          }
        } else {
          // Trường hợp lưu ảnh dưới dạng object
          if (newImages.length > 0) {
            // Nếu có ảnh mới, cập nhật ảnh mới và xóa ảnh cũ nếu có
            if (existingItem?.data[fieldName]?.uri) {
              await this.cloudinaryService.deleteImage(
                existingItem?.data[fieldName].uri,
              );
            }
            request.body[fieldName] = newImages[0];
          } else if (imagesToKeep === null) {
            // Nếu imagesToKeep là null, xóa ảnh hiện tại
            if (existingItem?.data[fieldName]?.uri) {
              await this.cloudinaryService.deleteImage(
                existingItem?.data[fieldName].uri,
              );
            }
            request.body[fieldName] = null;
          } else {
            // Nếu không có ảnh mới và có imagesToKeep, giữ nguyên ảnh hiện tại
            request.body[fieldName] = existingItem?.data[fieldName];
          }
        }
      }

      console.log('🗑 Xóa file local...');
      await Promise.all(
        (Array.isArray(files) ? files : [files]).map(async (file) => {
          console.log('🔹 Đang xóa:', file?.path);
          if (file?.path) await deleteLocalFile(file.path);
        }),
      );
    }

    console.log('🎉 Xử lý xong tất cả options!');
    return next.handle();
  }
}

@Injectable()
export class FormDataToJsonInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    // console.log(request);
    if (request.body && typeof request.body === 'object') {
      for (const key in request.body) {
        if (typeof request.body[key] === 'string') {
          try {
            request.body[key] = JSON.parse(request.body[key]);
          } catch (e) {
            console.error(`Error parsing field ${key}: ${e.message}`);
          }
        }
      }
    }
    return next.handle().pipe(map((data) => data));
  }
}
async function deleteLocalFile(filePath: string): Promise<void> {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error(`Error deleting file: ${error.message}`);
  }
}
