import { HttpException, HttpStatus } from '@nestjs/common';

export function customResponse(
  statusCode: number,
  message: string,
  data?: any,
): any {
  return {
    statusCode,
    message,
    data: data || null,
  };
}

export function customException(
  statusCode: number,
  message: string,
  data?: any,
): never {
  throw new HttpException(
    {
      statusCode,
      message,
      data: data || null,
    },
    statusCode,
  );
}
