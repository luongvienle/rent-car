import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class ConfirmDto {
  @IsString()
  @IsNotEmpty({
    message: () => 'Email property is mandatory',
  })
  @ApiProperty()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  @IsNotEmpty({
    message: () => 'Code property is mandatory',
  })
  @ApiProperty()
  code: string;
}
