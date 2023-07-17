import { Expose, plainToClass } from 'class-transformer';

export class BaseDto {
  @Expose()
  id: number;

  @Expose()
  createdDate: Date;

  @Expose()
  updatedDate: Date;

  static plainToClass<T>(this: new (...args: any[]) => T, obj: T): T {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}
