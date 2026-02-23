import { Process, Processor } from '@nestjs/bull';
import { CreateSmsDto } from '../dto/create-sms.dto';
import bull from 'bull';

@Processor('sms-queue')
export class SmsProcessor {
  @Process('send-sms')
  async sendSMS(job: bull.Job<CreateSmsDto>) {
    console.log(`💭 sending sms to ${job.data.mobile} with message ${job.data.message}`);
  }
}