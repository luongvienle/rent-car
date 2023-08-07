import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  async sendWelcomeEmail(
    to: string,
    name: string,
    code: string,
  ): Promise<void> {
    await this.transporter.sendMail({
      from: this.configService.get('EMAIL_USER'),
      to: to,
      subject: 'Welcome',
      text: `Hi ${name}, Thank for registering!
      Please enter this code to confirm
      ${code}`,
    });
  }

  async sendBillingEmail(to: string, body: string): Promise<void> {
    await this.transporter.sendMail({
      from: this.configService.get('EMAIL_USER'),
      to: to,
      subject: 'Billing',
      text: `Hi ${body}, You just rent a car. Please take a look.
      \n\n
      `,
    });
  }
}
