import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CommonError,
  ErrorCode,
  ErrorMessage,
  ErrorTitle,
} from 'src/common/common.error';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    var status;
    var message;
    if (exception instanceof CommonError) {
      status = exception.getStatus();
      message = exception.message;

      var title = '';
      var errorCode = '';
      if (message == ErrorMessage.UNAUTHORIZED) {
        title = ErrorTitle.UNAUTHORIZED;
        errorCode = ErrorCode.UNAUTHORIZED;
      } else if (message == ErrorMessage.CAR_RENTED) {
        title = ErrorTitle.CAR_RENTED;
        errorCode = ErrorCode.CAR_RENTED;
      } else if (message == ErrorMessage.CAR_RENTED_NOT_FOUND) {
        title = ErrorTitle.CAR_RENTED_NOT_FOUND;
        errorCode = ErrorCode.CAR_RENTED_NOT_FOUND;
      } else if (message == ErrorMessage.CAR_NOT_AVAILABLE) {
        title = ErrorTitle.CAR_NOT_AVAILABLE;
        errorCode = ErrorCode.CAR_NOT_AVAILABLE;
      } else if (message == ErrorMessage.CAR_NOT_FOUND) {
        title = ErrorTitle.CAR_NOT_FOUND;
        errorCode = ErrorCode.CAR_NOT_FOUND;
      } else if (message == ErrorMessage.ORDER_NOT_FOUND) {
        title = ErrorTitle.ORDER_NOT_FOUND;
        errorCode = ErrorCode.ORDER_NOT_FOUND;
      } else if (message == ErrorMessage.NO_ORDER) {
        title = ErrorTitle.NO_ORDER;
        errorCode = ErrorCode.NO_ORDER;
      } else if (message == ErrorMessage.USER_EXIST) {
        title = ErrorTitle.USER_EXIST;
        errorCode = ErrorCode.USER_EXIST;
      } else if (message == ErrorMessage.USER_NOT_CONFIRM) {
        title = ErrorTitle.USER_NOT_CONFIRM;
        errorCode = ErrorCode.USER_NOT_CONFIRM;
      } else if (message == ErrorMessage.USER_WRONG) {
        title = ErrorTitle.USER_WRONG;
        errorCode = ErrorCode.USER_WRONG;
      } else if (message == ErrorMessage.USER_WRONG_PASS) {
        title = ErrorTitle.USER_WRONG_PASS;
        errorCode = ErrorCode.USER_WRONG_PASS;
      } else {
        title = 'INTERNAL SERVER ERROR';
        errorCode = 'US-0003';
      }
      response.status(status).json({
        error: {
          title: title,
          messages: message,
          error: {
            code: errorCode, // implement later
            field: '', // implement later
          },
        },
      });
    } else if (exception instanceof HttpException) {
      status = exception.getStatus(); // Lấy mã HTTP status code
      const message = exception.message;
      response.status(status).json({
        error: {
          title: title,
          messages: message,
          error: exception.getResponse(),
        },
      });
    } else {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
      response.status(status).json({
        error: {
          title: title,
          messages: message,
          error: {
            code: 'FO-0001', // implement later
            field: 'field', // implement later
          },
        },
      });
    }
  }
}
