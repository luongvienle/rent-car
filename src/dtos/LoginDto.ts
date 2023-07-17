import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from './BaseDto';

export class LoginDto extends BaseDto {
  @IsString()
  @IsEmail()
  @Expose()
  @IsNotEmpty({ message: () => 'Email property is mandatory!' })
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty({ message: () => 'Password property is mandatory!' })
  @ApiProperty()
  password: string;
}
