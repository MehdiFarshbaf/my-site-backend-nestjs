import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSmsDto {
  @ApiProperty({ example: '09039067633', description: 'mobile number' })
  @IsString({ message: 'موبایل باید متن باشد.' })
  @IsNotEmpty({ message: 'موبایل الزامی است.' })
  @Length(11, 11, { message: 'شماره موبایل باید 11 رقم باشد.' })
  @Transform(({ value }) => (value as string).trim())
  mobile: string;

  @ApiProperty({ example: 'hello mehdi', description: 'content message' })
  @IsString({ message: 'متن پیام باید متن باشد.' })
  @IsNotEmpty({ message: 'وارد کردن پیام الزامی است.' })
  message: string;
}
