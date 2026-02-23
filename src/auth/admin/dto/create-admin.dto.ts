import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString, Min,
  MIN,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateAdminDto {
  @ApiProperty({
    description: 'First name of the admin',
    example: 'علی',
  })
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the admin',
    example: 'احمدی',
  })
  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @ApiProperty({
    description: 'Email address of the admin',
    example: 'ali@example.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiPropertyOptional({
    description: 'Phone number of the admin',
    example: '09123456789',
  })
  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  phone?: string;

  @ApiProperty({
    description: 'Password for the admin account',
    example: 'SecurePass123!',
    minLength: 6,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @ApiProperty({
    description: 'Role ID for the admin',
    example: 1,
  })
  @IsInt({ message: 'Role ID must be an integer' })
  @Min(1, { message: 'Role ID must be greater than 0' })
  @Type(() => Number)
  roleId: number;

  @ApiPropertyOptional({
    description: 'Array of additional permission IDs',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsOptional()
  @IsArray({ message: 'Permission IDs must be an array' })
  @ArrayMinSize(1, { message: 'At least one permission ID is required if provided' })
  @IsInt({ each: true, message: 'Each permission ID must be an integer' })
  @Min(1, { each: true, message: 'Each permission ID must be greater than 0' })
  @Type(() => Number)
  permissionIds?: number[];

}