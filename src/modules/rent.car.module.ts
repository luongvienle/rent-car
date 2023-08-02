import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentCarController } from 'src/api/v1/rent.car.controller';
import { BillingInfo } from 'src/entity/billing.info.entity';
import { Car } from 'src/entity/car.entity';
import { JwtToken } from 'src/entity/jwt.token.entity';
import { User } from 'src/entity/user.entity';
import { RentCarRepository } from 'src/repositories/rent.car.repository';
import { EmailService } from 'src/services/mail/email.service';
import { RentCarService } from 'src/services/rent.car.service';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Car, BillingInfo, JwtToken, User])],
  controllers: [RentCarController],
  providers: [RentCarRepository, RentCarService, EmailService, Logger],
})
export class RentModule {}
