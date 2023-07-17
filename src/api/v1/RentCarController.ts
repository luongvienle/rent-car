import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Headers,
  UseGuards,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CarDto } from 'src/dtos/CarDto';
import { RentCarDto } from 'src/dtos/RentCarDto';
import { BillingInfo } from 'src/models/BillingInfo';
import { Car } from 'src/models/Car';
import { EmailService } from 'src/services/mail/EmailService';
import { RentCarService } from 'src/services/RentCarService';
import { JwtAuthGuard } from 'src/shared/JwtAuthGuard';

@Controller('rent-car')
@ApiTags('Rent Car')
export class RentCarController {
  constructor(
    private readonly service: RentCarService,
    private readonly emailService: EmailService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiOperation({
    summary: 'List all cars',
  })
  @ApiBearerAuth()
  async listAll(): Promise<Car[]> {
    return this.service.getAllCars();
  }

  @UseGuards(JwtAuthGuard)
  @Get('rent-detail/:id')
  @ApiOperation({
    summary: 'Rent car detail',
  })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  async rentDetail(@Param('id') id): Promise<BillingInfo> {
    return this.service.getRentDetail(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('car-detail/:id')
  @ApiOperation({
    summary: 'Car detail information',
  })
  @ApiParam({ name: 'registerCode', required: true })
  @ApiBearerAuth()
  async carDetail(@Param('registerCode') registerCode): Promise<Car> {
    return this.service.getCarDetail(registerCode);
  }

  @UseGuards(JwtAuthGuard)
  @Post('register-new-car')
  @ApiOperation({
    summary: 'Register a car',
  })
  @ApiBearerAuth()
  async createCar(@Body() payload: CarDto): Promise<CarDto> {
    return this.service.createCar(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('rent-car')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Rent a car' })
  async rentCar(
    @Body() payload: RentCarDto,
    @Headers() headers,
  ): Promise<String> {
    return this.service.rentCar(payload, headers.authorization);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('give-back')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Give back your rented car' })
  async giveBackCar(@Headers() headers): Promise<String> {
    return this.service.giveBackCar(headers.authorization);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('available')
  @ApiOperation({
    summary: 'Get list available cars',
  })
  async listAvailable(): Promise<Car[]> {
    return this.service.getAvailableCars();
  }
}
