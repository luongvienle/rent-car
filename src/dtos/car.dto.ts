import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CarImage } from 'src/entity/car.image.entity';
import { BaseDto } from './base.dto';

export class CarDto extends BaseDto {
  @IsString()
  @IsNotEmpty({
    message: () => 'Name property is mandatory',
  })
  @ApiProperty()
  @Expose()
  name: string;

  @IsNumber()
  @Expose()
  @ApiProperty()
  typeId: number;

  available: boolean;

  @IsNumber()
  @Expose()
  @ApiProperty()
  steeringId: number;

  @IsNumber()
  @Expose()
  @ApiProperty()
  capacityId: number;

  @IsNumber()
  @Expose()
  @ApiProperty()
  price: number;

  @IsNumber()
  @Expose()
  @ApiProperty()
  gasoline: number;

  @ApiProperty()
  images: CarImage[] | null;

  @IsString()
  @Expose()
  @ApiProperty()
  description: string | null;
}
