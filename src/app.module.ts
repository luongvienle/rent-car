import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomExceptionFilter } from './fiter/CustomExceptionFilter';
import { ResponseInterceptor } from './interceptor/transform.interceptor';
import { RequestLoggingMiddleware } from './middleware/LoggerMiddleware';
import { BillingInfo } from './models/BillingInfo';
import { Car } from './models/Car';
import { User } from './models/User';
import { RentModule } from './modules/RentModule';
import { UserModule } from './modules/UserModule';

@Module({
  imports: [
    UserModule,
    RentModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root1234',
      database: 'rent_car',
      entities: [User, Car, BillingInfo],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: CustomExceptionFilter,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
