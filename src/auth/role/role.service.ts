import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {
  }

  // Check if a role exists by ID
  async findOneOrFail(roleId: number) {

    const role = await this.prisma.role.findUnique({ where: { id: roleId }, include: { permissions: true } });
    if (!role) throw new NotFoundException(`نقشی با شنایه ${roleId} یافت نشد.`);

    return role;
  }

  // Check for duplicate name
  async checkDuplicateName(roleName: string) {
    const existing = await this.prisma.role.findUnique({ where: { name: roleName } });
    if (existing) throw new ConflictException(`نقشی با نام ${roleName} وجود دارد`);
  }

  async validationPermissionIds(permissionIds: number[]) {
    if (!permissionIds || permissionIds.length < 1) return [];
    const permissions = await this.prisma.permission.findMany({
      where: {
        id: { in: permissionIds },
      },
    });

    if (permissions.length !== permissionIds.length) {
      const foundIds = permissions.map(p => p.id);
      const invalidIds = permissionIds.filter(id => !foundIds.includes(id));
      throw new BadRequestException(`Permission IDs not found: ${invalidIds.join(', ')}`);
    }

  }

  async create(createRoleDto: CreateRoleDto) {
    // Check for duplicate name
    await this.checkDuplicateName(createRoleDto.name);

    const { permissionIds, ...roleData } = createRoleDto;
    if (permissionIds) {
      await this.validationPermissionIds(permissionIds);
    }

    return this.prisma.role.create({
      data: {
        ...roleData,
        permissions: permissionIds ? { connect: permissionIds.map(id => ({ id })) } : undefined,
      },
      include: { permissions: true },
    });

  }

  async findAll() {
    return this.prisma.role.findMany({
      include: { permissions: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.findOneOrFail(id);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {

    await this.findOneOrFail(id);
    updateRoleDto.name && await this.checkDuplicateName(updateRoleDto.name);

    const { permissionIds, ...roleData } = updateRoleDto;

    // Validate permission IDs
    if (permissionIds) {
      await this.validationPermissionIds(permissionIds);
    }

    return this.prisma.role.update({
      where: { id },
      data: {
        ...roleData,
        permissions: permissionIds
          ? {
            set: permissionIds.map(id => ({ id })),
          }
          : undefined,
      },
      include: { permissions: true },
    });
  }

  async remove(roleId: number) {
    // Check if a role exists
    await this.findOneOrFail(roleId);
    return this.prisma.role.delete({ where: { id: roleId } });
  }
}
