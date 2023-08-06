import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserDto } from 'src/dtos/user.dto';
import * as cryptojs from 'crypto-js';
import { User } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailService } from './mail/email.service';
import { RandomService } from './random/random.service';
import { ConfirmDto } from 'src/dtos/confirm.dto';
import { ConfigService } from '@nestjs/config';
import { JwtToken } from 'src/entity/jwt.token.entity';
import { TokenDto } from 'src/dtos/token.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(JwtToken)
    private tokenRepository: Repository<JwtToken>,
    private readonly randomService: RandomService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    private readonly loggerService: Logger,
  ) {}

  encrypt(value: string): string {
    return cryptojs.AES.encrypt(value, this.configService.get('KEY_UTF8'), {
      iv: this.configService.get('IV_UTF8'),
    }).toString();
  }

  decrypt(value: string): string {
    return cryptojs.AES.decrypt(value, this.configService.get('KEY_UTF8'), {
      iv: this.configService.get('IV_UTF8'),
    }).toString(cryptojs.enc.Utf8);
  }

  async createUser(payload: UserDto): Promise<string> {
    this.loggerService.log(`Create new user with info: ${payload}`);
    const data = payload;
    const existentUser = await this.usersRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (existentUser) {
      throw new BadRequestException('This email already have being used');
    }
    try {
      const code = this.randomService.generateRandomNumber();
      data.code = code;
      data.password = this.encrypt(data.password);
      await this.usersRepository.save(data);
      this.emailService.sendWelcomeEmail(payload.email, payload.name, code);
    } catch (err) {
      throw new BadRequestException(err);
    }
    return 'Create User Successful';
  }

  async confirmEmail(confirm: ConfirmDto): Promise<string> {
    this.loggerService.log(`Confirm email with info: ${confirm}`);
    const userInfo = await this.usersRepository.findOne({
      where: {
        email: confirm.email,
      },
    });
    if (!userInfo) {
      throw new BadRequestException('User Not registered yet!');
    } else {
      if (userInfo.code === confirm.code) {
        userInfo.isConfirm = true;
        await this.usersRepository.save(userInfo);
        return 'Email was confirmed';
      } else {
        return 'Code not true';
      }
    }
  }

  async findByEmail(email: string): Promise<User> {
    const result = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!result) {
      throw new BadRequestException('No user found!');
    }
    return result;
  }

  async create(payload: UserDto): Promise<string> {
    try {
      await this.createUser(payload);
      this.loggerService.log(`Create new user with info: ${payload}`);
      return 'User created successfully!';
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);

    const decryptedPassword = this.decrypt(user.password);

    if (user && decryptedPassword === password) {
      const { password, ...result } = user;
      if (user.isConfirm) {
        return result as User;
      } else {
        throw new BadRequestException('Email was not confirmed yet!');
      }
    }

    return null;
  }

  async login(payload: any): Promise<Object> {
    const data = { email: payload.email };
    this.loggerService.log(`Login with email: ${payload.email}`);
    const access_token = this.jwtService.sign(data);
    this.saveToken(access_token);
    return {
      access_token: access_token,
    };
  }

  async saveToken(token: string) {
    const tokenDto: TokenDto = {
      token: token,
    };
    this.tokenRepository.save(tokenDto);
  }

  async logout(token: string): Promise<string> {
    this.loggerService.log(`Logout with token: ${token}`);
    await this.tokenRepository.delete({
      token: token,
    });
    return 'logout successful';
  }
}
