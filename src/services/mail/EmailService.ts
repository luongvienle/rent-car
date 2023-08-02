import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { RentCarDto } from 'src/dtos/RentCarDto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vienll@tech.est-rouge.com',
        pass: this.configService.get('EMAIL_PASSWORD'),
        // pass: this.configService.get<String>('EMAIL_PASSWORD'),
        // pass: 'sasnvjywdihoxvik',
      },
    });
  }

  async sendLogEmail(to: string, name: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'vienll@tech.est-rouge.com',
      to: to,
      subject: 'Welcome',
      text: `Hi ${name}, Thank for registering!
      Please enter this code to confirm`,
    });
  }

  async sendWelcomeEmail(
    to: string,
    name: string,
    code: string,
  ): Promise<void> {
    await this.transporter.sendMail({
      from: 'vienll@tech.est-rouge.com',
      to: to,
      subject: 'Welcome',
      text: `Hi ${name}, Thank for registering!
      Please enter this code to confirm
      ${code}`,
    });
  }

  async sendBillingEmail(to: string, body: RentCarDto): Promise<void> {
    await this.transporter.sendMail({
      from: 'vienll@tech.est-rouge.com',
      to: to,
      subject: 'Billing',
      text: `Hi ${body.name}, this is your rent car billing information. Please take a look.
      \n\n
      `,
    });
  }
}
