import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateRoleDto {
  @ApiProperty({
    description: 'Unique name of the role',
    example: 'Admin',
    minLength: 1,
  })
  @IsString({ message: 'Permission name must be a string' })
  @IsNotEmpty({ message: 'Permission name is required' })
  name: string;

  @ApiPropertyOptional({
    description: 'Array of permission IDs to assign to this role',
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