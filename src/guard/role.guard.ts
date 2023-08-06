import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonError, ErrorMessage } from 'src/common/common.error';
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
    if (token == null || token == '') {
      throw new CommonError(ErrorMessage.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    const email = decodeAuth(token);
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (user.roleId != 1) {
      throw new CommonError(ErrorMessage.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
