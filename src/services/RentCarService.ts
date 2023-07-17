import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarDto } from 'src/dtos/CarDto';
import { RentCarDto } from 'src/dtos/RentCarDto';
import { BillingInfo } from 'src/models/BillingInfo';
import { Car } from 'src/models/Car';
import { RentCarRepository } from 'src/repositories/RentCarRepository';
import { decodeAuth } from 'src/utils/DecodeAuth';
import { Repository } from 'typeorm';
import { EmailService } from './mail/EmailService';
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
  ) {}

  async getAllCars(): Promise<Car[]> {
    const result = await this.carRepository.find();
    return result;
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
    const user = decodeAuth(auth);
    // const rentedCar = await this.repository.checkIfUserRented(user);
    const rentedCar = await this.carRepository.findOne({
      where: {
        rentBy: user,
      },
    });

    if (rentedCar) {
      throw new BadRequestException('You rented another car');
    }

    const {
      name,
      phone,
      address,
      city,
      subTotal,
      saleId,
      tax,
      paymentId,
      pickUpLocation,
      dropOffLocation,
      pickUpDate,
      dropOffDate,
    } = rentCarDto;
    const billingList = await this.repository.getListBilling();
    const data: BillingInfo = {
      id: !billingList ? 1 : billingList.length + 1,
      name,
      phone,
      address,
      city,
      subTotal,
      saleId,
      tax,
      paymentId,
      pickUpLocation,
      dropOffLocation,
      pickUpDate,
      dropOffDate,
    };
    // const existenCar = await this.repository.getCarByCode(
    //   rentCarDto.registerCode,
    // );

    const existenCar = await this.carRepository.findOne({
      where: {
        registerCode: rentCarDto.registerCode,
      },
    });
    if (!existenCar) {
      throw new BadRequestException('No car found');
    }

    if (!existenCar.available) {
      throw new BadRequestException('This car was not available');
    }

    try {
      existenCar.available = false;
      existenCar.rentBy = user;

      // Save the bill
      // await this.repository.createBillingRentCar(data);
      await this.billingRepository.save(data);

      // Save the rented car
      // await this.repository.rentOrGiveBackCar(existenCar);
      await this.carRepository.save(existenCar);
      await this.emailService.sendBillingEmail(
        user,
        RentCarDto.plainToClass(rentCarDto),
      );
      this.loggerSevice.log(data);
    } catch (err) {
      throw new BadRequestException(err);
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

    try {
      rentedCar.available = true;
      rentedCar.rentBy = null;
      await this.carRepository.save(rentedCar);
      // await this.repository.rentOrGiveBackCar(rentedCar);
    } catch (err) {
      throw new BadRequestException(err);
    }
    return 'Give back the car successfully!';
  }

  async getRentDetail(rentId: number): Promise<BillingInfo> {
    const billing = await this.repository.getRentedDetail(rentId);
    this.loggerSevice.debug(`rent detail id: ${rentId}`);
    if (!billing) {
      throw new BadRequestException('Order not found');
    } else {
      return billing;
    }
  }

  async getCarDetail(registerCode: number): Promise<Car> {
    // const car = await this.repository.getCarDetail(id);
    const car = await this.carRepository.findOne({
      where: {
        registerCode: registerCode,
      },
    });
    this.loggerSevice.debug(`car detail id: ${registerCode}`);
    if (!car) {
      throw new BadRequestException('Car not found');
    } else {
      return car;
    }
  }

  async createCar(payload: CarDto): Promise<CarDto> {
    const {
      name,
      type,
      steeringId,
      capacity,
      rentPrice,
      gasoline,
      description,
    } = payload;
    payload.createdDate = new Date();
    payload.updatedDate = new Date();
    const carList = await this.carRepository.find();
    const data: Car = {
      name,
      available: true,
      type,
      steeringId,
      capacity,
      rentPrice,
      gasoline,
      description,
      registerCode: !carList ? 1 : carList.length + 1,
      rentBy: null,
    };
    // await this.repository.createCar(data);
    await this.carRepository.save(data);
    return CarDto.plainToClass(payload);
  }
}
