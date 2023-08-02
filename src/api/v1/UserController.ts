import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { UserDto } from 'src/dtos/UserDto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/services/UserService';
import { LoginDto } from 'src/dtos/LoginDto';
import { LocalAuthGuard } from 'src/shared/LocalAuthGuard';
import { ConfirmDto } from 'src/dtos/ConfirmDto';
import { JwtAuthGuard } from 'src/shared/JwtAuthGuard';
import { TokenExistsGuard } from 'src/guard/token-exists.guard';
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

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Logout function',
  })
  async logout(@Headers() headers): Promise<String> {
    const token = headers.authorization;
    if (token) {
      const tokenWithoutBearer = token.replace('Bearer ', '');
      return this.service.logout(tokenWithoutBearer);
    }
    return this.service.logout(token);
  }
}
