import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CarDto } from 'src/dtos/car.dto';
import { TokenExistsGuard } from 'src/guard/token-exists.guard';
import { Car } from 'src/entity/car.entity';
import { JwtAuthGuard } from 'src/shared/JwtAuthGuard';
import { RoleAmindGuard } from 'src/guard/role.guard';
import { Pagination } from '../../utils/interfaces';
import { CarService } from 'src/services/car.service';

@Controller('car')
@ApiTags('Car')
export class CarController {
  constructor(private readonly service: CarService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(TokenExistsGuard)
  @Get('all')
  @ApiOperation({
    summary: 'List all cars',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
  })
  @ApiBearerAuth()
  async listAll(
    @Query('page') page: number,
    @Query('offset') offset: number,
  ): Promise<Pagination<CarDto[]>> {
    return this.service.getAllCars({ page, offset });
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TokenExistsGuard)
  @Get('car-detail/:id')
  @ApiOperation({
    summary: 'Car detail information',
  })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  async carDetail(@Param('id') id): Promise<Car> {
    return this.service.getCarDetail(id);
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
}
