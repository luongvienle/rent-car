import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { JwtToken } from 'src/entity/jwt.token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenExistsGuard implements CanActivate {
  constructor(
    @InjectRepository(JwtToken)
    private readonly tokenRepository: Repository<JwtToken>,
    private readonly logger: Logger,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    if (token) {
      this.logger.log(token + ' ');
      const tokenWithoutBearer = token.replace('Bearer ', '');
      const tokenExists = await this.tokenRepository.findOne({
        where: {
          token: tokenWithoutBearer,
        },
      });

      if (!tokenExists) {
        throw new UnauthorizedException('Token not found');
      }
    }
    return true;
  }
}
