import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarController } from 'src/api/v1/car.controller';
import { BillingInfo } from 'src/entity/billing.info.entity';
import { Car } from 'src/entity/car.entity';
import { JwtToken } from 'src/entity/jwt.token.entity';
import { User } from 'src/entity/user.entity';
import { CarService } from 'src/services/car.service';

@Module({
  imports: [TypeOrmModule.forFeature([Car, BillingInfo, JwtToken, User])],
  controllers: [CarController],
  providers: [CarService, Logger],
})
export class CarModule {}
