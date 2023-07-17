import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from 'src/dtos/UserDto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/services/UserService';
import { LoginDto } from 'src/dtos/LoginDto';
import { LocalAuthGuard } from 'src/shared/LocalAuthGuard';
import { EmailService } from 'src/services/mail/EmailService';
import { ConfirmDto } from 'src/dtos/ConfirmDto';
@Controller('User')
@ApiTags('User')
export class UserController {
  constructor(private readonly service: UserService) {}
  @Post('create-auth')
  @ApiOperation({ summary: 'create an user to authentic' })
  async create(@Body() payload: UserDto): Promise<string> {
    return this.service.create(payload);
  }

  @Post('code')
  async confirmEmail(
    @Request() req: any,
    @Body() _confirm: ConfirmDto,
  ): Promise<Object> {
    return this.service.confirmEmail(_confirm);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Login to get authorization token',
  })
  async login(
    @Request() req: any,
    @Body() _payload: LoginDto,
  ): Promise<Object> {
    return this.service.login(req.user);
  }
}
