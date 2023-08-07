import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MaskdataService } from 'src/services/maskdata/maskdata.service';

@Injectable()
export class MaskdataInterceptor implements NestInterceptor {
  constructor(readonly maskDataService: MaskdataService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data) {
          return this.maskData(data);
        }
      }),
    );
  }

  private maskData(data: any): any {
    if (typeof data === 'string') {
      return this.maskDataService.mask(data);
    }

    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        data[i] = this.maskDataService.mask(data[i]);
      }
    }

    return data;
  }
}
