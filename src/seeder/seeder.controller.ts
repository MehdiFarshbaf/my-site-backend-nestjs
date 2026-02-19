import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {
  }

  @ApiOperation({ summary: 'create seeder' })
  @Get('seeder_permissions_and_roles')
  @HttpCode(HttpStatus.OK)
  async seederPermissionsAndRoles() {
    await this.seederService.seedPermissions();
    await this.seederService.seedRoles();
    return {
      message: 'Seeder permissions and role created successfully.',
    };
  }
}
