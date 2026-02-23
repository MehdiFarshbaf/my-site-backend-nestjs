import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SmsService } from './sms.service';
import { CreateSmsDto } from './dto/create-sms.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {
  }


  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new SMS' })
  @ApiBody({ type: CreateSmsDto })
  @Post('send')
  async send(@Body() createSmsDto: CreateSmsDto) {
    await this.smsService.sendSMS(createSmsDto);
    return 'ok test';
  }
}
