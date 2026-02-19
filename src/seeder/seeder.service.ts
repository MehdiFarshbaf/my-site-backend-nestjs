import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { seederDataPermissions } from './data/seederDataPermissions';

@Injectable()
export class SeederService {
  constructor(private configService: ConfigService, private readonly prisma: PrismaService) {
  }

  async seedPermissions() {

    await Promise.all(
      seederDataPermissions.map(async (permission) => {
        const checkPermission = await this.prisma.permission.findUnique({
          where: { name: permission.name },
        });

        if (!checkPermission) {
          await this.prisma.permission.create({ data: permission });
          console.log(`✅ Permission "${permission.name}" created`);
        }
      }),
    );

  }

  async seedRoles() {
    const ROLE_SUPER_ADMIN = this.configService.get<string>('ROLE_SUPER_ADMIN') || 'super_admin';

    // Get all permissions
    const permissions = await this.prisma.permission.findMany();

    // Check if a super admin role already exists
    const existingRole = await this.prisma.role.findUnique({
      where: { name: ROLE_SUPER_ADMIN },
      include: { permissions: true },
    });

    if (!existingRole) {
      // Create a super admin role with all permissions
      await this.prisma.role.create({
        data: {
          name: ROLE_SUPER_ADMIN,
          permissions: {
            connect: permissions.map(permission => ({ id: permission.id })),
          },
        },
        include: { permissions: true },
      });
      console.log(`✅ Role "${ROLE_SUPER_ADMIN}" created with ${permissions.length} permissions`);
    } else {
      // Update an existing role to ensure it has all permissions
      await this.prisma.role.update({
        where: { id: existingRole.id },
        data: {
          permissions: {
            set: permissions.map(permission => ({ id: permission.id })),
          },
        },
        include: { permissions: true },
      });
      console.log(`✅ Role "${ROLE_SUPER_ADMIN}" updated with ${permissions.length} permissions`);
    }


  }
}
