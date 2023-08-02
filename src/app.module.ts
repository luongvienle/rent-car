import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseInterceptor } from './interceptor/transform.interceptor';
import { RequestLoggingMiddleware } from './middleware/LoggerMiddleware';
import { BillingInfo } from './models/BillingInfo';
import { Car } from './models/Car';
import { User } from './models/User';
import { RentModule } from './modules/RentModule';
import { UserModule } from './modules/UserModule';
import { ConfigModule } from '@nestjs/config';
import { JwtToken } from './models/JwtToken';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    RentModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Car, BillingInfo, JwtToken],
      synchronize: true,
      // migrations: ['dist/src/db/migrations/*.ts'],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
