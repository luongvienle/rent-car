import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentCarController } from 'src/api/v1/RentCarController';
import { BillingInfo } from 'src/models/BillingInfo';
import { Car } from 'src/models/Car';
import { RentCarRepository } from 'src/repositories/RentCarRepository';
import { EmailService } from 'src/services/mail/EmailService';
import { RentCarService } from 'src/services/RentCarService';

@Module({
  imports: [TypeOrmModule.forFeature([Car, BillingInfo])],
  controllers: [RentCarController],
  providers: [RentCarRepository, RentCarService, EmailService, Logger],
})
export class RentModule {}
