import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { promises as fs } from 'fs';
import { Reflector } from '@nestjs/core';
import { CloudinaryService } from 'src/utils/cloundinary/cloudinary.service';

export interface UploadImageInterceptorOptions {
  isArray: boolean;
  service: any;
  fieldName?: string; // optional field name for images in request body
}

@Injectable()
export class UploadImageInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    @Inject(CloudinaryService)
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const options = this.reflector.get<UploadImageInterceptorOptions>(
      'uploadImageOptions',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const fieldName = options?.fieldName || 'images';

    let files = request.files as Express.Multer.File[] | Express.Multer.File;

    if (options?.isArray && !Array.isArray(files)) {
      files = [files];
    } else if (!options?.isArray && Array.isArray(files)) {
      files = files[0];
    }

    if (request.method === 'POST') {
      if (
        !files ||
        (options?.isArray && Array.isArray(files) && files.length === 0) ||
        (!options?.isArray && !files)
      ) {
        throw new BadRequestException('Ảnh không được để trống');
      }

      if (options?.isArray) {
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
      const existingItem = await options.service.findOne(request.params.id);

      if (!existingItem) {
        throw new BadRequestException('Item not found');
      }

      const imagesToKeep = request.body[fieldName] ?? null;
      let newImages = [];

      if (
        files &&
        (options?.isArray ? Array.isArray(files) && files.length > 0 : files)
      ) {
        const uploadPromises = options?.isArray
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

        newImages = uploadPromises.map((result) => ({
          url: result.secure_url,
          uri: result.public_id,
        }));
      }

      if (newImages.length > 0 && imagesToKeep !== null) {
        const imagesToDelete = existingItem[fieldName].filter(
          (img) => !imagesToKeep.includes(img.uri),
        );
        await Promise.all(
          imagesToDelete.map((img) =>
            this.cloudinaryService.deleteImage(img.uri),
          ),
        );

        request.body[fieldName] = [
          ...existingItem[fieldName].filter((img) =>
            imagesToKeep.includes(img.uri),
          ),
          ...newImages,
        ];
      } else if (imagesToKeep === null && newImages.length > 0) {
        request.body[fieldName] = [...existingItem[fieldName], ...newImages];
      } else if (
        Array.isArray(imagesToKeep) &&
        imagesToKeep.length === 0 &&
        newImages.length > 0
      ) {
        await Promise.all(
          existingItem[fieldName].map((img) =>
            this.cloudinaryService.deleteImage(img.uri),
          ),
        );
        request.body[fieldName] = newImages;
      } else {
        request.body[fieldName] = existingItem[fieldName];
      }
    }

    (Array.isArray(files) ? files : [files]).forEach(async (file) => {
      await deleteLocalFile(file.path);
    });

    return next.handle();
  }
}

async function deleteLocalFile(filePath: string): Promise<void> {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error(`Error deleting file: ${error.message}`);
  }
}
