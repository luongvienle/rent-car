import { Processor, Process } from '@nestjs/bull';
import { EmailService } from 'src/services/mail/email.service';
@Processor('sendmail')
export class EmailConsumer {
  constructor(private readonly emailService: EmailService) {}
  @Process('order')
  async sendEmailJob(job: any): Promise<void> {
    this.emailService.sendBillingEmail(job.data['email'], job.data['name']);
  }

  @Process('user')
  async sendWelcomEmailJob(job: any): Promise<void> {
    this.emailService.sendWelcomeEmail(
      job.data['to'],
      job.data['name'],
      job.data['code'],
    );
  }
}
