import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permmission.dto';

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) {
  }

  // Check if permission exists by ID
  async findOneOrFail(id: number) {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
      include: { roles: true },
    });

    if (!permission) {
      throw new NotFoundException(`Permission با ID ${id} یافت نشد`);
    }

    return permission;
  }

  // Check for duplicate name
  async checkDuplicateName(name: string) {
    const existing = await this.prisma.permission.findUnique({
      where: { name },
    });

    if (existing) {
      throw new ConflictException(`مجوز با نام ${name} وجود دارد`);
    }
  }

  async findAllPermissions() {
    return this.prisma.permission.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(createPermissionDto: CreatePermissionDto) {
    await this.checkDuplicateName(createPermissionDto.name);
    return this.prisma.permission.create({
      data: createPermissionDto,
    });
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    await this.findOneOrFail(id);
    updatePermissionDto.name && await this.checkDuplicateName(updatePermissionDto.name);
    const updatePermission = await this.prisma.permission.update({
      where: { id },
      data: updatePermissionDto,
    });
    return {
      message: 'ویرایش مجوز موفقیت آمیز بود.',
      data: updatePermission,
    };
  }

  async removePermission(id: number) {
    await this.findOneOrFail(id);
    return this.prisma.permission.delete({ where: { id } });
  }
}
