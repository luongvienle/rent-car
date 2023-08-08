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
import { RentCarDto } from 'src/dtos/rent.car.dto';
import { TokenExistsGuard } from 'src/guard/token-exists.guard';
import { BillingInfo } from 'src/entity/billing.info.entity';
import { JwtAuthGuard } from 'src/shared/JwtAuthGuard';
import { RoleAmindGuard } from 'src/guard/role.guard';
import { OrderService } from 'src/services/order.service';
import { CarDto } from 'src/dtos/car.dto';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(TokenExistsGuard)
  @UseGuards(RoleAmindGuard)
  @Get('detail/:id')
  @ApiOperation({
    summary: 'Order car detail',
  })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  async rentDetail(@Param('id') id): Promise<BillingInfo> {
    return this.service.getOrderDetail(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TokenExistsGuard)
  @Get('history/')
  @ApiOperation({
    summary: 'Order car detail',
  })
  @ApiBearerAuth()
  async rentUserDetail(@Headers() headers): Promise<BillingInfo[]> {
    return this.service.getUserOrderDetail(headers.authorization);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TokenExistsGuard)
  @Post('order')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Rent a car' })
  async rentCar(
    @Body() payload: RentCarDto,
    @Headers() headers,
  ): Promise<RentCarDto> {
    return this.service.orderCar(payload, headers.authorization);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TokenExistsGuard)
  @Patch('give-back')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Give back your rented car' })
  async giveBackCar(@Headers() headers): Promise<String> {
    return this.service.giveBackCar(headers.authorization);
  }
}
