import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import bull from 'bull';
import { CreateSmsDto } from './dto/create-sms.dto';

@Injectable()
export class SmsService {
  constructor(@InjectQueue('sms-queue') private smsQueue: bull.Queue) {
  }

  async sendSMS(createSmsDto: CreateSmsDto) {
    await this.smsQueue.add(
      'send-sms', // process name
      { mobile: createSmsDto.mobile, message: createSmsDto.message },
      {
        attempts: 3, // تعداد دفعات تکرار اگر انجام نشد.
        backoff: 5000, // فاصله بین تلاش های مجدد برای اجرا ===> 5 ثانیه
        delay: 10000, // بعد از اینکه اون جاب به صف اضافه شد چقدر طول بکشه تا اجرا بشه.
        removeOnComplete: true, // به از اینکه کامل شد از redis حذفش کن
        removeOnFail: false, //
      },
    );

  }
}
