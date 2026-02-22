import { Injectable } from '@nestjs/common';

@Injectable()
export class CleanupJob {
  cleanOtpFromDatabase() {
    console.log('Cleanup job starting...');
  }
}