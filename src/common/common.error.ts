import { HttpException, HttpStatus } from '@nestjs/common';

export class CommonError extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }
}

export const ErrorTitle = {
  INTERNAL_SERVER_ERROR: 'Internal server error.',
  NOT_FOUND: 'Resource not found.',
  CAR_RENTED_NOT_FOUND: 'GIVEBACK ERROR',
  UNAUTHORIZED: 'ADMIN ACCESS ERROR',
  CAR_RENTED: 'RENTED ERROR',
  CAR_NOT_AVAILABLE: 'CAR NOT AVAILABLE ERROR',
  CAR_NOT_FOUND: 'CAR NOT FOUND ERROR',
  ORDER_NOT_FOUND: 'ORDER NOT FOUND ERROR',
  NO_ORDER: 'NO ORDER ERROR',
  USER_EXIST: 'USER EXIST ERROR',
  USER_NOT_CONFIRM: 'EMAIL CONFIRM ERROR',
  USER_WRONG: 'USER WRONG ERROR',
  USER_WRONG_PASS: 'USER WRONG PASSWORD ERROR',
};

export const ErrorCode = {
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  NOT_FOUND: 'Resource not found.',
  CAR_RENTED_NOT_FOUND: 'CA-0001',
  UNAUTHORIZED: 'US-0001',
  CAR_RENTED: 'CA-0002',
  CAR_NOT_AVAILABLE: 'CA-0003',
  CAR_NOT_FOUND: 'CA-0004',
  ORDER_NOT_FOUND: 'OR-0001',
  NO_ORDER: 'OC-0002',
  USER_EXIST: 'US-0002',
  USER_NOT_CONFIRM: 'US-0003',
  USER_WRONG: 'US-0004',
  USER_WRONG_PASS: 'US-0005',
};

export const ErrorMessage = {
  INTERNAL_SERVER_ERROR: 'INTERNAL SERVER ERROR',
  CAR_RENTED_NOT_FOUND: 'Car Not Found',
  NOT_FOUND: 'NOT FOUND',
  UNAUTHORIZED: 'Admin only to access',
  CAR_RENTED: 'You rented another car',
  CAR_NOT_AVAILABLE: 'Car is not available to rent',
  CAR_NOT_FOUND: 'Car not found the system',
  ORDER_NOT_FOUND: 'Order not found on the system',
  NO_ORDER: 'Order havent created yet!',
  USER_EXIST: 'The email was registed!',
  USER_NOT_CONFIRM: 'The email was not confirmed!',
  USER_WRONG: 'The email was not registed yet!',
  USER_WRONG_PASS: 'The password was wrong!',
};
