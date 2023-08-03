import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsDate,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BaseDto } from './base.dto';

export class RentCarDto extends BaseDto {
  @IsNotEmpty({
    message: () => 'Car register code is mandatory',
  })
  @IsNumber()
  @ApiProperty()
  @Expose()
  id: number;

  @IsNotEmpty({
    message: () => 'Billing name is mandatory',
  })
  @IsString()
  @ApiProperty()
  @Expose()
  name: string;

  @Expose()
  email: string;

  @IsNotEmpty({
    message: () => 'Phone number is mandatory',
  })
  @ApiProperty()
  @Expose()
  phone: string;

  @IsNotEmpty({
    message: () => 'Address is mandatory',
  })
  @IsString()
  @ApiProperty()
  @Expose()
  address: string;

  @IsString()
  @ApiProperty()
  @Expose()
  city: string;

  @IsNotEmpty({
    message: () => 'Pick up location is mandatory',
  })
  @IsString()
  @ApiProperty()
  @Expose()
  pickUpLocation: string;

  @IsNotEmpty({
    message: () => 'Drop off location is mandatory',
  })
  @IsString()
  @ApiProperty()
  @Expose()
  dropOffLocation: string;

  @IsNotEmpty({
    message: () => 'Pick up date is mandatory',
  })
  @IsDate()
  @ApiProperty()
  @Type(() => Date)
  @Expose()
  pickUpDate: Date;

  @IsNotEmpty({
    message: () => 'Drop off date is mandatory',
  })
  @IsDate()
  @ApiProperty()
  @Type(() => Date)
  @Expose()
  dropOffDate: Date;

  @IsNotEmpty({
    message: () => 'Payment id is mandatory',
  })
  @IsNumber()
  @ApiProperty()
  @Expose()
  paymentId: number;

  @IsNumber()
  @ApiProperty()
  @Expose()
  saleId: number | null;

  @IsNotEmpty({
    message: () => 'Tax is mandatory',
  })
  @IsNumber()
  @ApiProperty()
  @Expose()
  tax: number;

  @IsNotEmpty({
    message: () => 'SubTotal is mandatory',
  })
  @IsNumber()
  @ApiProperty()
  @Expose()
  subTotal: number;
}
