import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './BaseDto';
import { Expose } from 'class-transformer';
export class UserDto extends BaseDto {
  @IsString()
  @Expose()
  @IsNotEmpty({
    message: () => 'Name property is mandatory',
  })
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty({
    message: () => 'password property is mandatory',
  })
  @ApiProperty()
  password: string;

  @IsString()
  @Expose()
  @IsNotEmpty({
    message: () => 'email property is mandatory',
  })
  @ApiProperty()
  @IsEmail()
  email: string;

  code: string | null;
}
