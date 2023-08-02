import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/dtos/LoginDto';
import { jwtConstants } from 'src/Constants/Jwt_constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true
    });
  }

  async validate(req: Request,payload: LoginDto) {
    const rawToken = req.headers['authorization'].split(' ')[1];
    // data to return
    return { userId: payload.email };
  }

  async checkToken() {
    
  }
}
