import { HttpException, HttpStatus } from '@nestjs/common';

export class CommonError extends HttpException {
  constructor(message: string, status: number, title: string) {
    super(message, status);
    title = title;
  }
}

export const TitleCode = {
  INTERNAL_SERVER_ERROR: 'INTERNAL SERVER ERROR',
  NOT_FOUND: 'NOT FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
};

export const ErrorCode = {
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'US-0001',
};

export const ErrorMessage = {
  INTERNAL_SERVER_ERROR: 'Internal server error.',
  NOT_FOUND: 'Resource not found.',
  UNAUTHORIZED: 'Unauthorized to Access',
};
