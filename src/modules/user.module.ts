import { Logger, Module } from '@nestjs/common';
import { UserController } from 'src/api/v1/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/shared/JwtStrategy';
import { UserService } from 'src/services/user.service';
import { LocalStrategy } from 'src/shared/LocalStrategy';
import { User } from 'src/entity/user.entity';
import { EmailService } from 'src/services/mail/email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RandomService } from 'src/services/random/random.service';
import { jwtConstants } from 'src/constants/jwt.constant';
import { JwtToken } from 'src/entity/jwt.token.entity';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, JwtToken]),
    BullModule.registerQueue({
      name: 'sendmail',
    }),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '12000s',
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    LocalStrategy,
    JwtStrategy,
    EmailService,
    RandomService,
    Logger,
  ],
})
export class UserModule {}
