import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { RentCarDto } from 'src/dtos/RentCarDto';
import { BillingInfo } from 'src/models/BillingInfo';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vienll@tech.est-rouge.com',
        pass: 'sasnvjywdihoxvik',
      },
    });
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'vienll@tech.est-rouge.com',
      to: to,
      subject: 'Welcome',
      text: `Hi ${name}, Thank for registering. Hope you will enjoy with us!`,
    });
  }

  async sendBillingEmail(to: string, body: RentCarDto): Promise<void> {
    await this.transporter.sendMail({
      from: 'vienll@tech.est-rouge.com',
      to: to,
      subject: 'Billing',
      text: `Hi ${body.name}, this is your rent car billing information. Please take a look.
      \n\n
      `
    });
  }
}
