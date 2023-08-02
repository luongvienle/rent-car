import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseInterceptor } from './interceptor/transform.interceptor';
import { BillingInfo } from './entity/billing.info.entity';
import { Car } from './entity/car.entity';
import { User } from './entity/user.entity';
import { RentModule } from './modules/rent.car.module';
import { UserModule } from './modules/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtToken } from './entity/jwt.token.entity';
import { RequestLoggingMiddleware } from './middleware/logger.middleware';
import { Payment } from './entity/payment.entity';
import { Role } from './entity/role.entity';

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
      entities: ['dist/**/*.entity.js'],
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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
