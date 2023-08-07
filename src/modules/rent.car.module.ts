import { BullModule } from '@nestjs/bull';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentCarController } from 'src/api/v1/rent.car.controller';
import { EmailConsumer } from 'src/consumer/email.consumer';
import { BillingInfo } from 'src/entity/billing.info.entity';
import { Car } from 'src/entity/car.entity';
import { JwtToken } from 'src/entity/jwt.token.entity';
import { User } from 'src/entity/user.entity';
import { EmailService } from 'src/services/mail/email.service';
import { RentCarService } from 'src/services/rent.car.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, BillingInfo, JwtToken, User]),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'sendmail',
    }),
  ],
  controllers: [RentCarController],
  providers: [RentCarService, EmailService, Logger, EmailConsumer],
})
export class RentModule {}
