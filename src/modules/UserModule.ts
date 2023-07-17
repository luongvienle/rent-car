import { Module } from '@nestjs/common';
import { UserController } from 'src/api/v1/UserController';
import { UserRepository } from 'src/repositories/UserRepository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants, JwtStrategy } from 'src/shared/JwtStrategy';
import { UserService } from 'src/services/UserService';
import { LocalStrategy } from 'src/shared/LocalStrategy';
import { User } from 'src/models/User';
import { EmailService } from 'src/services/mail/EmailService';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
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
  ],
})
export class UserModule {}
