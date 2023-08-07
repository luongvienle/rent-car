import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RentCarDto } from 'src/dtos/rent.car.dto';
import { BillingInfo } from 'src/entity/billing.info.entity';
import { Car } from 'src/entity/car.entity';
import { decodeAuth } from 'src/utils/DecodeAuth';
import { DataSource, Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CommonError, ErrorMessage } from 'src/common/common.error';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,

    @InjectRepository(BillingInfo)
    private readonly billingRepository: Repository<BillingInfo>,
    private readonly loggerSevice: Logger,
    @InjectQueue('sendmail')
    private sentMail: Queue,
    private dataSource: DataSource,
  ) {}

  async orderCar(rentCarDto: RentCarDto, auth: string): Promise<String> {
    const email = decodeAuth(auth);
    this.loggerSevice.debug(
      `Rent car request from ${email} with info car id: ${rentCarDto.id}`,
    );
    const existenCar = await this.carRepository.findOne({
      where: {
        id: rentCarDto.id,
      },
    });
    if (!existenCar) {
      throw new CommonError(ErrorMessage.CAR_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    if (!existenCar.available) {
      throw new CommonError(
        ErrorMessage.CAR_NOT_AVAILABLE,
        HttpStatus.BAD_REQUEST,
      );
    }
    rentCarDto.email = email;
    const rentedCar = await this.carRepository.findOne({
      where: {
        rentBy: email,
      },
    });

    if (rentedCar) {
      throw new CommonError(ErrorMessage.CAR_RENTED, HttpStatus.BAD_REQUEST);
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
      // this.loggerSevice.log(rentCarDto);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      // Rollback the transaction if an error occurs
      await queryRunner.rollbackTransaction();
      throw new Error(err.message);
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
    await this.sentMail.add(
      'order',
      {
        email: email,
        name: rentCarDto.name,
      },
      { removeOnComplete: true },
    );
    return 'Rent car successfully!';
  }

  async giveBackCar(auth: string): Promise<String> {
    const email = decodeAuth(auth);
    this.loggerSevice.debug(`Giveback the car by: ${email}`);
    const rentedCar = await this.carRepository.findOne({
      where: {
        rentBy: email,
      },
    });
    if (!rentedCar) {
      throw new CommonError(
        ErrorMessage.CAR_RENTED_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
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

  async getOrderDetail(rentId: number): Promise<BillingInfo> {
    this.loggerSevice.debug(`Admin get the rent detail by id: ${rentId}`);
    const billing = await this.billingRepository.findOne({
      where: {
        id: rentId,
      },
    });
    if (!billing) {
      throw new CommonError(
        ErrorMessage.ORDER_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return billing;
    }
  }

  async getUserOrderDetail(auth: string): Promise<BillingInfo[]> {
    const email = decodeAuth(auth);
    this.loggerSevice.debug(`Get the rent detail by : ${email}`);
    const billing = await this.billingRepository.find({
      where: {
        email: email,
      },
    });
    if (!billing) {
      throw new CommonError(
        ErrorMessage.ORDER_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return billing;
    }
  }
}
