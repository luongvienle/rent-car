import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarDto } from 'src/dtos/car.dto';
import { RentCarDto } from 'src/dtos/rent.car.dto';
import { BillingInfo } from 'src/entity/billing.info.entity';
import { Car } from 'src/entity/car.entity';
import { RentCarRepository } from 'src/repositories/rent.car.repository';
import { decodeAuth } from 'src/utils/DecodeAuth';
import { DataSource, Repository } from 'typeorm';
import { EmailService } from './mail/email.service';
@Injectable()
export class RentCarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,

    @InjectRepository(BillingInfo)
    private readonly billingRepository: Repository<BillingInfo>,

    private readonly repository: RentCarRepository,
    private readonly emailService: EmailService,
    private readonly loggerSevice: Logger,
    private dataSource: DataSource,
  ) {}

  async getAllCars(): Promise<CarDto[]> {
    const result = await this.carRepository.find();
    return result.map((entity) => {
      return CarDto.plainToClass(entity);
    });
  }

  async getAvailableCars(): Promise<Car[]> {
    const result = await this.carRepository.find({
      where: {
        available: true,
      },
    });
    return result;
  }

  async rentCar(rentCarDto: RentCarDto, auth: string): Promise<String> {
    const existenCar = await this.carRepository.findOne({
      where: {
        id: rentCarDto.id,
      },
    });
    if (!existenCar) {
      throw new BadRequestException('No car found');
    }

    if (!existenCar.available) {
      throw new BadRequestException('This car was not available');
    }
    const email = decodeAuth(auth);
    rentCarDto.email = email;
    const rentedCar = await this.carRepository.findOne({
      where: {
        rentBy: email,
      },
    });

    if (rentedCar) {
      throw new BadRequestException('You rented another car');
    }

    existenCar.available = false;
    existenCar.rentBy = email;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Perform your transactional operations
      await this.billingRepository.save(rentCarDto);

      // Save the rented car
      // await this.repository.rentOrGiveBackCar(existenCar);
      await this.carRepository.save(existenCar);
      await this.emailService.sendBillingEmail(
        email,
        RentCarDto.plainToClass(rentCarDto),
      );
      this.loggerSevice.log(rentCarDto);
      await queryRunner.commitTransaction();
    } catch (err) {
      // Rollback the transaction if an error occurs
      await queryRunner.rollbackTransaction();
      throw new Error(err.message);
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
    return 'Rent car successfully!';
  }

  async giveBackCar(auth: string): Promise<String> {
    const email = decodeAuth(auth);
    const rentedCar = await this.carRepository.findOne({
      where: {
        rentBy: email,
      },
    });
    // await this.repository.checkIfUserRented(email);
    if (!rentedCar) {
      throw new BadRequestException('You dont have a car rented');
    }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Perform your transactional operations
      rentedCar.available = true;
      rentedCar.rentBy = null;
      await this.carRepository.save(rentedCar);
      await queryRunner.commitTransaction();
    } catch (err) {
      // Rollback the transaction if an error occurs
      await queryRunner.rollbackTransaction();
      throw new Error(err.message);
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
    return 'Give back the car successfully!';
  }

  async getRentDetail(rentId: number): Promise<BillingInfo> {
    const billing = await this.billingRepository.findOne({
      where: {
        id: rentId,
      },
    });
    this.loggerSevice.debug(`rent detail id: ${rentId}`);
    if (!billing) {
      throw new BadRequestException('Order not found');
    } else {
      return billing;
    }
  }

  async getUserRentDetail(auth: string): Promise<BillingInfo[]> {
    const email = decodeAuth(auth);
    const billing = await this.billingRepository.find({
      where: {
        email: email,
      },
    });
    if (!billing) {
      throw new BadRequestException('Not rent yet!');
    } else {
      return billing;
    }
  }

  async getCarDetail(id: number): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: {
        id: id,
      },
    });
    this.loggerSevice.debug(`car detail id: ${id}`);
    if (!car) {
      throw new BadRequestException('Car not found');
    } else {
      return car;
    }
  }

  async createCar(payload: CarDto): Promise<CarDto> {
    payload.createdDate = new Date();
    payload.updatedDate = new Date();
    payload.available = true;
    payload.images = [];
    // await this.repository.createCar(data);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Perform your transactional operations
      await this.carRepository.save(payload);
      await queryRunner.commitTransaction();
    } catch (err) {
      // Rollback the transaction if an error occurs
      await queryRunner.rollbackTransaction();
      throw new Error(err.message);
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
    return CarDto.plainToClass(payload);
  }
}
