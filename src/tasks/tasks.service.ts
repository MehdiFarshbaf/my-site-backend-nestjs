import { Injectable } from '@nestjs/common';
import { CleanupJob } from './jobs/cleanup.job';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(private readonly cleanUp: CleanupJob) {
  }

  // @Cron(CronExpression.EVERY_10_MINUTES)
  @Cron('*/10 * * * * *')
  cleanOtpData() {
    this.cleanUp.cleanOtpFromDatabase();
  }
}
