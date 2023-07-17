import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from './BaseDto';

export class CarDto extends BaseDto {
  @IsString()
  @IsNotEmpty({
    message: () => 'Name property is mandatory',
  })
  @ApiProperty()
  @Expose()
  name: string;

  @IsString()
  @Expose()
  @IsNotEmpty({
    message: () => 'Type property is mandatory',
  })
  @ApiProperty()
  type: string;

  @IsNumber()
  @Expose()
  @IsNotEmpty({
    message: () => 'steering property is mandatory',
  })
  @ApiProperty()
  steeringId: number;

  @IsNumber()
  @Expose()
  @IsNotEmpty({
    message: () => 'capacity property is mandatory',
  })
  @ApiProperty()
  capacity: number;

  @IsNumber()
  @Expose()
  @IsNotEmpty({
    message: () => 'rentPrice property is mandatory',
  })
  @ApiProperty()
  rentPrice: number;

  @IsNumber()
  @Expose()
  @IsNotEmpty({
    message: () => 'gasoline property is mandatory',
  })
  @ApiProperty()
  gasoline: number;

  @IsString()
  @Expose()
  @ApiProperty()
  description: string | null;
}
