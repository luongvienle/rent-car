// import { Request, Response, NextFunction } from 'express';

// export function logger(req: Request, res: Response, next: NextFunction) {
//   const { method, originalUrl, ip } = req;
//   console.log(`Request - Method: ${method}, URL: ${originalUrl}, IP: ${ip}`);
//   next();
// }

import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private logger = new Logger(RequestLoggingMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    this.logger.debug(
      `Request - Method: ${method}, URL: ${originalUrl}, IP: ${ip}`,
    );
    next();
  }
}
