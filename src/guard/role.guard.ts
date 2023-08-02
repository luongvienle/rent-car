import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import {
  CommonError,
  ErrorCode,
  ErrorMessage,
  TitleCode,
} from 'src/common/common.error';
import { JwtToken } from 'src/entity/jwt.token.entity';
import { User } from 'src/entity/user.entity';
import { decodeAuth } from 'src/utils/DecodeAuth';
import { Repository } from 'typeorm';

@Injectable()
export class RoleAmindGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    const email = decodeAuth(token);
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (user.role != 'admin') {
      throw new CommonError(
        ErrorMessage.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
        TitleCode.UNAUTHORIZED,
      );
    }
    return true;
  }
}
