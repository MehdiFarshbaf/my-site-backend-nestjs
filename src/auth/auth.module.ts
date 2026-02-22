import { Module } from '@nestjs/common';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [PermissionModule, RoleModule, AdminModule]
})
export class AuthModule {}
