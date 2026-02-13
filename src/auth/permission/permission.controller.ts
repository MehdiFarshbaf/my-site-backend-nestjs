import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permmission.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Permissions')
@Controller('auth/permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new permission' })
  @ApiBody({ type: CreatePermissionDto })
  @ApiResponse({
    status: 201,
    description: 'Permission has been successfully created.',
  })
  @ApiResponse({
    status: 409,
    description: 'Permission with this name already exists.',
  })
  async createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return await this.permissionService.create(createPermissionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all permissions' })
  @ApiResponse({
    status: 200,
    description: 'Returns all permissions with their roles.',
  })
  async getAllPermissions() {
    return this.permissionService.findAllPermissions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a permission by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Permission ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the permission with roles.',
  })
  @ApiResponse({
    status: 404,
    description: 'Permission not found.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.permissionService.findOneOrFail(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a permission' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Permission ID',
    example: 1,
  })
  @ApiBody({ type: UpdatePermissionDto })
  @ApiResponse({
    status: 200,
    description: 'Permission has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Permission not found.',
  })
  @ApiResponse({
    status: 409,
    description: 'Permission with this name already exists.',
  })
  async updatePermission(@Param('id', ParseIntPipe) id: number, @Body() updatePermissionDto: UpdatePermissionDto) {
    return await this.permissionService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a permission' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Permission ID',
    example: 1,
  })
  @ApiResponse({
    status: 204,
    description: 'Permission has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Permission not found.',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.permissionService.removePermission(id);
  }

}
