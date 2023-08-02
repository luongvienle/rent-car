import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CommonError } from 'src/common/common.error';
import { json } from 'stream/consumers';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CommonError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    var title = '';
    if (status == HttpStatus.UNAUTHORIZED) {
      title = 'UNAUTHORIZED';
    } else if (status == HttpStatus.BAD_REQUEST) {
      title = 'BAD REQUEST';
    } else {
      title = 'INTERNAL SERVER ERROR';
    }

    response.status(status).json({
      error: {
        title: title,
        message: message,
        error: {
          code: 'FO-0001', // implement later
          field: 'field', // implement later
        },
      },
    });
  }
}
