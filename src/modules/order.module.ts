import { BullModule } from '@nestjs/bull';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarController } from 'src/api/v1/car.controller';
import { EmailConsumer } from 'src/consumer/email.consumer';
import { BillingInfo } from 'src/entity/billing.info.entity';
import { Car } from 'src/entity/car.entity';
import { JwtToken } from 'src/entity/jwt.token.entity';
import { User } from 'src/entity/user.entity';
import { EmailService } from 'src/services/mail/email.service';
import { OrderController } from 'src/api/v1/order.controller';
import { OrderService } from 'src/services/order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, BillingInfo, JwtToken, User]),
    BullModule.registerQueue({
      name: 'sendmail',
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, EmailService, Logger, EmailConsumer],
})
export class OrderModule {}
