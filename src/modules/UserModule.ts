import { Logger, Module } from '@nestjs/common';
import { UserController } from 'src/api/v1/UserController';
import { UserRepository } from 'src/repositories/UserRepository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/shared/JwtStrategy';
import { UserService } from 'src/services/UserService';
import { LocalStrategy } from 'src/shared/LocalStrategy';
import { User } from 'src/models/User';
import { EmailService } from 'src/services/mail/EmailService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RandomService } from 'src/services/random/RandomService';
import { jwtConstants } from 'src/Constants/Jwt_constant';
import { JwtToken } from 'src/models/JwtToken';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, JwtToken]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '6000s',
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    UserService,
    LocalStrategy,
    JwtStrategy,
    EmailService,
    RandomService,
    Logger,
  ],
})
export class UserModule {}
