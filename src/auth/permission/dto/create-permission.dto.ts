import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'Unique name of the permission',
    example: 'users.create',
    minLength: 1,
  })
  @IsString({ message: 'Permission name must be a string' })
  @IsNotEmpty({ message: 'Permission name is required' })
  @MinLength(3, { message: 'Permission name must be at least 3 characters long' })
  name: string;

  @ApiPropertyOptional({
    description: 'Optional group/category for the permission',
    example: 'users',
  })
  @IsOptional()
  @IsString({ message: 'Permission group must be a string' })
    // @IsEnum(PermissionGroup, {
    //   message: `Group must be one of the following: ${Object.values(PermissionGroup).join(', ')}`,
    //   always: false, // فقط وقتی مقدار وجود دارد چک می‌کند
    // })
  group?: string;
}

export type CreatePermissionDtoType = CreatePermissionDto;

// some-other-file.ts
// import type { CreatePermissionDtoType } from '../permissions/dto/create-permission.dto';

// interface PermissionResponse {
//   id: number;
//   data: CreatePermissionDtoType;   // ← فقط نوع، بدون import کلاس واقعی
// }