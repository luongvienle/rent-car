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
import { CarDto } from 'src/dtos/car.dto';
import { RentCarDto } from 'src/dtos/rent.car.dto';
import { TokenExistsGuard } from 'src/guard/token-exists.guard';
import { BillingInfo } from 'src/entity/billing.info.entity';
import { Car } from 'src/entity/car.entity';
import { RentCarService } from 'src/services/rent.car.service';
import { JwtAuthGuard } from 'src/shared/JwtAuthGuard';
import { RoleAmindGuard } from 'src/guard/role.guard';

@Controller('rent-car')
@ApiTags('Rent Car')
export class RentCarController {
  constructor(private readonly service: RentCarService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(TokenExistsGuard)
  @Get('all')
  @ApiOperation({
    summary: 'List all cars',
  })
  @ApiBearerAuth()
  async listAll(): Promise<CarDto[]> {
    return this.service.getAllCars();
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TokenExistsGuard)
  @UseGuards(RoleAmindGuard)
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
  @UseGuards(TokenExistsGuard)
  @Get('rent-detail/')
  @ApiOperation({
    summary: 'Rent car detail',
  })
  @ApiBearerAuth()
  async rentUserDetail(@Headers() headers): Promise<BillingInfo[]> {
    return this.service.getUserRentDetail(headers.authorization);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TokenExistsGuard)
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
  @UseGuards(TokenExistsGuard)
  @UseGuards(RoleAmindGuard)
  @Post('register-new-car')
  @ApiOperation({
    summary: 'Register a car',
  })
  @ApiBearerAuth()
  async createCar(@Body() payload: CarDto): Promise<CarDto> {
    return this.service.createCar(payload);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TokenExistsGuard)
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
  @UseGuards(TokenExistsGuard)
  @Patch('give-back')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Give back your rented car' })
  async giveBackCar(@Headers() headers): Promise<String> {
    return this.service.giveBackCar(headers.authorization);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TokenExistsGuard)
  @ApiBearerAuth()
  @Get('available')
  @ApiOperation({
    summary: 'Get list available cars',
  })
  async listAvailable(): Promise<Car[]> {
    return this.service.getAvailableCars();
  }
}
