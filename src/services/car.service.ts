import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarDto } from 'src/dtos/car.dto';
import { Car, PaginationDto } from 'src/entity/car.entity';
import { DataSource, Repository } from 'typeorm';
import { Pagination } from '../utils/interfaces';
import { CommonError, ErrorMessage } from 'src/common/common.error';
@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    private readonly loggerSevice: Logger,
    private dataSource: DataSource,
  ) {}

  async getAllCars({
    page,
    offset,
  }: PaginationDto): Promise<Pagination<CarDto[]>> {
    this.loggerSevice.log(
      'Get list car with page: ' + page + ' and offset: ' + offset,
    );
    const [result, total] = await this.carRepository.findAndCount({
      take: offset,
      skip: offset * (page - 1),
    });

    return {
      total: Math.ceil(total / offset) - 1,
      page: +page,
      data: result.map((entity) => {
        return CarDto.plainToClass(entity);
      }),
    };
  }

  async getAvailableCars(): Promise<Car[]> {
    const result = await this.carRepository.find({
      where: {
        available: true,
      },
    });
    return result;
  }

  async getCarDetail(id: number): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: {
        id: id,
      },
    });
    this.loggerSevice.log('Get car detail with id: ' + id);
    if (!car) {
      throw new CommonError(ErrorMessage.CAR_NOT_FOUND, HttpStatus.BAD_REQUEST);
    } else {
      return car;
    }
  }

  async createCar(payload: CarDto): Promise<CarDto> {
    this.loggerSevice.log('Admin create the car info: ' + payload);
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
